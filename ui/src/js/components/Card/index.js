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

export default function Card({
  variant, padding, cardRef, classes, ...rest
}) {
  const baseClasses = useStyles({ classes });

  return (
    <MuiCard
      variant={variant}
      ref={cardRef}
      classes={{
        root: classNames(baseClasses.root, {
          [baseClasses.paddingSm]: padding === 'sm',
          [baseClasses.paddingMd]: padding === 'md',
          [baseClasses.paddingLg]: padding === 'lg',
        }),
      }}
      {...rest}
    />
  );
}
Card.defaultProps = {
  variant: 'outlined',
  padding: 'none',
  cardRef: null,
  classes: {},
};

Card.propTypes = {
  variant: T.oneOf(['elevation', 'outlined']),
  padding: T.oneOf(['none', 'sm', 'md', 'lg']),
  classes: T.objectOf(T.string),
  cardRef: T.oneOfType([
    T.func,
    T.shape({ current: T.instanceOf(Element) }),
  ]),
};
