/**
 * Created on 11-Apr-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../constants/customPropTypes';

const Card = ({ card }) => {
  return (
    <div>
      <p key={card.id}><i>{card.wisdom}</i> - {card.attribute}</p>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.objectOf(CustomPropTypes.card).isRequired,
};

export default Card;
