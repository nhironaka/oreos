import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import _T from 'Services/custom-prop-types';
import Button from '../Button';

const styles = theme => ({
  root: {
    alignItems: 'stretch',
  },
  button: {
    borderRadius: 0,
    '&.disabled': {
      color: 'inherit',
      border: 'inherit',
    },
  },
  selected: {
    backgroundColor: theme.palette.action.hover,
  },
});

function NavButtonGroup({ size, color, selected, variant, options, onClick, classes }) {
  return (
    <ButtonGroup size={size} color={color} variant={variant} classes={{ root: classes.root }}>
      {options.map(option => (
        <Button
          key={option.id}
          variant={variant}
          color={color}
          onClick={e => onClick(e, option)}
          classes={{ root: classes.button }}
          className={classNames({
            [classes.selected]: get(selected, option.id, selected === option.id),
            disabled: option.type === 'label',
          })}
          disabled={option.type === 'label'}
          disableRipple
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

NavButtonGroup.defaultProps = {
  variant: 'outlined',
  size: 'large',
  color: 'default',
  selected: '',
};

NavButtonGroup.propTypes = {
  size: T.oneOf(['small', 'medium', 'large']),
  color: T.oneOf(['default', 'inherit', 'primary', 'secondary']),
  variant: T.oneOf(['text', 'outlined', 'contained']),
  selected: T.oneOf([T.string, T.object]),
  options: T.array.isRequired,
  onClick: T.func.isRequired,
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(NavButtonGroup);
