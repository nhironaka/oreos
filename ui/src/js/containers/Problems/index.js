import React from 'react';
import T from 'prop-types';
import get from 'lodash/get';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import _T from 'Services/custom-prop-types';
import { fetchProblems, selectProblem } from 'Actions/problems';
import { selectFetchingProblems, selectProblems, selectSelectedProblem } from 'Selectors/problems';
import Grid from 'Components/Grid';
import UnorderedList from 'Components/UnorderedList';
import Typography from 'Components/Typography';
import Card from 'Components/Card';
import Loading from 'Components/Loading';
import Problem from '../Problem';

const styles = theme => ({
  root: {},
  question: {
    maxHeight: 48,
    overflow: 'hidden',
    position: 'relative',
    paddingRight: '1em',
    '&:before': {
      content: '"..."',
      width: '2em',
      textAlign: 'center',
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      width: '2em',
      height: '1.5em',
      background: theme.palette.common.white,
    },
  },
  colorPrimary: {
    '& $question:after': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  unorderedList: {
    '& > li > button': {
      width: '100%',
      borderBottom: theme.mixins.border(),
    },
  },
  selectedProblemWrapper: {
    borderLeft: theme.mixins.border(1),
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
      <Grid alignItems="stretch" wrap="nowrap" classes={{ root: classes.root }} container>
        <Grid xs={3} sm={4} item>
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
                    classes={{ colorPrimary: classes.colorPrimary }}
                    noBorder
                  >
                    <Typography color="inherit" variant="subtitle1">
                      {problem.title}
                    </Typography>
                    <Typography align="left" color="inherit" classes={{ root: classes.question }}>
                      {problem.question}
                    </Typography>
                  </Card>
                </li>
              ))}
              <li>
                <Card
                  Component="button"
                  padding="md"
                  onClick={() =>
                    this.props.selectProblem({
                      status: Problem.PROBLEM_STATUS[0].id,
                    })
                  }
                  noBorder
                >
                  <Typography variant="subtitle1">
                    {'Add problem '}
                    <FontAwesomeIcon icon={faPlus} />
                  </Typography>
                </Card>
              </li>
            </UnorderedList>
          )}
        </Grid>
        <Grid xs={9} sm={8} classes={{ root: classes.selectedProblemWrapper }} item>
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
