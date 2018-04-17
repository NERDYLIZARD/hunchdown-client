import delay from './delay';
import MOCK_CARDS from './mockCards';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const _cards = Object.assign([], MOCK_CARDS);

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (card) => {
  return replaceAll(card.wisdom, ' ', '-');
};


// Every mockApi function has optional parameter: cards[]
  // if the function is called by action, cards[] is mutable.
  // if the function is called by spec, cards[] is immutable.
    // e.g. if cards begins with 3 elements in array, it will remain 3 elements regardless the number of operations performed on.
class CardApi {
  static getAllCards(cards = _cards) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], cards));
      }, delay);
    });
  }

  static getCard(id, cards = _cards) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, (cards.filter(card => card.id == id))[0]));
      }, delay);
    });
  }

  static saveCard(card, cards = _cards) {
    card = Object.assign({}, card); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCardWisdomLength = 1;
        if (card.wisdom.length < minCardWisdomLength) {
          return reject(`Wisdom must be at least ${minCardWisdomLength} characters.`);
        }

        if (card.id) {
          const existingCardIndex = cards.findIndex(a => a.id == card.id);
          cards.splice(existingCardIndex, 1, card);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new cards in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          card.id = generateId(card);
          cards.push(card);
        }

        resolve(card);
      }, delay);
    });
  }

  static deleteCard(cardId, cards = _cards) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfCardToDelete = cards.findIndex(card => card.id == cardId);
        cards.splice(indexOfCardToDelete, 1);
        resolve();
      }, delay);
    });
  }

}

export default CardApi;
