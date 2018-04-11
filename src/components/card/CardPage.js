/**
 * Created on 27-Mar-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../../constants/customPropTypes';
import * as actions from './cardActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from './Card';


export class CardPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.loadCards();
  }

  render() {
    return (
      <div>
        <h1>Cards</h1>
        {this.props.cards.map(card =>
          <Card key={card.id} card={card}/>
        )}
      </div>
    );
  }
}

CardPage.propTypes = {
  actions: PropTypes.object.isRequired,
  cards: PropTypes.arrayOf(CustomPropTypes.card).isRequired,
};

const mapStateToProps = ({ cards }) => ({
  cards
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);
