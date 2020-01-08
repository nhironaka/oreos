import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';

import _T from 'Services/custom-prop-types';

const styles = () => ({
  root: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
});

function UnorderedList({ className, classes, children }) {
  return <ul className={classNames(className, classes.root)}>{children}</ul>;
}

UnorderedList.defaultProps = {
  className: '',
};

UnorderedList.propTypes = {
  className: T.string,
  children: T.node.isRequired,
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(UnorderedList);
