/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from './actionTypes';
import Services from './services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loadBoxesSuccess } from './actions';


/**
 * Watchers
 */
export const boxSagaWatchers = [
  takeEvery(types.LOAD_BOXES, loadBoxes),
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
