/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from './actionTypes';
import { put, select, takeEvery } from 'redux-saga/effects';
import { fetchHunches } from './actions';
import { getPaginationData } from './selectors';


/**
 * Watchers
 */
export const hunchSagaWatchers = [
  takeEvery(types.LOAD_HUNCHES, loadHunches),
];

/**
 * Generators
 */
// call `fetchBox()` if it's the first time call
// or when it's specifically told to fetch the next page
export function* loadHunches (action) {
  const {
    nextPageUrl = '/hunches?page=1&perPage=3',
    pageCount = 0,
    isFetching
  } = select(getPaginationData);
  const {nextPageIsRequested} = action;

  if (pageCount > 0 && !nextPageIsRequested && !isFetching)
    return null;

  yield put(fetchHunches(nextPageUrl));
}
