/**
 * Created on 27-Mar-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as actions from './cardActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import CustomPropTypes from '../../constants/customPropTypes';


import Card from './Card';


export class CardPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.loadCards();
  }

  renderCards() {
    return _.map(this.props.cards, card =>
      <Card key={card.id} card={card}/>);
  }

  render() {
    return (
      <div>
        <h1>Cards</h1>
        <Link to="/cards/new">New Card</Link>
        {this.renderCards()}
      </div>
    );
  }
}

CardPage.propTypes = {
  actions: PropTypes.object.isRequired,
  cards: PropTypes.objectOf(CustomPropTypes.card).isRequired,
};

const mapStateToProps = ({ cards }) => ({
  cards
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);
