/**
 * Created on 06-Apr-18.
 */

import _ from 'lodash';
import * as cardActions from './actions';
import * as types from './actionTypes';
import mockDataFactory from '../../utils/test/mockDataFactory';


describe('Card Actions', () => {

  /**
   * Load Cards
   */
  describe('loadCards', () => {
    it(`should creates an action typed ${types.LOAD_CARDS} with no payload`, () => {
      const expectedAction = {
        type: types.LOAD_CARDS,
      };
      expect(cardActions.loadCards()).toEqual(expectedAction);
    });
  });
  describe('loadCardsSuccess', () => {
    it(`should creates an action typed ${types.LOAD_CARDS_SUCCESS} and having cards[] as a payload`, () => {
      const cards = [
        mockDataFactory.createCard(),
        mockDataFactory.createCard()
      ];
      const expectedAction = {
        type: types.LOAD_CARDS_SUCCESS,
        cards
      };
      expect(cardActions.loadCardsSuccess(cards)).toEqual(expectedAction);
    });
  });


  /**
   * Load Card
   */
  describe('loadCard', () => {
    it(`should creates an action typed ${types.LOAD_CARD} with no payload`, () => {
      const expectedAction = {
        type: types.LOAD_CARD,
      };
      expect(cardActions.loadCard()).toEqual(expectedAction);
    });
  });
  describe('loadCardSuccess', () => {
    it(`should creates an action typed ${types.LOAD_CARD_SUCCESS} and having card as a payload`, () => {
      const card = mockDataFactory.createCard();
      const expectedAction = {
        type: types.LOAD_CARD_SUCCESS,
        card
      };
      expect(cardActions.loadCardSuccess(card)).toEqual(expectedAction);
    });
  });


  /**
   * Create Card
   */
  describe('createCard', () => {
    it(`should creates an action typed ${types.CREATE_CARD} with card as a payload`, () => {
      const card = _.omit(mockDataFactory.createCard(), 'slug');
      const expectedAction = {
        type: types.CREATE_CARD,
        card
      };
      expect(cardActions.createCard(card)).toEqual(expectedAction);
    });
  });
  describe('createCardSuccess', () => {
    it(`should creates an action typed ${types.CREATE_CARD_SUCCESS} and having card as a payload`, () => {
      const card = _.omit(mockDataFactory.createCard(), 'slug');
      const expectedAction = {
        type: types.CREATE_CARD_SUCCESS,
        card
      };
      expect(cardActions.createCardSuccess(card)).toEqual(expectedAction);
    });
  });


  /**
   * Update Card
   */
  describe('updateCard', () => {
    it(`should creates an action typed ${types.UPDATE_CARD} with card as a payload`, () => {
      const card = mockDataFactory.createCard();
      const expectedAction = {
        type: types.UPDATE_CARD,
        card
      };
      expect(cardActions.updateCard(card)).toEqual(expectedAction);
    });
  });
  describe('updateCardSuccess', () => {
    it(`should creates an action typed ${types.UPDATE_CARD_SUCCESS} and having card as a payload`, () => {
      const card = mockDataFactory.createCard();
      const expectedAction = {
        type: types.UPDATE_CARD_SUCCESS,
        card
      };
      expect(cardActions.updateCardSuccess(card)).toEqual(expectedAction);
    });
  });

  /**
   * Delete Card
   */
  describe('deleteCard', () => {
    it(`should creates an action typed ${types.DELETE_CARD} with card as a payload`, () => {
      const card = mockDataFactory.createCard();
      const expectedAction = {
        type: types.DELETE_CARD,
        card
      };
      expect(cardActions.deleteCard(card)).toEqual(expectedAction);
    });
  });
  describe('deleteCardSuccess', () => {
    it(`should creates an action typed ${types.DELETE_CARD_SUCCESS} and having card as a payload`, () => {
      const card = mockDataFactory.createCard();
      const expectedAction = {
        type: types.DELETE_CARD_SUCCESS,
        card
      };
      expect(cardActions.deleteCardSuccess(card)).toEqual(expectedAction);
    });
  });

});
