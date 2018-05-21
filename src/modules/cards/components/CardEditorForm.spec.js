/**
 * Created on 19-May-18.
 */
import React from 'react';
import { mount } from 'enzyme';
import CardEditorForm from './CardEditorForm'; // eslint-disable-line import/no-named-as-default
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import initialState from '../../../initialState';

describe('<CardEditorForm />', () => {
  let props;
  let mountedCardEditorForm;
  const cardEditorForm = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedCardEditorForm) {
      const store = configureMockStore()(initialState);
      mountedCardEditorForm = mount(
        <Provider store={store}>
          <CardEditorForm {...props} />
        </Provider>
      );
    }
    return mountedCardEditorForm;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
    };
    mountedCardEditorForm = undefined;
  });

  it('always renders a form as wrapper', () => {
    const form = cardEditorForm().find('form');
    expect(form.length).toBeGreaterThan(0);
  });

  it('always renders the hidden field `slug`', () => {
    expect(cardEditorForm().find('input[name="slug"]').length).toBe(1);
  });

  it('always renders the text input field `wisdom`', () => {
    expect(cardEditorForm().find('textarea[name="wisdom"]').length).toBe(1);
  });

  it('always renders the text input field `attribute`', () => {
    expect(cardEditorForm().find('input[name="attribute"]').length).toBe(1);
  });

});
