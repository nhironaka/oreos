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
import { updateProblem, updateProblemInput } from 'Actions/problems';
import Typography from 'Components/Typography';
import TextField from 'Components/TextField';
import Card from 'Components/Card';

const style = () => ({
  root: {
    borderRight: 'none',
    borderTop: 'none',
    width: '100%',
  },
  solution: {
    flex: 1,
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

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.updateProblem = debounce(this.props.updateProblem, 500);
    this.parseSolutionDebounced = debounce(this.parseSolutionDebounced.bind(this), 250);
    this.state = {
      solution: get(this.props, 'problem.solution', `function ${camelCase(get(this.props, 'problem.name', ''))}() {}`),
      parsed: null,
      answer: null,
      error: null,
      prevKey: null,
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
    if (key === 'enter' && prevKey === '{') {
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
          ${value};
          console.log(${functionName}(input));
          return JSON.stringify(${functionName}(input));
        `
      );

      try {
        this.setState({
          parsed,
          answer: input && parsed(Problem.parseInput(input)),
          error: null,
        });
      } catch (e) {
        this.setState({
          parsed,
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
    const { parsed } = this.state;

    this.props.updateProblemInput(name, value);
    try {
      this.setState({
        answer: parsed(Problem.parseInput(e.target.value)),
        error: null,
      });
    } catch (error) {
      this.setState({
        answer: null,
        error: getError(error),
      });
    }
  };

  render() {
    const { problem, input, classes } = this.props;
    const { solution, answer, error } = this.state;

    return (
      <Card padding="md" classes={{ root: classes.root }}>
        <Grid justify="space-between" alignItems="baseline" container>
          <Grid item>
            <Typography>{problem.title}</Typography>
            <Typography>{problem.question}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {`Last updated: ${moment(problem.lastUpdated).format('MM/DD/YYYY hh:mm:ssA')}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid spacing={2} container>
          <Grid classes={{ item: classes.solution }} item>
            <TextField
              rows={9}
              value={solution}
              onChange={this.parseSolution}
              inputRef={this.inputRef}
              multiline
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField value={input} onChange={this.evaluateInput} />
          </Grid>
        </Grid>
        {answer}
        {error && <Typography color="error">{error}</Typography>}
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
  updateProblemInput: T.func.isRequired,
  classes: _T.classes.isRequired,
};

const mapStateToProps = createStructuredSelector({
  input: selectProblemInput,
});

const mapDispatchToProps = {
  updateProblem,
  updateProblemInput,
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Problem));
