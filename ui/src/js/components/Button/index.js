import React from 'react';
import T from 'prop-types';
import MuiButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    
  },
  label: {
    whiteSpace: 'nowrap',
  },
});

export default function Button({ variant, color, onClick, classes, ...rest }) {
  const baseClasses = useStyles({ classes });

  return (
    <MuiButton
      variant={variant}
      color={color}
      onClick={onClick}
      classes={{ root: baseClasses.root, label: baseClasses.label }}
      {...rest}
    />
  );
}

Button.defaultProps = {
  variant: 'outlined',
  color: 'primary',
  onClick: () => {},
  classes: {},
};

Button.propTypes = {
  variant: T.oneOf(['text', 'outlined', 'standard']),
  color: T.oneOf(['default', 'inherit', 'primary', 'secondary']),
  onClick: T.func,
  classes: T.object,
};
