import { combineReducers } from 'redux';

import problems from './problems';
import errors from './errors';

export default () =>
  combineReducers({
    problems,
    errors,
  });
