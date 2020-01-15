import ActionTypes from '../constants/filters';

export function fetchFilter(filterType) {
    return {
        type: ActionTypes.FETCH_FILTER,
        filterType,
    };
}

export function fetchFilterSuccess(filterType, filters) {
    return {
        type: ActionTypes.FETCH_FILTER_SUCCESS,
        filterType,
        filters
    };
}