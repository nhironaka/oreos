import React from 'react';
import T from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Button from '../Button';

const useStyles = makeStyles({
  root: {
    minWidth: 'min-content',
    textTransform: 'unset',
  },
  label: {
    width: 'auto',
  },
});

export default function Link({ to, classes, ...rest }) {
  const baseClasses = useStyles({ classes });

  return (
    <Button
      variant="text"
      component={RouterLink}
      to={to}
      classes={baseClasses}
      {...rest}
      disableRipple
    />
  );
}

Link.propTypes = {
  to: T.oneOfType([T.string, T.object, T.func]).isRequired,
  classes: T.object,
};
