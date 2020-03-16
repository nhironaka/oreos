import React from 'react';
import classNames from 'classnames';
import T from 'prop-types';
import MuiCard from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  paddingSm: {
    padding: theme.spacing(1, 2),
  },
  paddingMd: {
    padding: theme.spacing(2, 4),
  },
  paddingLg: {
    padding: theme.spacing(4, 8),
  },
}));

export default function Card({ variant, padding, classes, ...rest }) {
  const defaultClasses = useStyles({ classes });

  return (
    <MuiCard
      variant={variant}
      classes={{
        root: classNames(defaultClasses.root, {
          [defaultClasses.paddingSm]: padding === 'sm',
          [defaultClasses.paddingMd]: padding === 'md',
          [defaultClasses.paddingLg]: padding === 'lg',
        }),
      }}
      {...rest}
    />
  );
}
Card.defaultProps = {
  variant: 'outlined',
  padding: 'none',
  classes: {},
};

Card.propTypes = {
  variant: T.oneOf(['elevation', 'outlined']),
  padding: T.oneOf(['none', 'sm', 'md', 'lg']),
  classes: T.objectOf(T.string),
};
