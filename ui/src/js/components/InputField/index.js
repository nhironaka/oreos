import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
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
  type,
  classes,
  ...rest
}) {
  const baseClasses = useStyles({ classes });
  const [inputType, setInputType] = React.useState(type);
  const togglePassword = React.useCallback(() => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  }, [inputType, setInputType]);
  const Component = React.useMemo(() => getInputFieldComponent(variant), [
    variant,
  ]);

  return (
    <FormControl
      variant={variant}
      disabled={disabled}
      error={error}
      classes={{ root: baseClasses.root }}
    >
      {inputLabel && (
        <InputLabel
          htmlFor={id}
          classes={{
            root: baseClasses.inputLabel,
            error: baseClasses.inputLabelError,
            disabled: baseClasses.inputLabelDisabled,
            filled: baseClasses.inputLabelFilled,
            outlined: baseClasses.inputLabelOutlined,
          }}
        >
          {inputLabel}
        </InputLabel>
      )}
      <Component
        id={id}
        value={value}
        type={inputType}
        onChange={onChange}
        className={classNames({
          [baseClasses.outlinedInput]: variant === 'outlined',
          [baseClasses.filledInput]: variant === 'filled',
        })}
        classes={{ root: baseClasses.input }}
        endAdornment={type === 'password' ? (
          <InputAdornment position="end">
            <IconButton size="small" onClick={togglePassword}>
              {inputType === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ) : null}
        {...rest}
      />
      {formHelperText && (
        <FormHelperText
          classes={{
            root: baseClasses.formHelperText,
            error: baseClasses.formHelperTextError,
            disabled: baseClasses.formHelperTextDisabled,
            filled: baseClasses.formHelperTextFilled,
            contained: baseClasses.inputLabelContained,
          }}
        >
          {formHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

InputField.defaultProps = {
  type: 'text',
  variant: 'standard',
  id: null,
  inputLabel: '',
  disabled: false,
  error: false,
  formHelperText: '',
};

InputField.propTypes = {
  type: T.string,
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
