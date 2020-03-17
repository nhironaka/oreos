import React from 'react';
import classNames from 'classnames';
import T from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Button from '../Button';
import Card from '../Card';
import UnorderedList from '../UnorderedList';
import DropdownOption from './option';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  button: {
    padding: 0,
    minWidth: 0,
  },
  buttonLabel: {
    width: 'auto',
  },
  card: {
    position: 'absolute',
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s linear 300ms, opacity 300ms',
  },
  open: {
    visibility: 'visible',
    opacity: 1,
    transition: 'visibility 0s linear 300ms, opacity 0s',
  },
}));

export default function Dropdown({
  children,
  options,
  render,
  onClick,
  multiselect,
  classes,
}) {
  const baseClasses = useStyles({ classes });
  const [open, toggleOpen] = React.useState(false);
  const renderCallback = React.useCallback(
    option => {
      if (typeof render === 'function') {
        return render(option);
      }
      return (
        <DropdownOption
          key={option.id || option}
          option={option}
          onClick={onClick}
          multiselect={multiselect}
        />
      );
    },
    [onClick, multiselect, render]
  );

  return (
    <div className={baseClasses.root}>
      <Button
        color="inherit"
        variant="text"
        classes={{ root: baseClasses.button, label: baseClasses.buttonLabel }}
        onClick={() => toggleOpen(!open)}
      >
        {children}
      </Button>
      <Card
        padding="sm"
        classes={{ root: baseClasses.card }}
        className={classNames({
          [baseClasses.open]: open,
        })}
      >
        <UnorderedList options={options} render={renderCallback} />
      </Card>
    </div>
  );
}

Dropdown.defaultProps = {
  classes: {},
  multiselect: false,
  render: null,
  onClick: () => {},
};

Dropdown.propTypes = {
  options: T.array.isRequired,
  multiselect: T.bool,
  render: T.func,
  onClick: T.func,
  children: T.node.isRequired,
  classes: T.object,
};
