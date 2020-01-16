import React from 'react';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
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

export default function InputField({ variant, id, inputLabel, value, disabled, error, formHelperText, onChange, ...rest }) {
  const classes = useStyles();
  const Component = React.useMemo(() => getInputFieldComponent(variant), [variant]);

  return (
    <FormControl variant={variant} disabled={disabled} error={error}>
      <InputLabel htmlFor={id}>{inputLabel}</InputLabel>
      <Component id={id} value={value} onChange={onChange} />
      <FormHelperText>{formHelperText}</FormHelperText>
    </FormControl>
  )
}
