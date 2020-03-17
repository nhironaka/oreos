import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import LoginPage from './loginPage';
import SignupPage from './signupPage';

export default function Auth() {
  const [form, updateForm] = React.useState({
    username: '',
    password: '',
    display_name: '',
  });
  const updateFormCallback = React.useCallback(e => {
    e.persist();
    updateForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }, [form]);

  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage form={form} updateFormCallback={updateFormCallback} />
      </Route>
      <Route exact path="/signup">
        <SignupPage form={form} updateFormCallback={updateFormCallback} />
      </Route>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}
