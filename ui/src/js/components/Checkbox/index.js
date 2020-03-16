import React from 'react';
import T from 'prop-types';
import MuiCheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Checkbox({
  checked,
  onChange,
  label,
  labelPlacement,
  ...rest
}) {
  return (
    <FormControlLabel
      control={<MuiCheckbox checked={checked} onChange={onChange} {...rest} />}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
}

Checkbox.defaultProps = {
  labelPlacement: 'end',
  label: '',
};

Checkbox.propTypes = {
  checked: T.bool.isRequired,
  onChange: T.func.isRequired,
  label: T.node,
  labelPlacement: T.oneOf(['top', 'bottom', 'start', 'end']),
};
