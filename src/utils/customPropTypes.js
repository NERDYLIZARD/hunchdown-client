/**
 * Created on 28-Mar-18.
 */

import PropTypes from 'prop-types';


export default {
  hunch: PropTypes.shape({
    slug: PropTypes.string,
    wisdom: PropTypes.string,
    attribute: PropTypes.string,
  }),
// TODO: the normalized hunch
  // normalizedCard : PropTypes.shape({
  //   slug: PropTypes.objectOf(hunch),
  // }),
  box: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  })
};
