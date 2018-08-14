/**
 * Created on 03-Aug-18.
 */
import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import { BoxPage } from './BoxPage';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import initialState from '../../../initialState';
import { generateBox } from '../../../utils/test/mockDataFactory';


describe('<BoxPage />', () => {

  jest.spyOn(BoxPage.prototype, 'openCreateBoxModal');
  jest.spyOn(BoxPage.prototype, 'componentDidMount');

  let props;
  let mountedBoxPage;

  const boxPage = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedBoxPage) {
      const store = configureMockStore()(initialState);
      mountedBoxPage = mount(
        <Provider store={store}>
          <BoxPage {...props} />
        </Provider>
      );
    }
    return mountedBoxPage;
  };


  // reset props before running a new test
  beforeEach(() => {
    props = {
      loadBoxes: jest.fn(),
      deleteBox: jest.fn(),
      boxes: undefined,
    };
    mountedBoxPage = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = boxPage().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('calls `loadBoxes()` on `ComponentDidMount()`', () => {
    boxPage();
    expect(BoxPage.prototype.componentDidMount).toBeCalled();
    expect(props.loadBoxes).toBeCalled();
  });

  it('always renders the `New Box` button', () => {
    const createBoxButton = boxPage().find('.create-box-button');
    expect(createBoxButton.length).toBe(1);
  });

  describe.skip('when the `New Box` button is clicked`', () => {
    it('dispatches `openCreateBoxModal()` action creator in `openCreateBoxModal()` method', () => {
      const createBoxButton = boxPage().find('.create-box-button');
      createBoxButton.simulate('click');
      expect(BoxPage.prototype.openCreateBoxModal).toBeCalled();
    });
  });

  describe('when `boxes` is passed', () => {
    beforeEach(() => {
      props.boxes = _.mapKeys([
        generateBox(),
        generateBox(),
      ], 'id');
    });
    it('renders `<BoxList />`', () => {
      expect(boxPage().find('BoxList').length).toBe(1);
    });
    it('passes `boxes` as `boxes` property of `<BoxList />`', () => {
      const BoxList = boxPage().find('BoxList');
      expect(BoxList.props().boxes).toEqual(props.boxes);
    });
  });

  describe('when `boxes` is not passed', () => {
    beforeEach(() => {
      props.boxes = undefined;
    });
    it('does not render `<BoxList />`', () => {
      expect(boxPage().find('BoxList').length).toBe(0);
    });
  });

  it('always renders a `<CreateBoxModal />`', () => {
    expect(boxPage().find('CreateBoxModal').length).toBe(1);
  });

});
