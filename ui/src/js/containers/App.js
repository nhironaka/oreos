import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import configureStore from '../redux/store';
import theme from '../constants/theme';
import Main from './Main';

export default function App() {
  const store = configureStore();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/">
          <Main />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
