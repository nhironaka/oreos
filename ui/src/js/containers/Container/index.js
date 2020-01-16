import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import _T from 'Services/custom-prop-types';
import Dropdown from '../../components/Dropdown';
import { fetchItems } from '../../reducers/filters';

const styles = () => ({
  root: {},
});

class Container extends React.Component {
  fetchItems = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([{
          id: 1,
          label: 'Go',
        }, {
          id: 1,
          label: 'Stop',
        }])
      }, 1000);
    })
  }

  updateSelected = (...rest) => {
    console.log(rest);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Dropdown label="status" fetchItems={this.props.fetchItems} onChange={this.updateSelected} searchable />
      </div>
    );
  }
}

Container.propTypes = {
  classes: _T.classes.isRequired,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  fetchItems
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Container));
