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

  describe('loadAllCards()', () => {
    it('should return all cards', () => {
      return expect(CardApi.getAllCards()).resolves.toEqual(cards);
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

});
