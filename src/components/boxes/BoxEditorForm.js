/**
 * Created on 02-Aug-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as selectors from '../../selectors/boxes';

export const BoxEditorForm = ({handleSubmit}) => {

  return (
    <form onSubmit={handleSubmit}>
      <Field name="id" component="input" type="hidden" id="create-box-id" />
      <div className="form-group">
        <label htmlFor="create-box-title">Title</label>
        <Field name="title" component="input" type="text" className="form-control" id="create-box-title" placeholder="Inspiration" />
      </div>
      <div className="form-group">
        <label htmlFor="create-box-description">Description</label>
        <Field name="description" component="textarea" type="text" rows="4" className="form-control" id="create-box-description" placeholder="Collection of inspiration quotes" />
      </div>
    </form>
  );
};

BoxEditorForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {props} = selectors.getEditor(state);
  return {
    initialValues: props
  };
}

export default connect(mapStateToProps, null, null, { withRef: true })(
  reduxForm({
    form: 'box-editor'
  })(BoxEditorForm));
