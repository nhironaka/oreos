import get from 'lodash/get';
import { createSelector } from 'reselect';

export const selectedProblems = state => state.problems;

export const selectProblems = createSelector(selectedProblems, state => get(state, 'problems'));

export const selectFetchingProblems = createSelector(selectedProblems, state => get(state, 'fetchingProblems'));

export const selectSelectedProblem = createSelector(selectedProblems, state => get(state, 'selectedProblem'));
