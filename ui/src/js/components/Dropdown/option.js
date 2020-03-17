import React from 'react';
import T from 'prop-types';

import Button from '../Button';
import Divider from '../Divider';

const optionsPropType = T.oneOfType([
  T.shape({
    id: T.string,
  }),
  T.string,
]);

function MultiSelectOption({ option, callback }) {
  let ButtonProps = {};
  let label = option;

  if (typeof option === 'object') {
    const { label: buttonLabel, ...rest } = option;
    ButtonProps = rest;
    label = buttonLabel;
  }
  return (
    <li>
      <Button
        color="inherit"
        variant="text"
        onClick={callback}
        {...ButtonProps}
      >
        {label}
      </Button>
    </li>
  );
}

MultiSelectOption.propTypes = {
  option: optionsPropType.isRequired,
  callback: T.func.isRequired,
};

function SingleSelectOption({ option, callback }) {
  let ButtonProps = {};
  let label = option;

  if (typeof option === 'object') {
    const { label: buttonLabel, ...rest } = option;
    ButtonProps = rest;
    label = buttonLabel;
  }
  console.log(label, typeof option);
  return (
    <li>
      <Button
        color="inherit"
        variant="text"
        onClick={callback}
        {...ButtonProps}
      >
        {label}
      </Button>
    </li>
  );
}

SingleSelectOption.propTypes = {
  option: optionsPropType.isRequired,
  callback: T.func.isRequired,
};

function DropdownOption({ option, multiselect, onClick }) {
  const onClickCallback = React.useCallback(() => onClick(option), [
    onClick,
    option,
  ]);
  return multiselect ? (
    <MultiSelectOption option={option} callback={onClickCallback} />
  ) : (
    <SingleSelectOption option={option} callback={onClickCallback} />
  );
}

DropdownOption.defaultProps = {
  multiselect: false,
};

DropdownOption.propTypes = {
  option: optionsPropType.isRequired,
  onClick: T.func.isRequired,
  multiselect: T.bool,
};

export default function DropdownItem({ option, ...rest }) {
  return option === 'divider' ? (
    <Divider />
  ) : (
    <DropdownOption option={option} {...rest} />
  );
}

DropdownItem.propTypes = {
  option: optionsPropType.isRequired,
};
