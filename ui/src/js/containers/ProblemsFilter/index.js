import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import _T from 'Services/custom-prop-types';
import { fetchProblems, selectProblem } from 'Actions/problems';
import { selectProblemFilter } from '../../selectors/problems';
import SelectFilterItem from './selectFilterItem';

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
});

function ProblemsFilter({ filters, filterChangeCallback, classes }) {

  return (
    <div className={classes.root}>
      {filters.forEach(filter => {
        switch (filter.type.id) {
          case 'select':
            return <SelectFilterItem filter={filter} filterChangeCallback={filterChangeCallback} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

ProblemsFilter.propTypes = {
  filters: T.array.isRequired,
  filterChangeCallback: T.func.isRequired,
  classes: _T.classes.isRequired,
};

const mapStateToProps = createStructuredSelector({
  filters: selectProblemFilter,
});

const mapDispatchToProps = {
  fetchProblems,
  selectProblem,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProblemsFilter));
