import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from 'Components/Typography';
import _T from 'Services/custom-prop-types';

const styles = theme => ({
  root: {
    borderBottom: theme.mixins.border(),
    background: theme.palette.common.white,
  },
});

function NavBar({ classes }) {
  return (
    <AppBar color="inherit" position="static" elevation={0} classes={{ root: classes.root }}>
      <Toolbar>
        <Typography variant="h6">Oreos</Typography>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(NavBar);
