/**
 * Created on 06-Apr-18.
 */

import _ from 'lodash';
import * as cardActions from './cardActions';
import * as actionTypes from '../../constants/actionTypes';
import mockDataFactory from '../../utils/test/mockDataFactory';


describe('Card Actions', () => {

  /**
   * Load Cards
   */
  describe('loadCards', () => {
    it('should creates an action typed LOAD_CARDS with no payload', () => {
      const expectedAction = {
        type: actionTypes.LOAD_CARDS,
      };
      expect(cardActions.loadCards()).toEqual(expectedAction);
    });
  });
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


  /**
   * Load Card
   */
  describe('loadCard', () => {
    it('should creates an action typed LOAD_CARD with no payload', () => {
      const expectedAction = {
        type: actionTypes.LOAD_CARD,
      };
      expect(cardActions.loadCard()).toEqual(expectedAction);
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


  /**
   * Create Card
   */
  describe('createCard', () => {
    it('should creates an action typed  CREATE_CARD with card as a payload', () => {
      const card = _.omit(mockDataFactory.createCard(), 'slug');
      const expectedAction = {
        type: actionTypes.CREATE_CARD,
        card
      };
      expect(cardActions.createCard(card)).toEqual(expectedAction);
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


  /**
   * Update Card
   */
  describe('updateCard', () => {
    it('should creates an action typed UPDATE_CARD with card as a payload', () => {
      const card = mockDataFactory.createCard();
      const expectedAction = {
        type: actionTypes.UPDATE_CARD,
        card
      };
      expect(cardActions.updateCard(card)).toEqual(expectedAction);
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

  /**
   * Delete Card
   */
  describe('deleteCard', () => {
    it('should creates an action typed DELETE_CARD with card as a payload', () => {
      const card = mockDataFactory.createCard();
      const expectedAction = {
        type: actionTypes.DELETE_CARD,
        card
      };
      expect(cardActions.deleteCard(card)).toEqual(expectedAction);
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

});
