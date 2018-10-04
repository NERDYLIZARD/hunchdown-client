/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from '../actions/types/boxes';
import { put, select, takeEvery } from 'redux-saga/effects';
import { fetchBoxes, fetchBox } from '../actions/boxes';
import { getActive, getEntity, getPagination } from '../selectors/boxes';


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
  const {
    nextPageIsRequested,
    perPage
  } = action;
  const {
    nextPageUrl = `/boxes?page=1&perPage=${perPage}`,
    pageCount = 0,
    isFetching
  } = yield select(getPagination);

  if (isFetching) {
    return null;
  }
  if (pageCount > 0 && !nextPageIsRequested) {
    return null;
  }
  yield put(fetchBoxes(nextPageUrl));
}


/*
* call `fetchBox` if there is no entity in cache(entities)
* or that entity doesn't contain the required fields.
* */
export function* loadBox (action) {

  const {isFetching} = yield select(getActive);
  if (isFetching) {
    return null;
  }

  const {id, requiredFields = []} = action;
  const boxEntities = yield select(getEntity);
  const box = boxEntities[id];

  if (box && requiredFields.every(key => box.hasOwnProperty(key))) {
    return null;
  }
  yield put(fetchBox(id));
}
