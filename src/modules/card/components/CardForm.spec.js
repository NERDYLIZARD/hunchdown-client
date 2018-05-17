/**
 * Created on 12-Apr-18.
 */
import React from 'react';
import { mount } from 'enzyme';
import CardForm from './CardForm';
import initialState from '../../../initialState';
import TextInput from '../../common/TextInput';


function setup(saving = false) {
  const props = {
    card: initialState.card,
    onChange: jest.fn(),
    onSave: jest.fn(),
    errors: {},
    saving: saving,
  };
  return mount(<CardForm {...props} />)
}

describe("<CardForm />", () => {

  it('contains two TextInput', function () {
    const wrapper = setup();
    expect(wrapper.find(TextInput).length).toBe(2);
  });

  it('contains save button', function () {
    const wrapper = setup();
    expect(wrapper.find('input[type="submit"]').length).toBe(1);
  });

  describe("Save button", () => {
    it('should be labeled "Save" when not saving', () => {
      const wrapper = setup(false);
      expect(wrapper.find('input[type="submit"]').props().value).toBe('Save');
    });

    it('should be labeled "Saving..." when saving', () => {
      const wrapper = setup(true);
      expect(wrapper.find('input[type="submit"]').props().value).toBe('Saving...');
    });
  });

});
