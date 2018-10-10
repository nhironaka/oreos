import get from 'lodash/get';
import { createSelector } from 'reselect';

export const selectErrors = state => state.errors;

export const selectError = topic =>
  createSelector(
    selectErrors,
    errors => get(errors, `errors.${topic}`),
  );
