/**
 * Created on 19-May-18.
 */
import React from 'react';
import { mount } from 'enzyme';
import CreateBoxForm from './CreateBoxForm'; // eslint-disable-line import/no-named-as-default
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import initialState from '../../../initialState';

describe('<CreateBoxForm />', () => {
  let props;
  let mountedCreateBoxForm;
  const createBoxForm = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedCreateBoxForm) {
      const store = configureMockStore()(initialState);
      mountedCreateBoxForm = mount(
        <Provider store={store}>
          <CreateBoxForm {...props} />
        </Provider>
      );
    }
    return mountedCreateBoxForm;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
    };
    mountedCreateBoxForm = undefined;
  });

  it('always renders a form as wrapper', () => {
    const form = createBoxForm().find('form');
    expect(form.length).toBeGreaterThan(0);
  });

  it('always renders the `hidden` field `id`', () => {
    const hiddenIdField = createBoxForm().find('input[name="id"]');
    expect(hiddenIdField.length).toBe(1);
    expect(hiddenIdField.props().type).toBe('hidden');
  });

  it('always renders the `input` field `title`', () => {
    expect(createBoxForm().find('input[name="title"]').length).toBe(1);
  });

  it('always renders the `textarea` field `description`', () => {
    expect(createBoxForm().find('textarea[name="description"]').length).toBe(1);
  });

  it('calls `handleSubmit()` when submitting the form', () => {
    createBoxForm().simulate('submit');
    expect(props.handleSubmit).toBeCalled();
  });

});
