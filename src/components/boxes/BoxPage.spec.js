/**
 * Created on 03-Aug-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { BoxPage } from './BoxPage';
/* eslint-disable import/no-named-as-default */
import BoxEditorModal from './BoxEditorModal';
import InfiniteScroll from '../common/InfiniteScroll';
import Grid from '../common/Grid';
import BoxPreviewWithRouter from './preview/BoxPreview';


describe('<BoxPage />', () => {

  jest.spyOn(BoxPage.prototype, 'componentDidMount');
  jest.spyOn(BoxPage.prototype, 'componentWillUnmount');
  jest.spyOn(BoxPage.prototype, 'createBox');
  jest.spyOn(BoxPage.prototype, 'editBox');
  jest.spyOn(BoxPage.prototype, 'deleteBox');

  let props;
  let mountedBoxPage;

  const boxPage = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedBoxPage) {
      mountedBoxPage = shallow(
        <BoxPage {...props} />
      );
    }
    return mountedBoxPage;
  };


  // reset props before running a new test
  beforeEach(() => {
    props = {
      loadBoxes: jest.fn(),
      unloadBoxes: jest.fn(),
      deleteBox: jest.fn(),
      openBoxEditorModal: jest.fn(),
      isFetchingBoxes: false,
      boxes: undefined,
    };
    mountedBoxPage = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = boxPage().find('.box-page');
    expect(divs.length).toBe(1);
  });

  it('calls `loadBoxes()` on `ComponentDidMount()`', () => {
    boxPage();
    expect(BoxPage.prototype.componentDidMount).toBeCalled();
    expect(props.loadBoxes).toBeCalled();
  });

  it('calls `unloadBoxes()` on `ComponentWillUnmount()`', () => {
    boxPage().unmount();
    expect(BoxPage.prototype.componentWillUnmount).toBeCalled();
    expect(props.unloadBoxes).toBeCalled();
  });

  it('always renders the `New Box` button', () => {
    const createBoxButton = boxPage().find('.create-box-button');
    expect(createBoxButton.length).toBe(1);
  });

  describe('when the `New Box` button is clicked`', () => {
    it('call `createBox` that dispatches `openBoxEditorModal()`', () => {
      const createBoxButton = boxPage().find('.create-box-button');
      const e = {preventDefault: jest.fn()};
      createBoxButton.simulate('click', e);
      expect(BoxPage.prototype.createBox).toBeCalledWith(e);
      expect(props.openBoxEditorModal).toBeCalled();
    });
  });

  describe('when `isFetchingBoxes` is false & `boxes` is not available', () => {
    beforeEach(() => {
      props.isFetchingBoxes = false;
      props.boxes = undefined;
    });
    it('renders not-found message', () => {
      expect(boxPage().find('.box-page__boxes-not-found').length).toBe(1);
    });
  });

  it('renders `<InfiniteScroll />`', () => {
    expect(boxPage().find(InfiniteScroll).length).toBe(1);
  });
  describe('the rendered `<InfiniteScroll />`', () => {
    it('has `[true]` passed to `args` props', () => {
      const infiniteScroll = boxPage().find(InfiniteScroll);
      expect(infiniteScroll.props().args).toEqual([true]);
    });
    it('has `loadBoxes` passed to `onScroll` props', () => {
      const infiniteScroll = boxPage().find(InfiniteScroll);
      expect(infiniteScroll.props().onScroll).toEqual(props.loadBoxes);
    });
    it('has `<Grid/>` as its child', () => {
      const infiniteScroll = boxPage().find(InfiniteScroll);
      expect(infiniteScroll.find(Grid).length).toBe(1);
    });
  });

  it('renders `<Grid />`', () => {
    expect(boxPage().find(Grid).length).toBe(1);
  });
  describe('the rendered `<Grid />`', () => {
    let grid;
    let BoxPage;

    beforeEach(() => {
      props.boxes = [{
        id: 'id#1',
        title: 'A Title',
      }, {
        id: 'id#2',
        title: 'A Title',
      }];
      BoxPage = boxPage();
      grid = BoxPage.find(Grid);
    });

    it('has `boxes` as its `items`', () => {
      expect(grid.props().items).toEqual(props.boxes);
    });

    it('has `box-list` as its `className`', () => {
      expect(grid.props().className).toBe('box-list');
    });

    it('has `render` prop callback that returns `<BoxPreviewWithRouter/>`', () => {
      const box = {id: 'id#1'};
      const renderProp = grid.props().render;
      expect(typeof grid.props().render).toBe('function');
      expect(renderProp(box)).toEqual(
        <BoxPreviewWithRouter
          box={box}
          onDelete={BoxPage.instance().deleteBox}
          onEdit={BoxPage.instance().editBox}/>);
    });
  });

  describe('when `isFetchingBoxes` is true', () => {
    beforeEach(() => {
      props.isFetchingBoxes = true;
    });
    it('renders loading message', () => {
      expect(boxPage().find('.box-page__boxes-loading').length).toBe(1);
    });
  });

  it('always renders a `<BoxEditorModal />`', () => {
    expect(boxPage().find(BoxEditorModal).length).toBe(1);
  });

});

