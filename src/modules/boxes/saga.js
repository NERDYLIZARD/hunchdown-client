/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from './actionTypes';
import Services from './services';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import {
  createBoxFailed,
  createBoxRequested,
  createBoxSucceeded,
  deleteBoxFailed,
  deleteBoxRequested,
  deleteBoxSucceeded,
  fetchBoxes,
} from './actions';
import { getPaginationData } from './selectors';


/**
 * Watchers
 */
export const boxSagaWatchers = [
  takeEvery(types.LOAD_BOXES, loadBoxes),
  takeEvery(types.CREATE_BOX, createBox),
  takeEvery(types.DELETE_BOX, deleteBox),
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


export function* createBox (action) {
  try {
    yield put(createBoxRequested());
    const data = yield call(Services.create, action.payload);
    yield put(createBoxSucceeded(data));
  } catch (error) {
    yield put(createBoxFailed(error));
  }
}

export function* deleteBox (action) {
  try {
    yield put(deleteBoxRequested());
    yield call(Services.delete, action.payload);
    yield put(deleteBoxSucceeded(action.payload));
  } catch (error) {
    yield put(deleteBoxFailed(error));
  }
}
