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

  static moveCursorTo(ref, position) {
    const { current: inp } = ref;
    if (inp.createTextRange) {
      const part = inp.createTextRange();

      part.move('character', position);
      part.select();
    } else if (inp.setSelectionRange) {
      inp.setSelectionRange(position, position);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.prevProblemId !== props.problem.id) {
      return {
        prevProblemId: props.problem.id,
        parsed: null,
        answer: '',
        error: null,
        prevKey: null,
        updates: {
          solution: get(props, 'problem.solution', `function ${camelCase(get(props, 'problem.name', ''))}() {}`),
        },
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.questionInputRef = React.createRef();
    this.saveProblemDebounced = debounce(this.saveProblem, 500);
    this.parseSolutionDebounced = debounce(this.parseSolutionDebounced.bind(this), 250);
    this.state = {
      prevProblemId: '',
      updates: {},
    };
  }

  componentDidMount() {
    const {
      updates: { solution },
    } = this.state;

    this.inputRef.current.addEventListener('keydown', this.onKeyPress.bind(this));
    this.parseSolutionDebounced(solution);
    this.solve();
  }

  componentWillUnmount() {
    this.inputRef.current.removeEventListener('keydown', this.onKeyPress.bind(this));
  }

  onKeyPress(e) {
    const {
      key,
      target: { selectionStart, value },
    } = e;
    const { prevKey } = this.state;
    let toInsert = '';
    if (/^Tab|[{(]$/.test(key) || (key === 'Enter' && prevKey === '{')) {
      e.preventDefault();
      switch (key) {
        case 'Tab':
          toInsert = '    ';
          break;
        case '(':
          toInsert = '()';
          break;
        case '{':
          toInsert = '{}';
          break;
        case 'Enter':
          toInsert = prevKey === '{' ? '\n    ' : '';
          break;
        default:
          break;
      }

      this.setState(
        {
          updates: {
            solution: `${value.slice(0, selectionStart)}${toInsert}${value.slice(selectionStart)}`,
          },
        },
        () => {
          this.saveProblemDebounced();
          Problem.moveCursorTo(this.inputRef, selectionStart);
        }
      );
    }

    if (key === '{') {
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
      this.saveProblemDebounced
    );
  };

  parseSolution = e => {
    e.preventDefault();

    this.setState({
      updates: {
        solution: e.target.value,
      },
    });
    this.parseSolutionDebounced(e.target.value);
  };

  /* eslint-disable no-new-func */
  parseSolutionDebounced = value => {
    const { input } = this.props;
    const matched = value.match(/^\s*\n*function (\w+)\(([^)]*)\)\s*\n*\{\n*\s*((?!function).*)\n*\s*\}$/s);

    if (matched) {
      const [, functionName] = matched;
      const parsed = new Function(
        'input',
        `
          ${value}
          return JSON.stringify(${functionName}(...input));
        `
      );

      try {
        this.setState({
          answer: input && parsed(Problem.parseInput(input)),
          updates: {
            solution: value,
          },
          error: null,
        });
      } catch (e) {
        this.setState({
          answer: null,
          updates: {
            solution: value,
          },
          error: getError(e),
        });
      }
    }
    this.saveProblemDebounced();
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
    const {
      updates: { solution },
      answer,
      error,
    } = this.state;

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
                <Grid grow item>
                  <InputField
                    name="title"
                    label="Title"
                    variant="standard"
                    onChange={this.updateProblem}
                    value={problem.title}
                    FormControlProps={{
                      fullWidth: true,
                    }}
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
                onBlur={() => this.moveCursorTo(this.questionInputRef, 0)}
                onChange={this.updateProblem}
                value={problem.question}
                inputRef={this.questionInputRef}
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
                  <InputField
                    label="Input"
                    name="input"
                    rowsMax={9}
                    value={input}
                    onChange={this.evaluateInput}
                    multiline
                  />
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
