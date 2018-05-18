/**
 * Created on 14-May-18.
 */
import _ from 'lodash';
import faker from 'faker';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import Services from './services';
import mockDataFactory from '../../utils/test/mockDataFactory';
import { createCard, deleteCard, loadCard, loadCards, updateCard } from './saga';
import { createCardSuccess, deleteCardSuccess, loadCardsSuccess, loadCardSuccess, updateCardSuccess } from './actions';


describe('Card Sagas', () => {

  /**
   * Load Cards
   */
  describe('loadCards', () => {
    const generator = cloneableGenerator(loadCards)();

    it('should call api to fetch cards', () => {
      expect(generator.next().value).toEqual(call(Services.find));
    });

    it('should dispatch loadCardsSuccess() with the fetched cards as its argument', () => {
      const clone = generator.clone();
      const cards = [mockDataFactory.createCard(), mockDataFactory.createCard()];
      expect(clone.next(cards).value).toEqual(put(loadCardsSuccess(cards)));
      expect(clone.next().done).toBe(true);
    });
    // it('should call api to fetch cards and dispatch loadCardsSuccess with the fetched cards', () => {
    //   const clone = generator.clone;
    //   const error = { message: 'later' };
    // expect(clone.throw(error).value).toEqual(put(loadCardsFailed(card)));
    // expect(clone.next().done).toBe(true);
    // });
  });


  /**
   * Load Card
   */
  describe('loadCard', () => {
    const action = { slug: 'abc' };
    const generator = cloneableGenerator(loadCard)(action);

    it('should call api to fetch a card by slug', () => {
      expect(generator.next().value).toEqual(call(Services.get, action.slug));
    });
    it('should dispatch loadCardSuccess() with the fetched card as its argument', () => {
      const clone = generator.clone();
      const card = mockDataFactory.createCard();
      expect(clone.next(card).value).toEqual(put(loadCardSuccess(card)));
      expect(clone.next().done).toBe(true);
    });
    // error case (later)
  });


  /**
   * Create Card
   */
  describe('createCard', () => {
    const action = { card: _.omit(mockDataFactory.createCard(), 'slug') };
    const generator = cloneableGenerator(createCard)(action);

    it('should call api to create a card with a card object as its argument', () => {
      expect(generator.next().value).toEqual(call(Services.create, action.card));
    });
    it('should dispatch createCardsSuccess() with the created card as its argument', () => {
      const clone = generator.clone();
      const card = {
        ...action.card,
        slug: faker.random.uuid(),
      };
      expect(clone.next(card).value).toEqual(put(createCardSuccess(card)));
      expect(clone.next().done).toBe(true);
    });
    // error case (later)
  });


  /**
   * Update Card
   */
  describe('updateCard', () => {
    const action = { card: mockDataFactory.createCard() };
    const generator = cloneableGenerator(updateCard)(action);

    it('should call api to update a card with a card object as its argument', () => {
      expect(generator.next().value).toEqual(call(Services.update, action.card));
    });
    it('should dispatch updateCardsSuccess() with the updated card as its argument', () => {
      const clone = generator.clone();
      const card = action.card;
      expect(clone.next(card).value).toEqual(put(updateCardSuccess(card)));
      expect(clone.next().done).toBe(true);
    });
    // error case (later)
  });


  /**
   * Delete Card
   */
  describe('deleteCard', () => {
    const action = { card: mockDataFactory.createCard() };
    const generator = cloneableGenerator(deleteCard)(action);
    it('should call api to delete a card with a card object as its argument', () => {
      expect(generator.next().value).toEqual(call(Services.delete, action.card));
    });
    it('should dispatch deleteCardsSuccess() with the card that has been passed in deleteCard() as it argument', () => {
      const clone = generator.clone();
      expect(clone.next().value).toEqual(put(deleteCardSuccess(action.card)));
      expect(clone.next().done).toBe(true);
    });
    // error case (later)
  });

});
