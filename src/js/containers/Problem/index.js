import React from 'react';
import T from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import camelCase from 'lodash/camelCase';
import debounce from 'lodash/debounce';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import _T from 'Services/custom-prop-types';
import { getError } from 'Reducers/errors';
import { updateProblem } from 'Actions/problems';
import Typography from 'Components/Typography';
import TextField from 'Components/TextField';
import Card from 'Components/Card';
import solver from './service';

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
  constructor(props) {
    super(props);
    const { problem } = props;
    this.state = {
      solution: get(problem, 'solution', `function ${camelCase(get(problem, 'name', ''))}() {}`),
      parsed: null,
      answer: null,
      error: null,
      input: '',
    };

    this.parseSolution = this.parseSolution.bind(this);
    this.updateProblem = debounce(this.props.updateProblem, 500);
    this.parseSolutionDebounced = debounce(this.parseSolutionDebounced.bind(this), 250);
    this.evaluateInputDebounced = debounce(this.evaluateInput.bind(this), 250);
  }

  parseSolution(e) {
    e.preventDefault();
    this.setState({
      solution: e.target.value,
    });
    this.parseSolutionDebounced(e.target.value);
  }

  /* eslint-disable no-new-func */
  parseSolutionDebounced(value) {
    const {
      problem: { id },
    } = this.props;
    const { input, solution } = this.state;
    const matched = value.match(/^\s*\n*function (\w+)\(([^\)]*)\)\s*\n*\{\n*\s*(.*)\n*\s*\}$/s);

    if (matched) {
      const [, functionName, functionParams, body] = matched;
      const params = functionParams.split(/,\s*/g);
      const parsed = new Function(...params, body);
      try {
        this.setState({
          answer: parsed(input),
        });
      } catch (e) {
        this.setState({
          error: getError(e),
        });
      }
    }
    this.updateProblem({
      id,
      solution,
    });
  }
  /* eslint-enable */

  evaluateInput(e) {
    this.setState({
      solution: e.target.value,
      answer: solver(JSON.parse(e.target.value)),
    });
  }

  render() {
    const { problem, classes } = this.props;
    const { solution, answer, input, error } = this.state;
    if (!problem) {
      return null;
    }

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
            <TextField rows={9} value={solution} onChange={this.parseSolution} multiline fullWidth />
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

Problem.propTypes = {
  problem: T.object,
  updateProblem: T.func.isRequired,
  classes: _T.classes.isRequired,
};

const mapDispatchToProps = {
  updateProblem,
};

export default withStyles(style)(connect(null, mapDispatchToProps)(Problem));
