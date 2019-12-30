import React from 'react';
import T from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import memoize from 'lodash/memoize';
import debounce from 'lodash/debounce';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import _T from 'Services/custom-prop-types';
import { selectProblemInput } from 'Selectors/problems';
import { getError } from 'Reducers/errors';
import { updateProblem, updateProblemInput, addProblem } from 'Actions/problems';
import Grid from 'Components/Grid';
import Typography from 'Components/Typography';
import InputField from 'Components/InputField';
import Card from 'Components/Card';
import NavButtonGroup from 'Components/NavButtonGroup';
import Button from 'Components/Button';
import solver from './solver';

const style = theme => ({
  root: {
    borderLeft: theme.mixins.border(),
  },
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  body: {
    borderBottom: theme.mixins.border(),
  },
  solution: {
    flex: 1,
  },
  navButtonGroup: {
    display: 'flex',
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: theme.mixins.border(),
    '& > button': {
      borderColor: theme.palette.border.main,
      borderTopColor: 'transparent',
      '&:first-child': {
        borderLeftColor: 'transparent',
      },
    },
  },
});

class Problem extends React.Component {
  static parseInput = memoize(input => {
    try {
      return JSON.parse(input);
    } catch (e) {
      return input;
    }
  });

  static PROBLEM_STATUS = [
    {
      id: 'ATTEMPTED',
      label: 'Attempted',
    },
    {
      id: 'SOLVED',
      label: 'Solved',
    },
  ];

  static getDerivedStateFromProps(props, state) {
    if (state.prevProblemId !== props.problem.id) {
      return {
        prevProblemId: props.problem.id,
        solution: get(props, 'problem.solution', `function ${camelCase(get(props, 'problem.name', ''))}() {}`),
        parsed: null,
        answer: '',
        error: null,
        prevKey: null,
        updates: {},
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.saveProblemDebounced = debounce(this.saveProblem, 500);
    this.parseSolutionDebounced = debounce(this.parseSolutionDebounced.bind(this), 250);
    this.state = {
      prevProblemId: '',
      updates: {},
    };
  }

  componentDidMount() {
    const { solution } = this.state;

    this.inputRef.current.addEventListener('keydown', this.onKeyPress.bind(this));
    this.parseSolutionDebounced(solution);
  }

  componentWillUnmount() {
    this.inputRef.current.removeEventListener('keydown', this.onKeyPress.bind(this));
  }

  onKeyPress(e) {
    const {
      problem: { id },
    } = this.props;
    const {
      key,
      target: { selectionStart, value },
    } = e;
    const { prevKey } = this.state;

    if (key.toLowerCase() === 'tab') {
      e.preventDefault();
      this.saveProblemDebounced({
        id,
        solution: `${value.slice(0, selectionStart)}    ${value.slice(selectionStart)}`,
      });
    }
    if (key.toLowerCase() === 'enter' && prevKey === '{') {
      this.saveProblemDebounced({
        id,
        solution: `${value.slice(0, selectionStart)}\n    ${value.slice(selectionStart)}`,
      });
    }
    if (/{|}/.test(key)) {
      this.setState({
        prevKey: key,
      });
    }
  }

  updateProblem = (e, value) => {
    const { problem } = this.props;
    this.setState(
      state => ({
        updates: {
          ...state.updates,
          ...problem,
          [e.target.name]: value,
        },
      }),
      () => {
        this.saveProblemDebounced(this.state.updates);
      }
    );
  };

  parseSolution = e => {
    e.preventDefault();

    this.setState({
      solution: e.target.value,
    });
    this.parseSolutionDebounced(e.target.value);
  };

  /* eslint-disable no-new-func */
  parseSolutionDebounced = value => {
    const {
      problem: { id },
      input,
    } = this.props;
    const { solution } = this.state;
    const matched = value.match(/^\s*\n*function (\w+)\(([^)]*)\)\s*\n*\{\n*\s*((?!function).*)\n*\s*\}$/s);

    if (matched) {
      const [, functionName] = matched;
      const parsed = new Function(
        'input',
        `
          ${value}
          return JSON.stringify(${functionName}(input));
        `
      );

      try {
        this.setState({
          answer: input && parsed(Problem.parseInput(input)),
          error: null,
        });
      } catch (e) {
        this.setState({
          answer: null,
          error: getError(e),
        });
      }
    }
    this.saveProblemDebounced({
      id,
      solution,
    });
  };
  /* eslint-enable */

  evaluateInput = e => {
    const {
      problem: { name },
    } = this.props;
    const {
      target: { value },
    } = e;

    this.props.updateProblemInput(name, value);
    this.solve(e.target.value);
  };

  solve = value => {
    const { input } = this.props;
    try {
      this.setState({
        answer: solver(Problem.parseInput(value || input)),
        error: null,
      });
    } catch (error) {
      this.setState({
        answer: null,
        error: getError(error),
      });
    }
  };

  toggleStatus = (_e, { id: status }) => {
    const {
      problem: { id },
    } = this.props;

    this.props.updateProblem({
      id,
      status,
    });
  };

  saveProblem = async () => {
    const { problem } = this.props;
    const { updates } = this.state;
    const updated = {
      ...problem,
      ...updates,
    };

    if (problem.id) {
      this.props.updateProblem(updated);
    } else if (updated.title && updated.question) {
      this.props.addProblem({
        ...updates,
        name: problem.name || kebabCase(problem.title || updates.title),
      });
    }
  };

  render() {
    const { problem, input, classes } = this.props;
    const { solution, answer, error } = this.state;

    return (
      <Card className={classes.root} classes={{ root: classes.card }} noBorder>
        <NavButtonGroup
          variant="outlined"
          selected={problem.status}
          options={Problem.PROBLEM_STATUS}
          onClick={this.toggleStatus}
          classes={{ root: classes.navButtonGroup }}
        />
        <Card padding="md" className={classes.body} classes={{ root: classes.card }} noBorder>
          <Grid direction="column" spacing={2} container>
            <Grid item>
              <Grid justify="space-between" alignItems="baseline" container>
                <Grid item>
                  <InputField
                    name="title"
                    label="Title"
                    variant="standard"
                    onChange={this.updateProblem}
                    value={problem.title}
                  />
                </Grid>
                <Grid item>
                  {problem.last_updated && (
                    <Typography variant="caption">
                      {`Last updated: ${moment(problem.last_updated).format('MM/DD/YYYY hh:mm:ssA')}`}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid fullWidth item>
              <InputField
                name="question"
                label="Question"
                variant="standard"
                rowsMax={3}
                onChange={this.updateProblem}
                value={problem.question}
                FormControlProps={{
                  fullWidth: true,
                }}
                multiline
              />
            </Grid>
            <Grid item>
              <InputField
                name="solution"
                label="Solution"
                rows={9}
                value={solution}
                onChange={this.parseSolution}
                inputRef={this.inputRef}
                FormControlProps={{
                  fullWidth: true,
                }}
                multiline
              />
            </Grid>
            <Grid item>
              <Grid spacing={2} container>
                <Grid item>
                  <InputField label="Input" name="input" value={input} onChange={this.evaluateInput} />
                </Grid>
                <Grid grow item>
                  <InputField label="Output" name="answer" value={answer} readOnly />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid justify="space-between" alignItems="baseline" container>
                <Grid item>{error && <Typography color="error">{error}</Typography>}</Grid>
                <Grid item>
                  <Grid spacing={2} container>
                    <Grid item>
                      <Button onClick={() => this.solve()}>Solve</Button>
                    </Grid>
                    <Grid item>
                      <Button color="primary" onClick={this.saveProblem}>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Card>
    );
  }
}

Problem.defaultProps = {
  input: '',
};

Problem.propTypes = {
  input: T.any,
  problem: T.object.isRequired,
  updateProblem: T.func.isRequired,
  addProblem: T.func.isRequired,
  updateProblemInput: T.func.isRequired,
  classes: _T.classes.isRequired,
};

const mapStateToProps = createStructuredSelector({
  input: selectProblemInput,
});

const mapDispatchToProps = {
  updateProblem,
  updateProblemInput,
  addProblem,
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Problem));
