/**
 * Created on 06-Apr-18.
 */

import _ from 'lodash';
import * as cardActions from './cardActions';
import * as actionTypes from '../../constants/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import initialState from "../../constants/initialState";
import mockDataFactory from '../../utils/test/mockDataFactory';



describe('Card Actions', () => {

  describe('loadCardsSuccess', () => {
    it('should creates an action typed LOAD_CARDS_SUCCESS and having cards[] as a payload', () => {
      const cards = [
        mockDataFactory.createCard(),
        mockDataFactory.createCard()
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
      const card = mockDataFactory.createCard();
      const expectedAction = {
        type: actionTypes.LOAD_CARD_SUCCESS,
        payload: {
          card
        }
      };
      expect(cardActions.loadCardSuccess(card)).toEqual(expectedAction);
    });
  });
  describe('loadCardSuccess', () => {
    it('should creates an action typed LOAD_CARD_SUCCESS and having card as a payload', () => {
      const card = mockDataFactory.createCard();
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
      const card = _.omit(mockDataFactory.createCard(), 'slug');
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
      const card = mockDataFactory.createCard();
      const expectedAction = {
        type: actionTypes.UPDATE_CARD_SUCCESS,
        payload: {
          card
        }
      };
      expect(cardActions.updateCardSuccess(card)).toEqual(expectedAction);
    });
  });

  describe('deleteCardSuccess', () => {
    it('should creates an action typed DELETE_CARD_SUCCESS and having card as a payload', () => {
      const card = mockDataFactory.createCard();
      const expectedAction = {
        type: actionTypes.DELETE_CARD_SUCCESS,
        payload: {
          card
        }
      };
      expect(cardActions.deleteCardSuccess(card)).toEqual(expectedAction);
    });
  });


  /**********
   *  async
   **********/

  // const middleware = [thunk];
  // const mockStore = configureMockStore(middleware);
  //
  // describe('loadCards', () => {
  //   it('should dispatch action type LOAD_CARDS_SUCCESS after resolving a promise', done => {
  //     const expectedActions = [{
  //       type: actionTypes.LOAD_CARDS_SUCCESS,
  //     }];
  //     const store = mockStore(initialState, expectedActions, done);
  //
  //     store.dispatch(cardActions.loadCards())
  //       .then(() => {
  //         const actions = store.getActions();
  //         expect(actions.length).toEqual(expectedActions.length);
  //         expect(actions[0].type).toEqual(expectedActions[0].type);
  //         done();
  //       });
  //   });
  // });
  //
  // describe('loadCard', () => {
  //   it('should dispatch action type LOAD_CARD_SUCCESS after resolving a promise', done => {
  //     const expectedActions = [{
  //       type: actionTypes.LOAD_CARD_SUCCESS,
  //     }];
  //     const store = mockStore(initialState, expectedActions, done);
  //
  //     store.dispatch(cardActions.loadCard('130b700d-5ecc-4a33-9cce-c386e557b096'))
  //       .then(() => {
  //         const actions = store.getActions();
  //         expect(actions.length).toEqual(expectedActions.length);
  //         expect(actions[0].type).toEqual(expectedActions[0].type);
  //         done();
  //       });
  //   });
  // });
  //
  // describe('createCard', () => {
  //   it('should dispatch action type CREATE_CARD_SUCCESS after resolving a promise if it is CREATE operation', done => {
  //     const expectedActions = [{
  //       type: actionTypes.CREATE_CARD_SUCCESS,
  //     }];
  //     const store = mockStore(initialState, expectedActions, done);
  //
  //     const card = mockDataFactory.omitIdentifier(mockDataFactory.createCard(), 'slug');
  //
  //     store.dispatch(cardActions.createCard(card))
  //       .then(() => {
  //         const actions = store.getActions();
  //         expect(actions.length).toEqual(expectedActions.length);
  //         expect(actions[0].type).toEqual(expectedActions[0].type);
  //         done();
  //       });
  //   });
  // });
  //
  // describe('updateCard', () => {
  //
  //   it('should dispatch action type UPDATE_CARD_SUCCESS after resolving a promise if it is UPDATE operation', done => {
  //     const expectedActions = [{
  //       type: actionTypes.UPDATE_CARD_SUCCESS,
  //     }];
  //     const store = mockStore(initialState, expectedActions, done);
  //
  //     const card = mockDataFactory.createCard();
  //     store.dispatch(cardActions.updateCard(card))
  //       .then(() => {
  //         const actions = store.getActions();
  //         expect(actions.length).toEqual(expectedActions.length);
  //         expect(actions[0].type).toEqual(expectedActions[0].type);
  //         done();
  //       });
  //   });
  // });
  //
  // describe('deleteCard', () => {
  //   it('should dispatch action type DELETE_CARD_SUCCESS after resolving a promise', done => {
  //     const expectedActions = [{
  //       type: actionTypes.DELETE_CARD_SUCCESS,
  //     }];
  //     const card = mockDataFactory.createCard();
  //
  //     const store = mockStore(initialState, expectedActions, done);
  //
  //     store.dispatch(cardActions.deleteCard(card))
  //       .then(() => {
  //         const actions = store.getActions();
  //         expect(actions.length).toEqual(expectedActions.length);
  //         expect(actions[0].type).toEqual(expectedActions[0].type);
  //         done();
  //       });
  //   });
  // });


});
