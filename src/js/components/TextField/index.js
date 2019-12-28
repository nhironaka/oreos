import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/styles';
import MuiTextField from '@material-ui/core/TextField';

const styles = () => ({
  root: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
});

function TextField({ variant, value, onChange, ...rest }) {
  return <MuiTextField variant={variant} value={value} onChange={onChange} {...rest} />;
}

TextField.defaultProps = {
  variant: 'outlined',
};

TextField.propTypes = {
  variant: T.oneOf(['standard', 'outlined', 'filled']),
  value: T.any.isRequired,
  onChange: T.func.isRequired,
};

export default withStyles(styles)(TextField);
