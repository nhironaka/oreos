import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/styles';
import MuiTypography from '@material-ui/core/Typography';

const styles = () => ({
  root: {},
});

function Typography({ color, ...rest }) {
  return <MuiTypography color={color} {...rest} />;
}

Typography.defaultProps = {
  color: 'primary',
};

Typography.propTypes = {
  color: T.oneOf(['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']),
};

export default withStyles(styles)(Typography);
