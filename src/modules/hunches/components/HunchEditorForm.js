/**
 * Created on 11-Apr-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import CheckboxGroup from '../../common/CheckboxGroup';
import boxes from '../../boxes';

const {CreateBoxModal} = boxes.components;

export class HunchEditorForm extends React.Component {

  constructor () {
    super();

    this.state = {
      showCreateBoxModal: false
    };

    this.openCreateBoxModal = this.openCreateBoxModal.bind(this);
    this.closeCreateBoxModal = this.closeCreateBoxModal.bind(this);
  }


  openCreateBoxModal (e) {
    e.preventDefault();
    this.setState({showCreateBoxModal: true})
  }

  closeCreateBoxModal () {
    this.setState({showCreateBoxModal: false})
  }

  render() {
    const {boxOptions, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="id" component="input" type="hidden" id="hunch-editor-id"/>
        <div className="form-group">
          <label htmlFor="hunch-editor-wisdom">Wisdom</label>
          <Field name="wisdom" component="textarea" type="text" rows="4" className="form-control"
                 id="hunch-editor-wisdom"
                 placeholder="After reading a book, forget everything but the messages that you can apply to your life."/>
        </div>
        <div className="form-group">
          <label htmlFor="hunch-editor-attribute">Attribute</label>
          <Field name="attribute" component="input" type="text" className="form-control" id="hunch-editor-attribute"
                 placeholder="Sithideth Bouasavanh"/>
        </div>
        <div className="form-group">
          <div className="box-list-header clearfix">
            <label htmlFor="hunch-editor-boxes" className="pull-left">Boxes</label>
            <button id="hunch-editor-new-box" className="btn btn-success pull-right" onClick={this.openCreateBoxModal}>New
              Box
            </button>
          </div>
          <CheckboxGroup
            name="boxes"
            options={boxOptions}
          />
          <CreateBoxModal modalOpen={this.state.showCreateBoxModal} closeCreateBoxModal={this.closeCreateBoxModal}/>
        </div>
      </form>
    );
  }
}

HunchEditorForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  boxOptions: PropTypes.array.isRequired,
};

function mapStateToProps (state, ownProps) {
  const hunch = ownProps.hunch;

  return {
    boxOptions: boxes.selectors.getOptionsForCheckbox(state),
    initialValues: {...hunch},
  };
}

export default connect(mapStateToProps, null, null, {withRef: true})(
  reduxForm({
    form: 'hunch-editor'
  })(HunchEditorForm));
