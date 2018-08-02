/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from './actionTypes';
import Services from './services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loadBoxesSuccess, createBoxSuccess, deleteBoxSuccess } from './actions';


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
export function* loadBoxes() {
  try {
    // yield put(loadBoxesRequested());
    const data = yield call(Services.find);
    yield put(loadBoxesSuccess(data));
  } catch (error) {
    throw error;
    // yield put(loadBoxesFailed());
  }
}

export function* createBox(action) {
  try {
    const data = yield call(Services.create, action.box);
    yield put(createBoxSuccess(data));
  } catch (error) {
    throw error;
  }
}

export function* deleteBox(action) {
  try {
    yield call(Services.delete, action.box);
    yield put(deleteBoxSuccess(action.box));
  } catch (error) {
    throw error;
  }
}
