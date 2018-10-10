import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import configureStore from '../redux/store';
import theme from '../constants/theme';
import Problems from './Problems';

export default function App() {
  const store = configureStore();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" render={() => <Problems />} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
