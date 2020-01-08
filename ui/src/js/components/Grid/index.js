import React from 'react';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import _T from 'Services/custom-prop-types';

const styles = () => ({
  root: {},
  fullWidth: {
    width: '100%',
  },
  grow: {
    flex: 1,
  },
});

function NavBar({ grow, fullWidth, classes, ...rest }) {
  return (
    <Grid
      className={classNames(classes.rest, {
        [classes.fullWidth]: fullWidth,
        [classes.grow]: grow,
      })}
      {...rest}
    />
  );
}
NavBar.defaultProps = {
  fullWidth: false,
  grow: false,
};

NavBar.propTypes = {
  grow: T.bool,
  fullWidth: T.bool,
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(NavBar);
