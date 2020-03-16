import React from 'react';
import { Switch, Route } from 'react-router';

import LoginPage from './loginPage';

export default function Auth() {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/sign-up">
        <LoginPage />
      </Route>
    </Switch>
  );
}
