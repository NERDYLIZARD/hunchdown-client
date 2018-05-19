/**
 * Created on 28-Mar-18.
 */

import PropTypes from 'prop-types';


export default {
  card : PropTypes.shape({
    slug: PropTypes.string,
    wisdom: PropTypes.string,
    attribute: PropTypes.string,
  }),
// TODO: the normalized card
  // normalizedCard : PropTypes.shape({
  //   slug: PropTypes.objectOf(card),
  // }),
};
