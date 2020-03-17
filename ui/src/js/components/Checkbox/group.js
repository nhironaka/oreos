import React from 'react';
import T from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

import Checkbox from '.';
import _T from '../../services/custom-prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formLabel: {},
  formLabelError: {},
  formLabelDisabled: {},
  formControl: {
    margin: theme.spacing(3),
  },
  formHelperText: {},
  formHelperTextError: {},
  formHelperTextDisabled: {},
}));

export default function CheckboxGroup({
  disabled,
  error,
  formLabel,
  formHelperText,
  options,
  value,
  onChange,
  classes,
}) {
  const baseClasses = useStyles({ classes });

  return (
    <FormControl
      component="fieldset"
      disabled={disabled}
      error={error}
      classes={{ root: baseClasses.root }}
    >
      <FormLabel
        component="legend"
        classes={{
          root: baseClasses.formLabel,
          error: baseClasses.formLabelError,
          disabled: baseClasses.formLabelDisabled,
        }}
      >
        {formLabel}
      </FormLabel>
      <FormGroup>
        {options.map(option => (
          <Checkbox
            checked={value[option.id]}
            {...option}
            onChange={e => onChange(e, option)}
          />
        ))}
      </FormGroup>
      <FormHelperText
        classes={{
          root: baseClasses.formHelperText,
          error: baseClasses.formHelperTextError,
          disabled: baseClasses.formHelperTextDisabled,
        }}
      >
        {formHelperText}
      </FormHelperText>
    </FormControl>
  );
}

CheckboxGroup.defaultProps = {
  formLabel: '',
  formHelperText: '',
  disabled: false,
  error: false,
};

CheckboxGroup.propTypes = {
  formLabel: T.node,
  formHelperText: T.node,
  options: T.arrayOf(
    T.shape({
      id: T.string,
    })
  ).isRequired,
  value: T.object.isRequired,
  onChange: T.func.isRequired,
  disabled: T.bool,
  error: T.bool,
  classes: _T.baseClasses.isRequired,
};
