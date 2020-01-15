import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import _T from 'Services/custom-prop-types';
import Typography from '../Typography';
import patternValidator from './patterns';
import maskCreator from './masks';

const styles = theme => ({
  root: {
    position: 'relative',
  },
  inputRoot: {
    '&:after': {
      content: 'none',
    },
    '&:before': {
      content: 'none',
    },
  },
  inputInput: {},
  outlined: {
    '& $inputRoot': {
      border: theme.mixins.border(),
      borderRadius: theme.shape.borderRadius,
      boxSizing: 'border-box',
      padding: theme.spacing(0.75, 1),
    },
    '& $formHelperTextError': {
      top: theme.spacing(),
      right: theme.spacing(),
    },
  },
  labelRoot: {
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
  startAdornment: {},
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
        <FontAwesomeIcon className={classNames(classes.iconAdornment, classes[`${position}Adornment`])} icon={value} />
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
    e.persist();

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
      color,
      label,
      value,
      defaultValue,
      helperText,
      variant,
      onChange,
      patternType,
      maskType,
      name,
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
          name={name}
          onChange={this.onInputChange}
          error={!!(error || inputError)}
          value={displayValue}
          startAdornment={this.startAdornment}
          endAdornment={this.endAdornment}
          onBlur={this.toggleFocus}
          onFocus={this.toggleFocus}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
            formControl: classes.formControl,
          }}
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
  FormControlProps: {},
  color: 'primary',
};

InputField.propTypes = {
  color: T.oneOf(['primary', 'secondary']),
  /* Inout element name */
  name: T.string.isRequired,
  /* Default value */
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
