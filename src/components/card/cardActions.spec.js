/**
 * Created on 06-Apr-18.
 */

import * as cardActions from './cardActions';
import * as actionTypes from '../../constants/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import initialState from "../../constants/initialState";

describe('Card Actions', () => {

  describe('loadCardsSuccess', () => {
    it('should creates an action typed LOAD_CARDS_SUCCESS and having cards[] as a payload', () => {
      const cards = [
        {
          id: 'abc',
          wisdom: 'abc',
          attribute: '123'
        },
        {
          id: 'def',
          wisdom: 'def',
          attribute: '456'
        }
      ];
      const expectedAction = {
        type: actionTypes.LOAD_CARDS_SUCCESS,
        payload: {
          cards
        }
      };
      expect(cardActions.loadCardsSuccess(cards)).toEqual(expectedAction);
    });
  });

  describe('loadCardSuccess', () => {
    it('should creates an action typed LOAD_CARD_SUCCESS and having card as a payload', () => {
      const card = {
        id: 'abc',
        wisdom: 'abc',
        attribute: '123'
      };
      const expectedAction = {
        type: actionTypes.LOAD_CARD_SUCCESS,
        payload: {
          card
        }
      };
      expect(cardActions.loadCardSuccess(card)).toEqual(expectedAction);
    });
  });

  describe('createCardSuccess', () => {
    it('should creates an action typed CREATE_CARD_SUCCESS and having card as a payload', () => {
      const card = {
        wisdom: 'abc',
        attribute: 'def'
      };
      const expectedAction = {
        type: actionTypes.CREATE_CARD_SUCCESS,
        payload: {
          card
        }
      };
      expect(cardActions.createCardSuccess(card)).toEqual(expectedAction);
    });
  });

  describe('updateCardSuccess', () => {
    it('should creates an action typed UPDATE_CARD_SUCCESS and having card as a payload', () => {
      const card = {
        id: 'abc',
        wisdom: 'abc',
        attribute: 'def'
      };
      const expectedAction = {
        type: actionTypes.UPDATE_CARD_SUCCESS,
        payload: {
          card
        }
      };
      expect(cardActions.updateCardSuccess(card)).toEqual(expectedAction);
    });
  });



  /**********
   *  async
   **********/

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  describe('loadCards', () => {
    it('should dispatch action type LOAD_CARDS_SUCCESS after resolving a promise', done => {
      const expectedActions = [{
        type: actionTypes.LOAD_CARDS_SUCCESS,
      }];
      const store = mockStore(initialState, expectedActions, done);

      store.dispatch(cardActions.loadCards())
        .then(() => {
          const actions = store.getActions();
          expect(actions.length).toEqual(expectedActions.length);
          expect(actions[0].type).toEqual(expectedActions[0].type);
          done();
        });
    });
  });

  describe('loadCard', () => {
    it('should dispatch action type LOAD_CARD_SUCCESS after resolving a promise', done => {
      const expectedActions = [{
        type: actionTypes.LOAD_CARD_SUCCESS,
      }];
      const store = mockStore(initialState, expectedActions, done);

      store.dispatch(cardActions.loadCard('id'))
        .then(() => {
          const actions = store.getActions();
          expect(actions.length).toEqual(expectedActions.length);
          expect(actions[0].type).toEqual(expectedActions[0].type);
          done();
        });
    });
  });

  describe('saveCard', () => {
    it('should dispatch action type CREATE_CARD_SUCCESS after resolving a promise if it is CREATE operation', done => {
      const expectedActions = [{
        type: actionTypes.CREATE_CARD_SUCCESS,
      }];
      const store = mockStore(initialState, expectedActions, done);

      const card = {
        wisdom: 'abc',
        attribute: 'def'
      };
      store.dispatch(cardActions.saveCard(card))
        .then(() => {
          const actions = store.getActions();
          expect(actions.length).toEqual(expectedActions.length);
          expect(actions[0].type).toEqual(expectedActions[0].type);
          done();
        });
    });

    it('should dispatch action type UPDATE_CARD_SUCCESS after resolving a promise if it is UPDATE operation', done => {
      const expectedActions = [{
        type: actionTypes.UPDATE_CARD_SUCCESS,
      }];
      const store = mockStore(initialState, expectedActions, done);

      const card = {
        id: 'abc',
        wisdom: 'abc',
        attribute: 'def'
      };
      store.dispatch(cardActions.saveCard(card))
        .then(() => {
          const actions = store.getActions();
          expect(actions.length).toEqual(expectedActions.length);
          expect(actions[0].type).toEqual(expectedActions[0].type);
          done();
        });
    });
  });

});
