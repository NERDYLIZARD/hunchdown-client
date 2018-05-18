/**
 * Created on 18-May-18.
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem'; // eslint-disable-line import/no-named-as-default


const CardList = ({ cards, onDelete }) => {
  return (
    <div className="card-list">
      {_.map(cards, card =>
        <CardItem
          key={card.slug}
          card={card}
          onDelete={onDelete}
        />)}
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CardList;
