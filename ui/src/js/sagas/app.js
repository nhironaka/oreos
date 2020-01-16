import { takeLeading } from 'redux-saga/effects';

import ActionTypes from '../constants/app';
import apiRequest from '../services/apiRequest';
import { setError } from '../reducers/errors';

function* init() {}

export default function* initWatching() {
  yield takeLeading(ActionTypes.INIT, init);
}
