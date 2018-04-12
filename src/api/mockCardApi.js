import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
export const cards = [
  {
    id: 'Dead-people-receive-more-flowers-than-the-living-because-regret-is-stronger-than-gratitude',
    wisdom: 'Dead people receive more flowers than the living because regret is stronger than gratitude',
    attribute: 'Anne Frank'
  },
  {
    id: 'You-may-delay-but-time-will-not',
    wisdom: 'You may delay, but time will not',
    attribute: 'Benjamin Franklin'
  },
  {
    id: 'The-cave-you-fear-to-enter-holds-the-treasure-you-seek',
    wisdom: 'The cave you fear to enter holds the treasure you seek.',
    attribute: 'Joseph Campbel'
  },
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (card) => {
  return replaceAll(card.wisdom, ' ', '-');
};


class CardApi {
  static getAllCards() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], cards));
      }, delay);
    });
  }

  static saveCard(card) {
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

}

export default CardApi;
