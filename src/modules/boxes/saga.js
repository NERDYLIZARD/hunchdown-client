/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from './actionTypes';
import { normalize } from 'normalizr';
import Services from './services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchBoxesSuccess, createBoxSuccess, deleteBoxSuccess } from './actions';
import { boxesSchema } from '../../normalizr-schema';


/**
 * Watchers
 */
export const boxSagaWatchers = [
  takeEvery(types.LOAD_BOXES, loadBoxes),
  takeEvery(types.FETCH_BOXES, fetchBoxes),
  takeEvery(types.CREATE_BOX, createBox),
  takeEvery(types.DELETE_BOX, deleteBox),
];

/**
 * Generators
 */
export function* loadBoxes () {
  yield put({type: types.FETCH_BOXES});
}

export function* fetchBoxes () {
  try {
    // yield put(fetchBoxesRequested());
    const data = yield call(Services.find);
    const {entities, result} = normalize(data, boxesSchema);
    yield put(fetchBoxesSuccess(entities, result));
  } catch (error) {
    throw error;
    // yield put(fetchBoxesFailed());
  }
}

export function* createBox (action) {
  try {
    const data = yield call(Services.create, action.box);
    yield put(createBoxSuccess(data));
  } catch (error) {
    throw error;
  }
}

export function* deleteBox (action) {
  try {
    yield call(Services.delete, action.box);
    yield put(deleteBoxSuccess(action.box));
  } catch (error) {
    throw error;
  }
}
