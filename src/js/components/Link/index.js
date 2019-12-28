import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Typography from '../Typography';

const styles = () => ({
  root: {
    textDecoration: 'none',
  },
});

class Link extends React.Component {
  render() {
    const { children, ...rest } = this.props;

    return (
      <Typography Component={RouterLink} {...rest}>
        {children}
      </Typography>
    );
  }
}

export default withStyles(styles)(Link);
