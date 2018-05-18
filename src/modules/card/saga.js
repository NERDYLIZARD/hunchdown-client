/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from './actionTypes';
import Services from './services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createCardSuccess, deleteCardSuccess, loadCardsSuccess, loadCardSuccess, updateCardSuccess } from './actions';


/**
 * Watchers
 */
export const cardSagaWatchers = [
  takeEvery(types.LOAD_CARDS, loadCards),
  takeEvery(types.LOAD_CARD, loadCard),
  takeEvery(types.CREATE_CARD, createCard),
  takeEvery(types.UPDATE_CARD, updateCard),
  takeEvery(types.DELETE_CARD, deleteCard),
];

/**
 * Generators
 */
export function* loadCards() {
  try {
    // yield put(loadCardsRequested());
    const data = yield call(Services.find);
    yield put(loadCardsSuccess(data));
  } catch (error) {
    throw error;
    // yield put(loadCardsFailed());
  }
}

export function* loadCard(action) {
  try {
    const data = yield call(Services.get, action.slug);
    yield put(loadCardSuccess(data));
  } catch (error) {
    throw error;
  }
}

export function* createCard(action) {
  try {
    const data = yield call(Services.create, action.card);
    yield put(createCardSuccess(data));
  } catch (error) {
    throw error;
  }
}

export function* updateCard(action) {
  try {
    const data = yield call(Services.update, action.card);
    yield put(updateCardSuccess(data));
  } catch (error) {
    throw error;
  }
}

export function* deleteCard(action) {
  try {
    yield call(Services.delete, action.card);
    yield put(deleteCardSuccess(action.card));
  } catch (error) {
    throw error;
  }
}
