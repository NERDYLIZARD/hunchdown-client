/**
 * Created on 11-Apr-18.
 */
import CardApi from "./mockCardApi";
import MOCK_CARDS from './mockCards';

describe('mock card api', () => {

  let cards = [];

  // re-declare cards every time before running a test
  beforeEach(() => {
    cards = Object.assign([], MOCK_CARDS);
  });

  describe('getAllCards()', () => {
    it('should return all cards', () => {
      return expect(CardApi.getAllCards()).resolves.toEqual(cards);
    });
  });

  describe('getCard(id)', () => {
    it('should return a card of passing id', () => {
      const card = cards[0];
      return expect(CardApi.getCard(card.id)).resolves.toEqual(card);
    });
  });

  describe('saveCard()', () => {
    it('should return saved card with id as wisdom space to - e.g "a b" to "a-b"', () => {
      const newCard = {
        wisdom: 'abc Xyz.',
        attribute: 'def',
      };
      const expectedSavedCard = {
        id: 'abc-Xyz.',
        wisdom: 'abc Xyz.',
        attribute: 'def',
      };
      return expect(CardApi.saveCard(newCard, cards)).resolves.toEqual(expectedSavedCard);
    });

    it('should reject a card containing no wisdom', () => {
      const newCard = {
        wisdom: '',
        attribute: 'def',
      };
      return expect(CardApi.saveCard(newCard)).rejects.toBeDefined();
    });

  });

  describe('deleteCard()', () => {
    it('should delete card with specified id', () => {
      const id = cards[0].id;
      const cardsAfterDeletion = [ cards[1], cards[2] ];

      return CardApi.deleteCard(id, cards)
        .then(() => {
          expect(cards).toEqual(cardsAfterDeletion);
        });
    });
    it('should return nothing', () => {
      const id = cards[0].id;
      return expect(CardApi.deleteCard(id, cards)).resolves.toBeUndefined();
    });
  });


});
