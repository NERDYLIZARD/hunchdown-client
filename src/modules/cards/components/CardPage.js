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

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-10">
            <h2>Cards</h2>
          </div>
          <div className="col-xs-2">
            <Button className="create-card-button btn btn-success" onClick={e => this.createCard(e)}>New Card</Button>
          </div>
        </div>
        <div className="row">
          <CardList cards={this.props.cards} onDelete={this.deleteCard}/>
        </div>
        <CardEditorModal/>
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
