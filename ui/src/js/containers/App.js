import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, withStyles } from '@material-ui/styles';

import customPropTypes from 'Services/custom-prop-types';
import configureStore from '../redux/store';
import theme from '../constants/theme';
import Container from './Container';

const styles = () => ({
  root: {
    backgroundColor: theme.palette.grey[50],
  },
});

function App({ classes }) {
  const store = configureStore();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <main className={classes.root}>
            <Switch>
              <Route path="/" render={() => <Container />} />
            </Switch>
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

App.propTypes = {
  classes: customPropTypes.classes.isRequired,
};

export default withStyles(styles)(App);
