import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useSpacingStyles } from '../../styles/spacing';
import { logout as logoutAction } from '../../actions/auth';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Divider from '../../components/Divider';

const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: 'space-between',
  },
  buttonGroup: {
    color: theme.palette.common.white,
  },
  card: {
    right: 0,
  },
}));
const DROPDOWN_OPTIONS = [
  {
    id: 'account',
    account: 'Account',
  },
  'divider',
  {
    id: 'logout',
    label: 'Log out',
  },
];

function Header({ logout }) {
  const classes = useStyles();
  const history = useHistory();
  const spacingClasses = useSpacingStyles();
  const dropdownSelectCallback = React.useCallback(
    option => {
      if (option.id === 'account') {
        history.push('/profile');
      } else if (option.id === 'logout') {
        logout();
        history.replace('/');
      }
    },
    [history, logout]
  );

  return (
    <AppBar position="static">
      <Toolbar
        className="md"
        classes={{ root: classNames(spacingClasses.root, classes.toolbar) }}
      >
        <Typography variant="h4">Oreo</Typography>
        <Dropdown
          options={DROPDOWN_OPTIONS}
          onClick={dropdownSelectCallback}
          classes={{ card: classes.card }}
        >
          <AccountCircleIcon />
        </Dropdown>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  logout: T.func.isRequired,
};

const mapDispatchToProps = {
  logout: logoutAction,
};

export default connect(null, mapDispatchToProps)(Header);
