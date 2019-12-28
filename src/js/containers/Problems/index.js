import React from 'react';
import T from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import _T from 'Services/custom-prop-types';
import { fetchProblems, selectProblem } from 'Actions/problems';
import { selectFetchingProblems, selectProblems, selectSelectedProblem } from 'Selectors/problems';
import UnorderedList from 'Components/UnorderedList';
import Typography from 'Components/Typography';
import Card from 'Components/Card';
import Loading from 'Components/Loading';
import Problem from '../Problem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import get from 'lodash/get';

const styles = theme => ({
  root: {},
  unorderedList: {
    '& > li > button': {
      width: '100%',
      borderBottom: theme.mixins.border(),
    },
  },
  problemWrapper: {
    flex: 1,
  },
});

class Problems extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        label: 'Title',
        id: 'title',
        type: {
          id: 'link',
          properties: {
            to: row => ({
              to: `/problem/${row.id}`,
            }),
          },
        },
      },
      {
        label: 'Question',
        id: 'question',
      },
    ];
  }

  componentDidMount() {
    this.props.fetchProblems();
  }

  render() {
    const { loading, problems, selectedProblem, classes } = this.props;
    const selectedProblemId = get(selectedProblem, 'id');

    return (
      <Grid alignItems="stretch" classes={{ root: classes.root }} container>
        <Grid item>
          {loading ? (
            <Loading />
          ) : (
            <UnorderedList classes={{ root: classes.unorderedList }}>
              {problems.map(problem => (
                <li key={problem.id}>
                  <Card
                    Component="button"
                    padding="md"
                    color={problem.id === selectedProblemId ? 'primary' : 'default'}
                    onClick={() => this.props.selectProblem(problem)}
                    noBorder
                  >
                    <Typography color="inherit" variant="subtitle1">
                      {problem.title}
                    </Typography>
                    <Typography color="inherit">{problem.question}</Typography>
                  </Card>
                </li>
              ))}
              <li>
                <Card Component="button" padding="md" onClick={() => this.props.selectProblem({})} noBorder>
                  <Typography variant="subtitle1">
                    Add problem
                    <FontAwesomeIcon icon="plus" />
                  </Typography>
                </Card>
              </li>
            </UnorderedList>
          )}
        </Grid>
        <Grid classes={{ root: classes.problemWrapper }} item>
          {selectedProblem && <Problem problem={selectedProblem} key={selectProblem.id} />}
        </Grid>
      </Grid>
    );
  }
}

Problems.propTypes = {
  loading: T.bool.isRequired,
  problems: T.array.isRequired,
  fetchProblems: T.func.isRequired,
  selectProblem: T.func.isRequired,
  selectedProblem: T.object,
  classes: _T.classes.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectFetchingProblems,
  problems: selectProblems,
  selectedProblem: selectSelectedProblem,
});

const mapDispatchToProps = {
  fetchProblems,
  selectProblem,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Problems));
