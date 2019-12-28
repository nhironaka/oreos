import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import _T from 'Services/custom-prop-types';
import InputField from '../InputField';
import Typography from '../Typography';
import Card from '../Card';

const styles = () => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

class InlineInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editing: !!props.value,
    };
  }

  onCancel

  render() {
    const { variant, label, value, onChange, classes } = this.props;
    const { editing } = this.state;

    if (editing) {
      return (
        <InputField
          variant={variant}
          label={label}
          value={value}
          onChange={onChange}
          adornment={[
            null,
            {
              type: 'node',
              value: (
                  <>
                  <Button variant="text" onClick={this.onCancel}>

                  </Button>
                  </>
              )
            },
          ]}
        />
      );
    }
    return null;
  }
}

InlineInput.defaultProps = {
  variant: 'outlined',
  label: '',
};

InlineInput.propTypes = {
  variant: T.oneOf(['outlined', 'standard', 'filled']),
  onChange: T.func.isRequired,
  value: T.string.isRequired,
  label: T.string,
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(InlineInput);
