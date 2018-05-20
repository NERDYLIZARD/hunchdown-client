/**
 * Created on 27-Mar-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { connect } from 'react-redux';
import CustomPropTypes from '../../../utils/customPropTypes';
import CardEditorModal from './CardEditorModal'; // eslint-disable-line import/no-named-as-default
import CardList from './CardList'; // eslint-disable-line import/no-named-as-default


export class CardPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.createCard = this.createCard.bind(this);
    this.editCard = this.editCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  componentDidMount() {
    this.props.loadCards();
  }

  createCard(e) {
    e.preventDefault();
    this.props.openCardEditorModal();
  }

  editCard(e, card) {
    e.preventDefault();
    this.props.openCardEditorModal(card);
  }

  deleteCard(e, card) {
    e.preventDefault();
    this.props.deleteCard(card);
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
              <button className="create-card-button btn btn-success" onClick={this.createCard}>New Card</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-offset-4 col-xs-4">
            {cards ?
              <CardList cards={cards} onEdit={this.editCard} onDelete={this.deleteCard}/> : null
            }
          </div>
        </div>
        <CardEditorModal/>
      </div>
    );
  }
}

CardPage.propTypes = {
  loadCards: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  openCardEditorModal: PropTypes.func.isRequired,
  cards: PropTypes.objectOf(CustomPropTypes.card),
};

const mapStateToProps = ({ cards }) => {
  return {
    cards: cards.byId
  }
};

export default connect(mapStateToProps, { ...actions })(CardPage);
