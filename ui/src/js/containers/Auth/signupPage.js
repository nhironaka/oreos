import React from 'react';
import T from 'prop-types';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { signup as signupAction } from '../../actions/auth';
import { useSpacingStyles } from '../../styles/spacing';
import Card from '../../components/Card';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Link from '../../components/Link';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    '& > form': {
      width: 500,
      display: 'flex',
      flexDirection: 'column',
    },
  },
});

function SignUpPage({ form, updateFormCallback, signup }) {
  const history = useHistory();
  const classes = useStyles();
  const spacingClasses = useSpacingStyles();
  const cardRef = React.useRef();
  const signupCallback = React.useCallback(async () => {
    const error = await signup(form);
    if (!error) {
      history.replace('/');
    }
  }, [history, form, signup]);

  React.useEffect(() => {
    if (cardRef.current) {
      cardRef.current.addEventListener('keydown', e => {
        if (e.code === 'Enter') {
          signupCallback();
        }
      });
    }
  }, [cardRef, signupCallback]);

  return (
    <div className={classes.root}>
      <Card component="form" padding="md" className="column md" cardRef={cardRef} classes={{ root: spacingClasses.root }}>
        <InputField
          name="display_name"
          inputLabel="Name"
          type="text"
          value={form.display_name}
          onChange={updateFormCallback}
        />
        <InputField
          name="username"
          inputLabel="Email"
          type="email"
          value={form.username}
          onChange={updateFormCallback}
        />
        <InputField
          name="password"
          inputLabel="Password"
          type="password"
          value={form.password}
          onChange={updateFormCallback}
        />
        <Button onClick={signupCallback}>Sign up</Button>
        <div>
          <Link to="/login">Log in instead</Link>
        </div>
      </Card>
    </div>
  );
}

SignUpPage.propTypes = {
  signup: T.func.isRequired,
  updateFormCallback: T.func.isRequired,
  form: T.shape({
    username: T.string,
    password: T.string,
    display_name: T.string,
  }).isRequired,
};

const mapDispatchToProps = {
  signup: signupAction,
};

export default connect(null, mapDispatchToProps)(SignUpPage);
