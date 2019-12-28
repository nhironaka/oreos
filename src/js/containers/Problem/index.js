import React from 'react';
import T from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import camelCase from 'lodash/camelCase';
import memoize from 'lodash/memoize';
import debounce from 'lodash/debounce';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import _T from 'Services/custom-prop-types';
import { selectProblemInput } from 'Selectors/problems';
import { getError } from 'Reducers/errors';
import { updateProblem, updateProblemInput, addProblem } from 'Actions/problems';
import Typography from 'Components/Typography';
import InputField from 'Components/InputField';
import InlineInput from 'Components/InlineInput';
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
      id: 'attempted',
      label: 'Attempted',
    },
    {
      id: 'solved',
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
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.updateProblem = debounce(this.props.updateProblem, 500);
    this.parseSolutionDebounced = debounce(this.parseSolutionDebounced.bind(this), 250);
    this.state = {
      prevProblemId: '',
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
      this.updateProblem({
        id,
        solution: `${value.slice(0, selectionStart)}    ${value.slice(selectionStart)}`,
      });
    }
    if (key.toLowerCase() === 'enter' && prevKey === '{') {
      this.updateProblem({
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

  updateProblemTitle = title => {
    const {
      problem: { id },
    } = this.props;
    this.updateProblem({
      id,
      title,
    });
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
    this.updateProblem({
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

  saveProblem = () => {
    const { problem } = this.props;
    if (problem.id) {
      this.props.updateProblem(problem);
    } else {
      this.props.addProblem(problem);
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
                  <InlineInput onSave={this.updateProblemTitle} value={problem.title} />
                  {/* <Typography variant="h6">{problem.title}</Typography> */}
                  <Typography>{problem.question}</Typography>
                </Grid>
                {problem.last_updated && (
                  <Grid item>
                    <Typography variant="caption">
                      {`Last updated: ${moment(problem.last_updated).format('MM/DD/YYYY hh:mm:ssA')}`}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <InputField
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
                  <InputField value={input} onChange={this.evaluateInput} />
                </Grid>
                <Grid classes={{ item: classes.solution }} item>
                  <InputField value={answer} readOnly />
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
