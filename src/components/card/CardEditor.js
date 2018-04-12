/**
 * Created on 11-Apr-18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import initialState from '../../constants/initialState';
import * as actions from './cardActions';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
// import CustomPropTypes from '../../constants/customPropTypes';

import CardForm from './CardForm';

export class CardEditor extends Component {
  constructor(props, context) {
    super(props, context);

    this.updateCardState = this.updateCardState.bind(this);
    this.saveCard = this.saveCard.bind(this);

    this.state = {
      card: Object.assign({}, initialState.card),
      errors: {},
      isSaving: false
    };
  }

  updateCardState(e) {
    const field = e.target.name;
    const card = this.state.card;
    card[field] = e.target.value;
    this.setState({ card });
  }

  saveCard(e) {
    e.preventDefault();
    this.setState({ isSaving: true });
    this.props.actions.saveCard(this.state.card)
      .then(response => {
        toastr.success('Card Saved');
        this.setState({ isSaving: false });
        this.props.history.push('/cards');
      })
      .catch(error => {
        this.setState({errors: {wisdom: error }})
        this.setState({ isSaving: false });
    });
  }

  render() {
    return (
      <div>
        <CardForm
          card={this.state.card}
          onChange={this.updateCardState}
          onSave={this.saveCard}
          errors={this.state.errors}
          saving={this.state.isSaving}
        />
      </div>
    );
  }
}

CardEditor.propTypes = {
  // card: PropTypes.objectOf(CustomPropTypes.card).isRequired
  actions: PropTypes.object.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CardEditor);
