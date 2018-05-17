/**
 * Created on 14-May-18.
 */
import 'regenerator-runtime/runtime';
import * as types from '../../constants/actionTypes';
import CardService from '../../services/CardService';
import { takeEvery, call, put } from 'redux-saga/effects';
import {
  createCardSuccess,
  deleteCardSuccess,
  loadCardsSuccess,
  loadCardSuccess,
  updateCardSuccess
} from './cardActions';
import { push } from 'react-router-redux';


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
    const data = yield call(CardService.find);
    yield put(loadCardsSuccess(data));
  } catch (error) {
    throw error;
    // yield put(loadCardsFailed());
  }
}

export function* loadCard(action) {
  try {
    const data = yield call(CardService.get, action.slug);
    yield put(loadCardSuccess(data));
  } catch (error) {
    throw error;
  }
}

export function* createCard(action) {
  try {
    const data = yield call(CardService.create, action.card);
    yield put(createCardSuccess(data));
    yield put(push('/cards'));
  } catch (error) {
    throw error;
  }
}

export function* updateCard(action) {
  try {
    const data = yield call(CardService.update, action.card);
    yield put(updateCardSuccess(data));
  } catch (error) {
    throw error;
  }
}

export function* deleteCard(action) {
  try {
    yield call(CardService.delete, action.card);
    yield put(deleteCardSuccess(action.card));
  } catch (error) {
    throw error;
  }
}
