/**
 * Created on 11-Apr-18.
 */
import React, { Component } from 'react';
import CustomPropTypes from '../../../utils/customPropTypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

export class CardItem extends Component {

  editCard(e, card) {
    e.preventDefault();
    this.props.openCardEditorModal(card);
  }

  render() {
    const { card, onDelete } = this.props;
    return (
      <tr>
        <td><i>{card.wisdom}</i></td>
        <td>{card.attribute}</td>
        <td><Link to="#" onClick={e => this.editCard(e, card)}>Edit</Link></td>
        <td><Link to="#" onClick={() => onDelete(card)}>Delete</Link></td>
      </tr>
    );

  }
}

CardItem.propTypes = {
  card: CustomPropTypes.card.isRequired,
  onDelete: PropTypes.func,
  openCardEditorModal: PropTypes.func,
};

export default connect(null, { ...actions })(CardItem);

