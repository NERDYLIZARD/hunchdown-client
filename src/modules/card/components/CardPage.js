/**
 * Created on 27-Mar-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import CustomPropTypes from '../../../utils/customPropTypes';
import CardEditorModal from './CardEditorModal'; // eslint-disable-line import/no-named-as-default
import Card from './Card'; // eslint-disable-line import/no-named-as-default

import Button from 'react-bootstrap/lib/Button';



export class CardPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.deleteCard = this.deleteCard.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadCards();
  }

  createCard(e) {
    e.preventDefault();
    this.props.actions.openCardEditorModal();
  }

  deleteCard(card) {
    this.props.actions.deleteCard(card);
  }

  renderCards() {
    return (
      <table className="table">
        <thead>
        <tr>
          <th>Wisdom</th>
          <th>Attribute</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        {_.map(this.props.cards, card =>
          <Card
            key={card.slug}
            card={card}
            onDelete={this.deleteCard}
          />)}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div>
        <h1>Cards</h1>
        <Button className="btn btn-success card-create" onClick={e => this.createCard(e)}>New Card</Button>
        <CardEditorModal />
        {this.renderCards()}
      </div>
    );
  }
}

CardPage.propTypes = {
  actions: PropTypes.object.isRequired,
  cards: PropTypes.objectOf(CustomPropTypes.card).isRequired,
};

const mapStateToProps = ({ cards }) => {
  return {
    cards: cards.byId
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);
