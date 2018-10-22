/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';
import { BoxEditorForm } from './BoxEditorForm'; // eslint-disable-line import/no-named-as-default

describe('<BoxEditorForm />', () => {
  let props;
  let mountedBoxEditorForm;
  const renderBoxEditorForm = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedBoxEditorForm) {
      mountedBoxEditorForm = shallow(
        <BoxEditorForm {...props} />
      );
    }
    return mountedBoxEditorForm;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
    };
    mountedBoxEditorForm = undefined;
  });

  it('always renders a form as wrapper', () => {
    const form = renderBoxEditorForm().find('form');
    expect(form.length).toBeGreaterThan(0);
  });

  it('always renders the `hidden` field `id`', () => {
    const hiddenIdField = renderBoxEditorForm().find(Field).filter({name: 'id'});
    expect(hiddenIdField.length).toBe(1);
    expect(hiddenIdField.props().type).toBe('hidden');
  });

  it('always renders the `input` field `title`', () => {
    expect(renderBoxEditorForm().find(Field).filter({name: 'title'}).length).toBe(1);
  });

  it('always renders the `textarea` field `description`', () => {
    expect(renderBoxEditorForm().find(Field).filter({name: 'description'}).length).toBe(1);
  });

  it('calls `handleSubmit()` when submitting the form', () => {
    renderBoxEditorForm().simulate('submit');
    expect(props.handleSubmit).toBeCalled();
  });

});
