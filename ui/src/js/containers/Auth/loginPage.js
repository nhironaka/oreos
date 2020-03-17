import React from 'react';
import classNames from 'classnames';
import T from 'prop-types';
import get from 'lodash/get';
import { useHistory, useLocation } from 'react-router';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { login as loginAction } from '../../actions/auth';
import { useSpacingStyles } from '../../styles/spacing';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoginSplash from '../../components/Illustrations/loginSpash';
import InputField from '../../components/InputField';
import Link from '../../components/Link';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexWrap: 'nowrap',
  },
  formWrapper: {
    border: 0,
    flex: 3,
    minWidth: 0,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
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

function LoginPage({ form, updateFormCallback, login }) {
  const history = useHistory();
  const location = useLocation();
  const spacingClasses = useSpacingStyles();
  const classes = useStyles();
  const cardRef = React.useRef();
  const { username, password } = form;
  const loginCallback = React.useCallback(async () => {
    const pathname = get(location, 'from.pathname', '/container');
    await login(username, password);

    history.replace(pathname === 'login' ? '/container' : pathname);
  }, [history, username, password, login, location]);

  React.useEffect(() => {
    if (cardRef.current) {
      cardRef.current.addEventListener('keydown', e => {
        if (e.code === 'Enter') {
          loginCallback();
        }
      });
    }
  }, [cardRef, loginCallback]);

  return (
    <Card classes={{ root: classes.root }}>
      <div className={classes.loginSplashWrapper}>
        <LoginSplash />
      </div>
      <Card
        component="form"
        padding="md"
        cardRef={cardRef}
        classes={{ root: classes.formWrapper }}
        className={classNames(classes.form, spacingClasses.root, 'column md')}
      >
        <InputField
          name="username"
          inputLabel="Email"
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
        <div>
          <Link to="/signup">Register</Link>
        </div>
      </Card>
    </Card>
  );
}

LoginPage.propTypes = {
  login: T.func.isRequired,
  updateFormCallback: T.func.isRequired,
  form: T.shape({
    username: T.string,
    password: T.string,
  }).isRequired,
};

const mapDispatchToProps = {
  login: loginAction,
};

export default connect(null, mapDispatchToProps)(LoginPage);
