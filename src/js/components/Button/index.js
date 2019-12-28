import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/styles';
import MuiButton from '@material-ui/core/Button';

import _T from 'Services/custom-prop-types';

const styles = () => ({
  root: {},
  text: {
    textTransform: 'none',
    '& $label': {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  label: {},
});

function Button({ variant, onClick, disableRipple, classes, ...rest }) {
  return (
    <MuiButton
      variant={variant}
      onClick={onClick}
      disableRipple={disableRipple}
      classes={{ root: classes.root, text: classes.text, label: classes.label }}
      {...rest}
    />
  );
}

Button.defaultProps = {
  variant: 'outlined',
  disableRipple: true,
};

Button.propTypes = {
  variant: T.oneOf(['text', 'outlined', 'contained']),
  onClick: T.func.isRequired,
  disableRipple: T.bool,
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(Button);
