/**
 * Created on 06-Apr-18.
 */

import * as cardActions from './cardActions';
import * as actionTypes from '../../constants/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import initialState from "../../constants/initialState";

describe('Card Actions', () => {

  describe('loadCardSuccess', () => {
    it('should creates an action typed LOAD_CARDS_SUCCESS and having cards[] as a payload', () => {
      const cards = [
        {
          wisdom: 'abc',
          attribute: '123'
        },
        {
          wisdom: 'def',
          attribute: '456'
        }
      ];
      const expectedAction = {
        type: actionTypes.LOAD_CARDS_SUCCESS,
        cards
      };
      expect(cardActions.loadCardsSuccess(cards)).toEqual(expectedAction);
    });
  });


  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  describe('loadCard', () => {
    it('should dispatch action type LOAD_CARDS_SUCCESS after resolving a promise and the promise has array as its resolve', done => {
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


});
