import React from 'react';
import T from 'prop-types';
import get from 'lodash/get';
import Collapse from '@material-ui/core/Collapse';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import _T from 'Services/custom-prop-types';
import { init, selectProblem } from 'Actions/problems';
import { selectFetchingProblems, selectProblems, selectSelectedProblem, selectProblemFilter } from 'Selectors/problems';
import Grid from 'Components/Grid';
import Button from 'Components/Button';
import InputField from 'Components/InputField';
import UnorderedList from 'Components/UnorderedList';
import Typography from 'Components/Typography';
import Card from 'Components/Card';
import Loading from 'Components/Loading';
import Problem from '../Problem';
import ProblemsFilter from '../ProblemsFilter';
import ProblemsList from '../ProblemsList';

const styles = theme => ({
  root: {},
  searchCard: {
    width: '100%',
    borderBottom: theme.mixins.border(),
  },
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
  primaryFilter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& > button': {
      alignSelf: 'flex-end',
    },
  },
});

class Problems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredList: props.problems,
    };
  }

  componentDidMount() {
    this.props.init();
  }

  filterChangeCallback = () => {

  }

  render() {
    const { loading, selectedProblem, classes } = this.props;
    const { filteredList } = this.state;

    return (
      <Grid alignItems="stretch" wrap="nowrap" classes={{ root: classes.root }} container>
        <Grid xs={3} sm={4} item>
          {loading ? <Loading /> : <ProblemsList problems={filteredList} />}
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
  init: T.func.isRequired,
  selectedProblem: T.object,
  classes: _T.classes.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectFetchingProblems,
  problems: selectProblems,
  selectedProblem: selectSelectedProblem,
});

const mapDispatchToProps = {
  init,
  selectProblem,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Problems));
