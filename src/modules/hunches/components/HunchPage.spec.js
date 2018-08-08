/**
 * Created on 19-May-18.
 */
import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import { HunchPage } from './HunchPage';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import initialState from '../../../initialState';
import { generateHunch } from '../../../utils/test/mockDataFactory';


describe('<HunchPage />', () => {

  jest.spyOn(HunchPage.prototype, 'createHunch');
  jest.spyOn(HunchPage.prototype, 'componentDidMount');

  let props;
  let mountedHunchPage;

  const hunchPage = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedHunchPage) {
      const store = configureMockStore()(initialState);
      mountedHunchPage = mount(
        <Provider store={store}>
          <HunchPage {...props} />
        </Provider>
      );
    }
    return mountedHunchPage;
  };


  // reset props before running a new test
  beforeEach(() => {
    props = {
      loadHunches: jest.fn(),
      deleteHunch: jest.fn(),
      openHunchEditorModal: jest.fn(),
      hunches: undefined,
    };
    mountedHunchPage = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = hunchPage().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('calls `loadHunches()` on `ComponentDidMount()`', () => {
    hunchPage();
    expect(HunchPage.prototype.componentDidMount).toBeCalled();
    expect(props.loadHunches).toBeCalled();
  });

  it('always renders the `New Hunch` button', () => {
    const createHunchButton = hunchPage().find('.create-hunch-button');
    expect(createHunchButton.length).toBe(1);
  });

  describe('when the `New Hunch` button is clicked`', () => {
    it('dispatches `openHunchEditorModal()` action creator in `createHunch()` method', () => {
      const createHunchButton = hunchPage().find('.create-hunch-button');
      createHunchButton.simulate('click');
      expect(HunchPage.prototype.createHunch).toBeCalled();
      expect(props.openHunchEditorModal).toBeCalled();
    });
  });

  describe('when `hunches` is passed', () => {
    beforeEach(() => {
      props.hunches = _.mapKeys([
        generateHunch(),
        generateHunch(),
      ], 'slug');
    });
    it('renders `<HunchList />`', () => {
      expect(hunchPage().find('HunchList').length).toBe(1);
    });
    it('passes `hunches` as `hunches` property of `<HunchList />`', () => {
      const HunchList = hunchPage().find('HunchList');
      expect(HunchList.props().hunches).toEqual(props.hunches);
    });
  });

  describe('when `hunches` is not passed', () => {
    beforeEach(() => {
      props.hunches = undefined;
    });
    it('does not render `<HunchList />`', () => {
      expect(hunchPage().find('HunchList').length).toBe(0);
    });
  });

  it('always renders a `<HunchEditorModal />`', () => {
    expect(hunchPage().find('HunchEditorModal').length).toBe(1);
  });

});
