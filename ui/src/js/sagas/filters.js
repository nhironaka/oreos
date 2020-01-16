import { takeLatest, call, put } from 'redux-saga/effects';

import ActionTypes from '../constants/filters';
import apiRequest from '../services/apiRequest';
import { setError } from '../reducers/errors';
import { fetchFilterSuccess } from '../actions/filters';

function* fetchFilter({ filterType }) {
    try {
        const filters = yield call(apiRequest.GET, `/filter/${filterType}`);
        console.log(filters);
        yield put(fetchFilterSuccess(filterType, filters));
    } catch (error) {
        yield put(setError(error, 'filters'));
    }
}

export default function* initWatching() {
    yield takeLatest(ActionTypes.FETCH_FILTER, fetchFilter);
}
