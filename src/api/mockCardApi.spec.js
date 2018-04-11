/**
 * Created on 11-Apr-18.
 */
import CardApi, { cards as _cards } from "./mockCardApi";

describe('mock card api', () => {

  describe('loadAllCards()', () => {
    it('should return all cards', () => {
      const cards = Object.assign([], _cards); // to avoid manipulating object passed in.

      return CardApi.getAllCards()
        .then(response => {
          expect(response).toEqual(cards);
        })
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
      return CardApi.saveCard(newCard)
        .then(response => {
          expect(response).toEqual(expectedSavedCard);
        })
    });

    it('should reject a card containing no wisdom', () => {
      const newCard = {
        wisdom: '',
        attribute: 'def',
      };
      return CardApi.saveCard(newCard)
        .catch(error => {
          expect(error).toBeDefined();
        })
    });

  });

});
