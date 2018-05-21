/**
 * Created on 19-May-18.
 */
import React from 'react';
import { mount } from 'enzyme';
import HunchEditorForm from './HunchEditorForm'; // eslint-disable-line import/no-named-as-default
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import initialState from '../../../initialState';

describe('<HunchEditorForm />', () => {
  let props;
  let mountedHunchEditorForm;
  const hunchEditorForm = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedHunchEditorForm) {
      const store = configureMockStore()(initialState);
      mountedHunchEditorForm = mount(
        <Provider store={store}>
          <HunchEditorForm {...props} />
        </Provider>
      );
    }
    return mountedHunchEditorForm;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
    };
    mountedHunchEditorForm = undefined;
  });

  it('always renders a form as wrapper', () => {
    const form = hunchEditorForm().find('form');
    expect(form.length).toBeGreaterThan(0);
  });

  it('always renders the hidden field `slug`', () => {
    expect(hunchEditorForm().find('input[name="slug"]').length).toBe(1);
  });

  it('always renders the text input field `wisdom`', () => {
    expect(hunchEditorForm().find('textarea[name="wisdom"]').length).toBe(1);
  });

  it('always renders the text input field `attribute`', () => {
    expect(hunchEditorForm().find('input[name="attribute"]').length).toBe(1);
  });

});
