/**
 * Created on 28-Mar-18.
 */

import PropTypes from 'prop-types';

export default {
  card : PropTypes.shape({
    id: PropTypes.string,
    wisdom: PropTypes.string,
    attribute: PropTypes.string,
  }),
};
