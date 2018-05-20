/**
 * Created on 27-Mar-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomPropTypes from '../../../utils/customPropTypes';
import CardEditorModal from './CardEditorModal'; // eslint-disable-line import/no-named-as-default
import CardList from './CardList'; // eslint-disable-line import/no-named-as-default

import Button from 'react-bootstrap/lib/Button';


export class CardPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.createCard = this.createCard.bind(this);
    this.editCard = this.editCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadCards();
  }

  createCard(e) {
    e.preventDefault();
    this.props.actions.openCardEditorModal();
  }

  editCard(e, card) {
    e.preventDefault();
    this.props.actions.openCardEditorModal(card);
  }

  deleteCard(e, card) {
    e.preventDefault();
    this.props.actions.deleteCard(card);
  }

  render() {
    const { cards } = this.props;
    return (
      <div className="card-page container-fluid">
        <div className="row">
          <div className="card-page-header clearfix">
            <div className="pull-left">
              <h2>Cards</h2>
            </div>
            <div className="pull-right">
              <Button className="create-card-button btn btn-success" onClick={this.createCard}>New Card</Button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-offset-4 col-xs-4">
            {cards ?
              <CardList cards={cards} onDelete={this.deleteCard} onEdit={this.editCard}/> : null
            }
          </div>
        </div>
        <CardEditorModal/>
      </div>
    );
  }
}

CardPage.propTypes = {
  actions: PropTypes.object.isRequired,
  cards: PropTypes.objectOf(CustomPropTypes.card),
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
