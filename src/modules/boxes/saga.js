/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from './actionTypes';
import { put, select, takeEvery } from 'redux-saga/effects';
import { fetchBoxes } from './actions';
import { getPaginationData } from './selectors';


/**
 * Watchers
 */
export const boxSagaWatchers = [
  takeEvery(types.LOAD_BOXES, loadBoxes),
];

/**
 * Generators
 */
// call `fetchBox()` if it's the first time call
// or when it's specifically told to fetch the next page
export function* loadBoxes (action) {
  const {
    nextPageUrl = '/boxes?page=1&perPage=3',
    pageCount = 0,
    isFetching
  } = select(getPaginationData);
  const {requestingNextPage} = action.payload;

  if (pageCount > 0 && !requestingNextPage && !isFetching)
    return null;

  yield put(fetchBoxes(nextPageUrl));
}
