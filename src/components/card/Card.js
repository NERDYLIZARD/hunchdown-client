/**
 * Created on 11-Apr-18.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ card }) => {
  return (
    <div>
      <p key={card.id}><i>{card.wisdom}</i> - {card.attribute}</p>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Card;
