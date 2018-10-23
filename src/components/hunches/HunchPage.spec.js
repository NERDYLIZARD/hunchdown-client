/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import * as selectors from '../../selectors/hunches';
import * as modalTypes from '../../constants/modal';
import { HunchPage } from './HunchPage';
/* eslint-disable import/no-named-as-default */
import HunchList from './HunchList';
import HunchEditorModal from './HunchEditorModal';
import InfiniteScroll from '../common/InfiniteScroll';


describe('<HunchPage />', () => {

  jest.spyOn(HunchPage.prototype, 'componentDidMount');
  jest.spyOn(HunchPage.prototype, 'componentWillUnmount');
  jest.spyOn(HunchPage.prototype, 'loadData');
  jest.spyOn(HunchPage.prototype, 'unloadData');
  jest.spyOn(HunchPage.prototype, 'addHunch');
  jest.spyOn(HunchPage.prototype, 'createHunch');
  jest.spyOn(HunchPage.prototype, 'editHunch');
  jest.spyOn(HunchPage.prototype, 'deleteHunch');

  let props;
  let mountedHunchPage;

  const renderHunchPage = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedHunchPage) {
      mountedHunchPage = shallow(<HunchPage {...props} />);
    }
    return mountedHunchPage;
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
      hunches: undefined,
      isFetchingBox: false,
      box: undefined,
      match: {params: {id: 'boxId#1'}}
    };
    mountedHunchPage = undefined;
  });

  it('always renders a div as wrapper', () => {
    expect(renderHunchPage().find('.hunch-page').length).toBe(1);
  });

  it('load data on `ComponentDidMount()`', () => {
    renderHunchPage();
    expect(HunchPage.prototype.componentDidMount).toBeCalled();
    expect(HunchPage.prototype.loadData).toBeCalled();
    const boxId = props.match.params.id;
    expect(props.loadBox).toBeCalledWith(boxId);
    expect(props.loadHunches).toBeCalledWith(boxId, false, 12);
  });

  it('unload data on `ComponentWillUnmount()`', () => {
    renderHunchPage().unmount();
    expect(HunchPage.prototype.componentWillUnmount).toBeCalled();
    expect(HunchPage.prototype.unloadData).toBeCalled();
    expect(props.unloadBox).toBeCalled();
    expect(props.unloadHunches).toBeCalled();
  });

  describe('when loading a box`', () => {
    beforeEach(() => {
      props.isFetchingBox = true;
    });
    it('renders loading message', () => {
      expect(renderHunchPage().find('.hunch-page__box-loading').length).toBe(1);
    });
  });

  describe('when finish loading a `box` and `box` is not available', () => {
    beforeEach(() => {
      props.isFetchingBox = false;
      props.box = undefined;
    });
    it('renders not found message', () => {
      expect(renderHunchPage().find('.hunch-page__box-not-found').length).toBe(1);
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
    it('renders hunch page\'s header', () => {
      expect(renderHunchPage().find('.hunch-page__header').length).toBe(1);
    });

    it('renders box title', () => {
      const boxTitle = renderHunchPage().find('.hunch-page__box-title');
      expect(boxTitle.length).toBe(1);
      expect(boxTitle.text()).toBe(props.box.title);
    });

    it('renders the `New Hunch` button', () => {
      expect(renderHunchPage().find('.hunch-page__create-hunch-button').length).toBe(1);
    });
    describe('when the `New Hunch` button is clicked`', () => {
      it('calls `createHunch()` that dispatches `openHunchEditorModal()`', () => {
        const addHunchButton = renderHunchPage().find('.hunch-page__create-hunch-button');
        addHunchButton.simulate('click', {
          preventDefault: jest.fn()
        });
        expect(HunchPage.prototype.createHunch).toBeCalled();
        expect(props.openHunchEditorModal).toBeCalledWith(selectors.getEditor);
      });
    });

    it('renders the `Existing Hunch` button', () => {
      expect(renderHunchPage().find('.hunch-page__add-hunch-button').length).toBe(1);
    });
    describe('when the `Existing Hunch` button is clicked`', () => {
      it(`calls 'addHunch()' that dispatches 'showModal(${modalTypes.HUNCH_SELECTOR_MODAL})'`, () => {
        const addHunchButton = renderHunchPage().find('.hunch-page__add-hunch-button');
        addHunchButton.simulate('click', {
          preventDefault: jest.fn()
        });
        expect(HunchPage.prototype.addHunch).toBeCalled();
        expect(props.showModal).toBeCalledWith(modalTypes.HUNCH_SELECTOR_MODAL, {boxId: 'boxId#1'});
      });
    });


    describe('when finish loading `hunches` and `hunches` are not available', () => {
      beforeEach(() => {
        props.isFetchingHunches = false;
        props.hunches = undefined;
      });
      it('renders not-found message', () => {
        expect(renderHunchPage().find('.hunch-page__hunches-not-found').length).toBe(1);
      });
    });

    it('renders `<InfiniteScroll />`', () => {
      expect(renderHunchPage().find(InfiniteScroll).length).toBe(1);
    });
    describe('the rendered `<InfiniteScroll />`', () => {
      it('has `[boxId, true]` passed to `args` props', () => {
        const infiniteScroll = renderHunchPage().find(InfiniteScroll);
        expect(infiniteScroll.props().args).toEqual([props.match.params.id, true]);
      });
      it('has `loadBoxes` passed to `onScroll` props', () => {
        const infiniteScroll = renderHunchPage().find(InfiniteScroll);
        expect(infiniteScroll.props().onScroll).toEqual(props.loadHunches);
      });
      it('has `<HunchList/>` as its child', () => {
        const infiniteScroll = renderHunchPage().find(InfiniteScroll);
        expect(infiniteScroll.find(HunchList).length).toBe(1);
      });
    });

    it('renders `<HunchList />`', () => {
      expect(renderHunchPage().find(HunchList).length).toBe(1);
    });
    describe('the rendered `<HunchList />`', () => {
      let hunchPage;
      let hunchList;
      // let selectedHunch;

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
        // selectedHunch = props.hunches[0];
        hunchPage = renderHunchPage();
        hunchList = hunchPage.find(HunchList);
      });

      it('has `hunches` as its props', () => {
        expect(hunchList.props().hunches).toEqual(props.hunches);
      });
      it('has `props.deleteHunch()` as its `onDelete` prop', () => {
        expect(hunchList.props().onDelete).toEqual(hunchPage.instance().deleteHunch);
      });
      it('has `props.editHunch()` as its `onEdit` prop', () => {
        expect(hunchList.props().onEdit).toEqual(hunchPage.instance().editHunch);
      });
    });

    describe('when fetching hunches`', () => {
      beforeEach(() => {
        props.isFetchingHunches = true;
      });
      it('renders loading message', () => {
        expect(renderHunchPage().find('.hunch-page__hunches-loading').length).toBe(1);
      });
    });

    it('renders a `<HunchEditorModal />`', () => {
      expect(renderHunchPage().find(HunchEditorModal).length).toBe(1);
    });
  });
});
