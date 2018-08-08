/**
 * Created on 19-May-18.
 */
import React from 'react';
import { Field } from 'redux-form';
import { shallow } from 'enzyme';
import { HunchEditorForm } from './HunchEditorForm'; // eslint-disable-line import/no-named-as-default
import CheckboxGroup from '../../common/CheckboxGroup';


describe('<HunchEditorForm />', () => {
  let props;
  let mountedHunchEditorForm;
  const hunchEditorForm = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedHunchEditorForm) {
      mountedHunchEditorForm = shallow(
        <HunchEditorForm {...props} />
      );
    }
    return mountedHunchEditorForm;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
      boxOptions: [
        {label: 'Life', value: 'id#1'},
        {label: 'Inspiration', value: 'id#2'},
      ],
    };
    mountedHunchEditorForm = undefined;
  });

  it('always renders a form as wrapper', () => {
    const form = hunchEditorForm().find('form');
    expect(form.length).toBeGreaterThan(0);
  });

  it('always renders the `hidden` field `id`', () => {
    const hiddenIdField = hunchEditorForm().find(Field).filter({name: 'id'});
    expect(hiddenIdField.length).toBe(1);
    expect(hiddenIdField.props().type).toBe('hidden');
  });

  it('always renders the `input` field for `wisdom`', () => {
    const wisdomInput = hunchEditorForm().find(Field).filter({name: 'wisdom'});
    expect(wisdomInput.length).toBe(1);
  });

  it('always renders the `textarea` field for `attribute`', () => {
    const attributeTextArea = hunchEditorForm().find(Field).filter({name: 'attribute'});
    expect(attributeTextArea.length).toBe(1);
  });

  it('always renders the `checkbox` for `boxes` with props `name` & `boxOptions`', () => {
    const checkboxGroup = hunchEditorForm().find(CheckboxGroup);

    expect(checkboxGroup.length).toBe(1);
    expect(checkboxGroup.props().name).toBe('boxes');
    expect(checkboxGroup.props().options).toEqual([
      {label: 'Life', value: 'id#1'},
      {label: 'Inspiration', value: 'id#2'},
    ]);
  });

  it('calls `handleSubmit()` when submitting the form', () => {
    hunchEditorForm().simulate('submit');
    expect(props.handleSubmit).toBeCalled();
  });
});
