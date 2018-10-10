import React from 'react';
import classNames from 'classnames';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import _T from 'Services/custom-prop-types';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: theme.mixins.border(),
    boxSizing: 'border-box',
  },
  noPadding: {
    padding: 0,
  },
  mediumRadius: {
    borderRadius: 8,
  },
  smallRadius: {
    borderRadius: 4,
    padding: 8,
  },
  largeRadius: {
    borderRadius: 12,
  },
  noBorder: {
    border: 'none',
  },
  hover: {
    '&:hover': {
      backgroundColor: '#F8F8F8',
    },
  },
  mediumPadding: {
    padding: 16,
  },
  smallPadding: {
    padding: 12,
  },
  largePadding: {
    padding: 20,
  },
  colorError: {
    color: theme.palette.error.dark,
    borderColor: theme.palette.error.dark,
    background: theme.palette.error.light,
  },
  colorPrimary: { backgroundColor: '#FFEFEE', borderColor: theme.palette.primary.main },
  colorDefault: { backgroundColor: '#FCFCFC' },
  colorSecondary: { backgroundColor: theme.palette.secondary.light },
  colorDisabled: {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
    pointerEvents: 'none',
  },
});

function Card({ radius, Component, noBorder, children, className, hover, color, disabled, padding, classes, ...rest }) {
  const {
    root,
    mediumRadius,
    smallRadius,
    largeRadius,
    mediumPadding,
    smallPadding,
    largePadding,
    colorPrimary,
    colorDefault,
    colorSecondary,
    colorError,
    colorDisabled,
    hover: hoverClass,
    noPadding: noPaddingClass,
    noBorder: noBorderClass,
    ...restClasses
  } = classes;

  return (
    <Component
      className={classNames(root, className, {
        [mediumRadius]: radius === 'md',
        [smallRadius]: radius === 'sm',
        [largeRadius]: radius === 'lg',
        [mediumPadding]: padding === 'md',
        [smallPadding]: padding === 'sm',
        [largePadding]: padding === 'lg',
        [noBorderClass]: noBorder,
        [noPaddingClass]: padding === 'none',
        [hoverClass]: hover,
        [colorPrimary]: color === 'primary',
        [colorDefault]: color === 'default',
        [colorSecondary]: color === 'secondary',
        [colorError]: color === 'error',
        [colorDisabled]: disabled,
      })}
      classes={typeof Component === 'string' ? null : restClasses}
      {...rest}
    >
      {children}
    </Component>
  );
}

Card.defaultProps = {
  Component: 'div',
  className: '',
  disabled: false,
  noBorder: false,
  hover: false,
};

Card.propTypes = {
  /* Padding amount */
  padding: T.oneOf(['none', 'sm', 'md', 'lg']),
  /* Card color */
  color: T.oneOf(['default', 'primary', 'secondary', 'error']),
  /* Border radius size */
  radius: T.oneOf(['sm', 'md', 'lg']),
  /* Whether the card has borders */
  noBorder: T.bool,
  /* Whether the card has borders */
  disabled: T.bool,
  /* Whether the card should have a hover state */
  hover: T.bool,
  /* className */
  className: T.string,
  /* Wrapping component type */
  Component: T.oneOfType([T.string, T.elementType]),
  /* The card content */
  children: T.node.isRequired,
  /* Default props from withStyles */
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(Card);
