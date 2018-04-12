/**
 * Created on 11-Apr-18.
 */
import React from 'react';
import CustomPropTypes from '../../constants/customPropTypes';

const Card = ({ card }) => {
  return (
      <p><i>{card.wisdom}</i> - {card.attribute}</p>
  );
};

Card.propTypes = {
  card: CustomPropTypes.card.isRequired,
};

export default Card;
