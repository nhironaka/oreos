import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {},
  // Input label styles
  inputLabel: {},
  inputLabelError: {},
  inputLabelDisabled: {},
  inputLabelFilled: {},
  inputLabelOutlined: {},
  // Input styles
  input: {},
  outlinedInput: {},
  filledInput: {},
  // Form helper text styles
  formHelperText: {},
  formHelperTextError: {},
  formHelperTextDisabled: {},
  formHelperTextFilled: {},
  formHelperTextContained: {},
});

function getInputFieldComponent(variant) {
  switch (variant) {
    case 'outlined':
      return OutlinedInput;
    case 'filled':
      return FilledInput;
    case 'standard':
    default:
      return Input;
  }
}

export default function InputField({
  variant,
  id,
  inputLabel,
  value,
  disabled,
  error,
  formHelperText,
  onChange,
  classes,
  ...rest
}) {
  const defaultClasses = useStyles({ classes });
  const Component = React.useMemo(() => getInputFieldComponent(variant), [
    variant,
  ]);

  return (
    <FormControl
      variant={variant}
      disabled={disabled}
      error={error}
      classes={{ root: defaultClasses.root }}
    >
      <InputLabel
        htmlFor={id}
        classes={{
          root: defaultClasses.inputLabel,
          error: defaultClasses.inputLabelError,
          disabled: defaultClasses.inputLabelDisabled,
          filled: defaultClasses.inputLabelFilled,
          outlined: defaultClasses.inputLabelOutlined,
        }}
      >
        {inputLabel}
      </InputLabel>
      <Component
        id={id}
        value={value}
        onChange={onChange}
        className={classNames({
          [defaultClasses.outlinedInput]: variant === 'outlined',
          [defaultClasses.filledInput]: variant === 'filled',
        })}
        classes={{ root: defaultClasses.input }}
        {...rest}
      />
      <FormHelperText
        classes={{
          root: defaultClasses.formHelperText,
          error: defaultClasses.formHelperTextError,
          disabled: defaultClasses.formHelperTextDisabled,
          filled: defaultClasses.formHelperTextFilled,
          contained: defaultClasses.inputLabelContained,
        }}
      >
        {formHelperText}
      </FormHelperText>
    </FormControl>
  );
}

InputField.defaultProps = {
  variant: 'standard',
  id: null,
  inputLabel: '',
  disabled: false,
  error: false,
  formHelperText: '',
};

InputField.propTypes = {
  variant: T.oneOf(['standard', 'filled', 'outlined']),
  id: T.string,
  inputLabel: T.string,
  value: T.any.isRequired,
  disabled: T.bool,
  error: T.bool,
  formHelperText: T.string,
  onChange: T.func.isRequired,
  classes: T.object,
};
