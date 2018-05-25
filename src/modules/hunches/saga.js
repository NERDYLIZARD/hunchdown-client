/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from './actionTypes';
import Services from './services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createHunchSuccess, deleteHunchSuccess, loadHunchesSuccess, loadHunchSuccess, updateHunchSuccess } from './actions';


/**
 * Watchers
 */
export const hunchSagaWatchers = [
  takeEvery(types.LOAD_HUNCHES, loadHunches),
  takeEvery(types.LOAD_HUNCH, loadHunch),
  takeEvery(types.CREATE_HUNCH, createHunch),
  takeEvery(types.UPDATE_HUNCH, updateHunch),
  takeEvery(types.DELETE_HUNCH, deleteHunch),
];

/**
 * Generators
 */
export function* loadHunches() {
  try {
    // yield put(loadHunchesRequested());
    const data = yield call(Services.find);
    yield put(loadHunchesSuccess(data));
  } catch (error) {
    throw error;
    // yield put(loadHunchesFailed());
  }
}

export function* loadHunch(action) {
  try {
    const data = yield call(Services.get, action.id);
    yield put(loadHunchSuccess(data));
  } catch (error) {
    throw error;
  }
}

export function* createHunch(action) {
  try {
    const data = yield call(Services.create, action.hunch);
    yield put(createHunchSuccess(data));
  } catch (error) {
    throw error;
  }
}

export function* updateHunch(action) {
  try {
    const data = yield call(Services.update, action.hunch);
    yield put(updateHunchSuccess(data));
  } catch (error) {
    throw error;
  }
}

export function* deleteHunch(action) {
  try {
    yield call(Services.delete, action.hunch);
    yield put(deleteHunchSuccess(action.hunch));
  } catch (error) {
    throw error;
  }
}
