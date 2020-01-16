/* eslint-disable*/
import apiRequest from '../services/apiRequest';
import { setError } from './errors';

/**
 * Initial State
 */
const initialState = {
  errors: {},
};

export function fetchItems() {
  return async dispatch => {
    try {
      const items = await apiRequest.GET(`https://api.lever.co/v1/tags`);
      return items;
    } catch (e) {
      console.trace(e);
      dispatch(setError(e));
    }
  }

}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
