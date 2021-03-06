import get from 'lodash/get';
import { createSelector } from 'reselect';

export const selectedAuth = state => state.auth;

export const selectUser = createSelector(selectedAuth, state => get(state, 'user'));

export const selectLoading = createSelector(selectedAuth, state => get(state, 'loading'));
