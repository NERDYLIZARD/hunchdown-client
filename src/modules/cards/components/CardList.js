/**
 * Created on 18-May-18.
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem'; // eslint-disable-line import/no-named-as-default


const CardList = ({ cards, onDelete }) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th style={{textAlign:'center'}}>Wisdom</th>
        <th style={{textAlign:'center'}}>Attribute</th>
        <th colSpan={2} style={{textAlign:'center'}}>actions</th>
      </tr>
      </thead>
      <tbody>
      {_.map(cards, card =>
        <CardItem
          key={card.slug}
          card={card}
          onDelete={onDelete}
        />)}
      </tbody>
    </table>
  );
};

CardList.propTypes = {
  cards: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CardList;
