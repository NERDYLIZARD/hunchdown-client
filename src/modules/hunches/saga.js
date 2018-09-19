/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from './actionTypes';
import { put, select, takeEvery } from 'redux-saga/effects';
import { fetchHunches } from './actions';
import { getPagination } from './selectors';


/**
 * Watchers
 */
export const hunchSagaWatchers = [
  takeEvery(types.LOAD_HUNCHES, loadHunches),
];

/*
call `fetchBox()` if it's the first time call
or when it's specifically told to fetch the next page
*/
export function* loadHunches (action) {
  const {
    boxId,
    nextPageIsRequested,
    perPage
  } = action;
  const {
    nextPageUrl = `/boxes/${boxId}/hunches?page=1&perPage=${perPage}`,
    pageCount = 0,
    isFetching
  } = yield select(getPagination);

  if (isFetching) {
    return null;
  }
  if (pageCount > 0 && !nextPageIsRequested) {
    return null;
  }
  yield put(fetchHunches(nextPageUrl));
}
