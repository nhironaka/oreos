import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import _T from 'Services/custom-prop-types';
import Typography from 'Components/Typography';

const styles = theme => ({
  root: {
    borderBottom: theme.mixins.border(),
  },
});

function NavBar({ classes }) {
  return (
    <AppBar color="primary" position="static" elevation={0} classes={{ root: classes.root }}>
      <Toolbar>
        <Typography variant="h6" color="inherit">Oreos</Typography>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(NavBar);
