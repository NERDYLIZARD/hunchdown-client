/**
 * Created on 11-Apr-18.
 */
import React, { Component } from 'react';
import CustomPropTypes from '../../../utils/customPropTypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

export class CardItem extends Component {

  editCard(e, card) {
    e.preventDefault();
    this.props.openCardEditorModal(card);
  }

  render() {
    const { card, onDelete } = this.props;
    return (
      <div className="card">
        <div className="card-header clearfix">
          <div className="card-actions pull-right">
            <a href="#" onClick={e => this.editCard(e, card)}><i className="fa fa-edit"></i></a>
            <a href="#" onClick={() => onDelete(card)}><i className="fa fa-trash"></i></a>
          </div>
        </div>
        <div className="card-body">
          <p className="card-wisdom">{card.wisdom}</p>
          <p className="card-attribute">- {card.attribute} -</p>
        </div>
      </div>
    );
  }
}

CardItem.propTypes = {
  card: CustomPropTypes.card.isRequired,
  onDelete: PropTypes.func,
  openCardEditorModal: PropTypes.func,
};

export default connect(null, { ...actions })(CardItem);

