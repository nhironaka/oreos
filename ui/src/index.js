import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './js/containers/App';
import './index.css';

ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById('app')
);
