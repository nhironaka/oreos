import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/styles';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

import _T from 'Services/custom-prop-types';

const styles = () => ({
  root: {},
});

function CircularProgress({ color, variant, classes, ...rest }) {
  return (
    <MuiCircularProgress
      color={color}
      variant={variant}
      classes={{ root: classes.root }}
      {...rest}
    />
  );
}

CircularProgress.defaultProps = {
  color: 'primary',
  variant: 'indeterminate',
};

CircularProgress.propTypes = {
  color: T.oneOf(['primary', 'secondary', 'inherit']),
  variant: T.oneOf(['indeterminate', 'determinate', 'static']),
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(CircularProgress);
