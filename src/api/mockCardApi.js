import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const cards = [
  {
    wisdom: 'Dead people receive more flowers than the living because regret is stronger than gratitude',
    attribute: 'Anne Frank'
  },
  {
    wisdom: 'You may delay, but time will not',
    attribute: 'Benjamin Franklin'
  },
  {
    wisdom: 'The cave you fear to enter holds the treasure you seek.',
    attribute: 'Joseph Campbel'
  },
];


class CardApi {
  static getAllCards() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], cards));
      }, delay);
    });
  }
}

export default CardApi;
