import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';

import _T from 'Services/custom-prop-types';
import Typography from '../Typography';
import patternValidator from './patterns';
import maskCreator from './masks';

const styles = theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(),
  },
  inputRoot: {
    '&:after': {
      content: 'none',
    },
    '&:before': {
      content: 'none',
    },
  },
  inputInput: {
    padding: 0,
  },
  outlined: {
    border: theme.mixins.border(),
    borderRadius: theme.shape.borderRadius,
    boxSizing: 'border-box',
    padding: theme.spacing(),
    '& $formHelperTextError': {
      top: theme.spacing(),
      right: theme.spacing(),
    },
  },
  labelRoot: {
    transform: 'none',
    position: 'relative',
    '& + $formControl': {},
    '&$labelFocused': {},
  },
  noPadding: {
    padding: 0,
  },
  labelFocused: {},
  focused: {},
  formControl: {},
  formHelperTextError: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 0,
    maxWidth: '50%',
  },
  iconAdornment: {},
  startAdornment: {
    lineHeight: '1.25rem',
  },
  endAdornment: {},
});

class InputField extends React.Component {
  constructor(props) {
    super(props);
    const { adornment } = this.props;
    const [startAdornment, endAdornment] = adornment;

    this.startAdornment = startAdornment && this.getAdornment(startAdornment, 'start');
    this.endAdornment = endAdornment && this.getAdornment(endAdornment, 'end');

    this.state = {
      value: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { value, maskType } = props;
    if (state.value !== value) {
      let displayValue = value;
      if (maskType) {
        const { maskedValue } = maskCreator(maskType, value);

        displayValue = maskedValue;
      }
      return {
        value: props.value,
        focused: false,
        displayValue: displayValue || '',
        error: null,
      };
    }

    return null;
  }

  getAdornment = ({ value, type }, position) => {
    const { classes } = this.props;
    if (type === 'icon') {
      return (
        <Icon classes={{ root: classes.iconAdornment }} className={classes[`${position}Adornment`]}>
          {value}
        </Icon>
      );
    }
    if (type === 'string') {
      return (
        <Typography color="secondary" className={classes[`${position}Adornment`]}>
          {value}
        </Typography>
      );
    }

    return value;
  };

  onInputChange = e => {
    const { patternType, maskType } = this.props;
    let {
      target: { value },
    } = e;
    let valid = true;

    if (patternType) {
      const patternError = patternValidator(patternType, value);

      if (patternError) {
        this.setState({
          error: patternError,
        });
        return;
      }
    }

    if (maskType) {
      const { error, valid: validInput, maskedValue = '' } = maskCreator(maskType, value);

      valid = validInput;
      if (error) {
        this.setState({
          error,
          displayValue: maskedValue,
        });
        return;
      }
      value = maskedValue;
    }
    if (this.props.onChange && valid) {
      this.props.onChange(e, value);
    }
    this.setState({
      displayValue: value,
      error: null,
    });
  };

  toggleFocus = () => {
    this.setState(state => ({
      focused: !state.focused,
    }));
  };

  render() {
    const {
      label,
      value,
      defaultValue,
      helperText,
      variant,
      onChange,
      patternType,
      maskType,
      classes,
      error: inputError,
      FormControlProps,
      ...rest
    } = this.props;
    const { error, displayValue, focused } = this.state;

    return (
      <FormControl
        classes={{
          root: classNames(classes.root, {
            [classes.outlined]: variant === 'outlined',
            [classes.focused]: focused,
          }),
        }}
        {...FormControlProps}
      >
        {label && (
          <InputLabel classes={{ root: classes.labelRoot, focused: classes.labelFocused }} disableAnimation shrink>
            {label}
          </InputLabel>
        )}
        <Input
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
            formControl: classes.formControl,
          }}
          onChange={this.onInputChange}
          error={!!(error || inputError)}
          value={displayValue}
          startAdornment={this.startAdornment}
          endAdornment={this.endAdornment}
          onBlur={this.toggleFocus}
          onFocus={this.toggleFocus}
          {...rest}
        />
        {(error || inputError) && (
          <FormHelperText classes={{ error: classes.formHelperTextError }} error>
            {error || inputError}
          </FormHelperText>
        )}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
}

InputField.defaultProps = {
  defaultValue: '',
  variant: 'outlined',
  label: '',
  error: '',
  helperText: '',
  value: '',
  adornment: [],
  FormControlProps: {}
};

InputField.propTypes = {
  defaultValue: T.any,
  /* Input label */
  label: T.node,
  /* Input error */
  error: T.node,
  /* Form control props */
  FormControlProps: T.object,
  /* Input style type */
  variant: T.oneOf(['outlined', 'standard', 'filled']),
  /* Pattern type input should match */
  patternType: T.string,
  /* Mask type to apply input */
  maskType: T.string,
  /* Input change callback */
  onChange: T.func,
  /* Input value */
  value: T.any,
  /* Input helper text */
  helperText: T.string,
  /* Adornment values */
  adornment: T.arrayOf(
    T.shape({
      type: T.string,
      value: T.any,
    })
  ),
  classes: _T.classes.isRequired,
};
export default withStyles(styles)(InputField);
