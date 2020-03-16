import React from 'react';
import T from 'prop-types';
import { useHistory, useLocation } from 'react-router';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { login as loginAction } from '../../actions/auth';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoginSplash from '../../components/Illustrations/loginSpash';
import InputField from '../../components/InputField';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    flex: 1,
    minHeight: 0,
    '& > form': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 3,
      minWidth: 0,
    },
  },
  loginSplashWrapper: {
    flex: 7,
    minWidth: 0,
    height: '100%',
    background: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function LoginPage({ login }) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const { from } = location.state || { from: { pathname: '/' } };
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const updateFormCallback = React.useCallback(
    ({ target: { value, name } }) => {
      if (name === 'username') {
        setUsername(value);
      } else if (name === 'password') {
        setPassword(value);
      }
    },
    [setUsername, setPassword]
  );
  const loginCallback = React.useCallback(async () => {
    const error = await login(username, password);
    if (!error && from) {
      history.replace(from);
    }
  }, [history, username, password, from, login]);

  return (
    <Card classes={{ root: classes.root }}>
      <div className={classes.loginSplashWrapper}>
        <LoginSplash />
      </div>
      <Card component="form" padding="md">
        <InputField
          name="username"
          inputLabel="User name"
          type="text"
          value={username}
          onChange={updateFormCallback}
        />
        <InputField
          name="password"
          inputLabel="Password"
          type="password"
          value={password}
          onChange={updateFormCallback}
        />
        <Button onClick={loginCallback}>Log in</Button>
      </Card>
    </Card>
  );
}

LoginPage.propTypes = {
  login: T.func.isRequired,
};

const mapDispatchToProps = {
  login: loginAction,
};

export default connect(null, mapDispatchToProps)(LoginPage);
