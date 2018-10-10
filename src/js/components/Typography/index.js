import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/styles';
import MuiTypography from '@material-ui/core/Typography';

const styles = () => ({
  root: {},
});

function Typography({ color, noWrap, ...rest }) {
  return <MuiTypography color={color} noWrap={noWrap} {...rest} />;
}

Typography.defaultProps = {
  color: 'primary',
  noWrap: true,
};

Typography.propTypes = {
  color: T.oneOf(['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']),
  noWrap: T.bool,
};

export default withStyles(styles)(Typography);
