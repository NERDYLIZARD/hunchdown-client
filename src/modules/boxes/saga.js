/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from './actionTypes';
import { put, select, takeEvery } from 'redux-saga/effects';
import { fetchBoxes, fetchBox } from './actions';
import { getActive, getEntity, getPagination } from './selectors';


/**
 * Watchers
 */
export const boxSagaWatchers = [
  takeEvery(types.LOAD_BOXES, loadBoxes),
  takeEvery(types.LOAD_BOX, loadBox),
];

/*
call `fetchBox()` if it's the first time call
or when it's specifically told to fetch the next page.
*/
export function* loadBoxes (action) {
  const {nextPageIsRequested} = action;
  const {
    nextPageUrl = '/boxes?page=1&perPage=3',
    pageCount = 0,
    isFetching
  } = yield select(getPagination);

  if ((pageCount > 0 && !nextPageIsRequested) || isFetching) {
    return null;
  }
  yield put(fetchBoxes(nextPageUrl));
}


/*
* call `fetchBox` if there is no entity in cache(entities)
* or that entity doesn't contain the required fields.
* */
export function* loadBox (action) {
  const {id, requiredFields = []} = action;
  const {isFetching} = yield select(getActive);
  const boxEntities = yield select(getEntity);
  const box = boxEntities[id];

  if ((box && requiredFields.every(key => box.hasOwnProperty(key))) || isFetching) {
    return null
  }
  yield put(fetchBox(id));
}
