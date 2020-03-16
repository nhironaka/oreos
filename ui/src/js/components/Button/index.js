import React from 'react';
import T from 'prop-types';
import MuiButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {},
});

export default function Button({ variant, color, onClick, classes, ...rest }) {
  const defaultClasses = useStyles({ classes });

  return (
    <MuiButton
      variant={variant}
      color={color}
      onClick={onClick}
      classes={{ root: defaultClasses.root }}
      {...rest}
    />
  );
}

Button.defaultProps = {
  variant: 'outlined',
  color: 'primary',
  classes: {},
};

Button.propTypes = {
  variant: T.oneOf(['text', 'outlined', 'standard']),
  color: T.oneOf(['default', 'inherit', 'primary', 'secondary']),
  onClick: T.func.isRequired,
  classes: T.object,
};
