/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import * as selectors from '../../selectors/hunches';
import * as modalTypes from '../../constants/modal';
import { BoxDetail } from './BoxDetail';
/* eslint-disable import/no-named-as-default */
import HunchEditorModal from '../hunches/HunchEditorModal';
import InfiniteScroll from 'react-infinite-scroller';
import Grid from "../common/Grid";
import HunchItem from "../hunches/HunchItem";


describe('<BoxDetail />', () => {

  jest.spyOn(BoxDetail.prototype, 'componentDidMount');
  jest.spyOn(BoxDetail.prototype, 'componentWillUnmount');
  jest.spyOn(BoxDetail.prototype, 'loadData');
  jest.spyOn(BoxDetail.prototype, 'unloadData');
  jest.spyOn(BoxDetail.prototype, 'addHunch');
  jest.spyOn(BoxDetail.prototype, 'createHunch');
  jest.spyOn(BoxDetail.prototype, 'editHunch');
  jest.spyOn(BoxDetail.prototype, 'deleteHunch');

  let props;
  let mountedBoxDetail;

  const renderBoxDetail = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedBoxDetail) {
      mountedBoxDetail = shallow(<BoxDetail {...props} />);
    }
    return mountedBoxDetail;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      loadBox: jest.fn(),
      unloadBox: jest.fn(),
      loadHunches: jest.fn(),
      unloadHunches: jest.fn(),
      deleteHunch: jest.fn(),
      openHunchEditorModal: jest.fn(),
      showModal: jest.fn(),
      isFetchingHunches: false,
      nextPageUrlForHunches: '',
      hunches: undefined,
      isFetchingBox: false,
      box: undefined,
      match: {params: {id: 'boxId#1'}}
    };
    mountedBoxDetail = undefined;
  });

  it('always renders a div as wrapper', () => {
    expect(renderBoxDetail().find('.box-detail').length).toBe(1);
  });

  it('load data on `ComponentDidMount()`', () => {
    renderBoxDetail();
    expect(BoxDetail.prototype.componentDidMount).toBeCalled();
    expect(BoxDetail.prototype.loadData).toBeCalled();
    const boxId = props.match.params.id;
    expect(props.loadBox).toBeCalledWith(boxId);
    expect(props.loadHunches).toBeCalledWith(boxId, false, 12);
  });

  it('unload data on `ComponentWillUnmount()`', () => {
    renderBoxDetail().unmount();
    expect(BoxDetail.prototype.componentWillUnmount).toBeCalled();
    expect(BoxDetail.prototype.unloadData).toBeCalled();
    expect(props.unloadBox).toBeCalled();
    expect(props.unloadHunches).toBeCalled();
  });

  describe('when loading a box`', () => {
    beforeEach(() => {
      props.isFetchingBox = true;
    });
    it('renders loading message', () => {
      expect(renderBoxDetail().find('.box-detail__box-loading').length).toBe(1);
    });
  });

  describe('when finish loading a `box` and `box` is not available', () => {
    beforeEach(() => {
      props.isFetchingBox = false;
      props.box = undefined;
    });
    it('renders not found message', () => {
      expect(renderBoxDetail().find('.box-detail__box-not-found').length).toBe(1);
    });
  });

  describe('when `box` is available', () => {
    beforeEach(() => {
      props.box = {
        id: props.match.params.id,
        title: 'A Title',
        description: 'A Description',
      }
    });
    it('renders box detail\'s header', () => {
      expect(renderBoxDetail().find('.box-detail__header').length).toBe(1);
    });

    it('renders box title', () => {
      const boxTitle = renderBoxDetail().find('.box-detail__box-title');
      expect(boxTitle.length).toBe(1);
      expect(boxTitle.text()).toBe(props.box.title);
    });

    it('renders the `New Hunch` button', () => {
      expect(renderBoxDetail().find('.box-detail__create-hunch-button').length).toBe(1);
    });
    describe('when the `New Hunch` button is clicked`', () => {
      it('calls `createHunch()` that dispatches `openHunchEditorModal()`', () => {
        const addHunchButton = renderBoxDetail().find('.box-detail__create-hunch-button');
        addHunchButton.simulate('click', {
          preventDefault: jest.fn()
        });
        expect(BoxDetail.prototype.createHunch).toBeCalled();
        expect(props.openHunchEditorModal).toBeCalledWith(selectors.getEditor);
      });
    });

    it('renders the `Existing Hunch` button', () => {
      expect(renderBoxDetail().find('.box-detail__add-hunch-button').length).toBe(1);
    });
    describe('when the `Existing Hunch` button is clicked`', () => {
      it(`calls 'addHunch()' that dispatches 'showModal(${modalTypes.HUNCH_SELECTOR_MODAL})'`, () => {
        const addHunchButton = renderBoxDetail().find('.box-detail__add-hunch-button');
        addHunchButton.simulate('click', {
          preventDefault: jest.fn()
        });
        expect(BoxDetail.prototype.addHunch).toBeCalled();
        expect(props.showModal).toBeCalledWith(modalTypes.HUNCH_SELECTOR_MODAL, {boxId: 'boxId#1'});
      });
    });


    describe('when finish loading `hunches` and `hunches` are not available', () => {
      beforeEach(() => {
        props.isFetchingHunches = false;
        props.hunches = undefined;
      });
      it('renders not-found message', () => {
        expect(renderBoxDetail().find('.box-detail__hunches-not-found').length).toBe(1);
      });
    });

    it('renders `<InfiniteScroll />`', () => {
      expect(renderBoxDetail().find(InfiniteScroll).length).toBe(1);
    });
    describe('the rendered `<InfiniteScroll />`', () => {
      it('calls `loadHunches(true)` on `loadMore`', () => {
        const infiniteScroll = renderBoxDetail().find(InfiniteScroll);
        infiniteScroll.props().loadMore();
        expect(props.loadHunches).toBeCalledWith(true);
      });
      it('has `hasMore` props determined by ``nextPageUrlForHunches`', () => {
        const infiniteScroll = renderBoxDetail().find(InfiniteScroll);
        expect(infiniteScroll.props().hasMore).toBe(!!props.nextPageUrlForHunches);
      });
      it('has `<Grid/>` as its child', () => {
        const infiniteScroll = renderBoxDetail().find(InfiniteScroll);
        expect(infiniteScroll.find(Grid).length).toBe(1);
      });
    });


    it('renders `<Grid />`', () => {
      expect(renderBoxDetail().find(Grid).length).toBe(1);
    });
    describe('the rendered `<Grid />`', () => {
      let grid;
      let boxDetail;

      beforeEach(() => {
        const boxId = props.match.params.id;
        props.hunches = [{
          id: 'id#1',
          wisdom: 'A Wisdom',
          boxes: [boxId]
        }, {
          id: 'id#2',
          wisdom: 'A Wisdom',
          boxes: [boxId]
        }];
        boxDetail = renderBoxDetail();
        grid = boxDetail.find(Grid);
      });

      it('has `boxes` as its `items`', () => {
        expect(grid.props().items).toEqual(props.hunches);
      });

      it('has `box-list` as its `className`', () => {
        expect(grid.props().className).toBe('hunch-list');
      });

      it('has `render` prop callback that returns `<BoxPreview/>`', () => {
        const hunch = {id: 'id#1'};
        const renderProp = grid.props().render;
        expect(typeof grid.props().render).toBe('function');
        expect(renderProp(hunch)).toEqual(
          <HunchItem
            hunch={hunch}
            onDelete={boxDetail.instance().deleteHunch}
            onEdit={boxDetail.instance().editHunch}/>
        );
      });
    });

    it('renders a `<HunchEditorModal />`', () => {
      expect(renderBoxDetail().find(HunchEditorModal).length).toBe(1);
    });
  });
});
