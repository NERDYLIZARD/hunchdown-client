/**
 * Created on 11-Apr-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

export const CardEditorForm = ({handleSubmit}) => {

  return (
    <form onSubmit={handleSubmit}>
      <Field name="slug" component="input" type="hidden" id="card-editor-id" />
      <div className="form-group">
        <label htmlFor="card-editor-wisdom">Wisdom</label>
        <Field name="wisdom" component="input" type="text" className="form-control" id="card-editor-wisdom" placeholder="After reading a book, forget everything but the messages that you can apply to your life." />
      </div>
      <div className="form-group">
        <label htmlFor="card-editor-attribute">Attribute</label>
        <Field name="attribute" component="input" type="text" className="form-control" id="card-editor-attribute" placeholder="Sithideth Bouasavanh" />
      </div>
    </form>
  );
};

CardEditorForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { card } = state.cards.editing;
  return {
    initialValues: { ...card }
  };
}

export default connect(mapStateToProps, null, null, { withRef: true })(
  reduxForm({
    form: 'card-editor'
  })(CardEditorForm));
