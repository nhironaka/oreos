import React from 'react';
import T from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { withStyles } from '@material-ui/styles';

import _T from 'Services/custom-prop-types';

const styles = () => ({
  root: {},
  outlined: {
    '&:hover $notchedOutline': {
      borderColor: blueGrey[100],
    },
  },
  notchedOutline: {},
});

function TextField({ variant, value, onChange, classes,...rest }) {
  let Component = 'input';
  const textFieldClasses = { root: classes.root };
  switch (variant) {
    case 'outlined':
      Component = OutlinedInput;
      textFieldClasses.root = classes.outlined;
      textFieldClasses.notchedOutline = classes.notchedOutline;
      break;
    case 'standard':
    default:
      Component = MuiTextField;
      break;
  }

  return <Component value={value} onChange={onChange} classes={textFieldClasses} {...rest} />;
}

TextField.defaultProps = {
  variant: 'outlined',
};

TextField.propTypes = {
  variant: T.oneOf(['standard', 'outlined', 'filled']),
  value: T.any.isRequired,
  onChange: T.func.isRequired,
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(TextField);
