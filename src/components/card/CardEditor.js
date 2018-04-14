/**
 * Created on 11-Apr-18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import initialState from '../../constants/initialState';
import * as actions from './cardActions';
import { bindActionCreators } from 'redux';
import CustomPropTypes from '../../constants/customPropTypes';
import toastr from 'toastr';

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

  componentDidMount() {
    // determine whether is creating card or editing card by :id
    if (this.props.match.params.id)
      this.props.actions.loadCard(this.props.match.params.id);
  }

  // nextProps call after updating activeCard state
  componentWillReceiveProps(nextProps) {
    this.setState({ card: Object.assign({}, nextProps.card) });
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
      .then(() => {
        toastr.success('Card Saved');
        this.setState({ isSaving: false });
        this.props.history.push('/cards');
      })
      .catch(error => {
        this.setState({ errors: { wisdom: error } });
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
  card: CustomPropTypes.card,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
};


const mapStateToProps = (state, ownProps) => {
  // determine whether is creating card or editing card by :id
  const card = ownProps.match.params.id ? state.activeCard : initialState.card;
  return { card };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CardEditor);
