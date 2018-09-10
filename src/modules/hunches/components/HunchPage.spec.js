/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { HunchPage } from './HunchPage';
import * as selectors from '../selectors';
import HunchList from './HunchList';
import HunchEditorModal from './HunchEditorModal';


describe('<HunchPage />', () => {

  jest.spyOn(HunchPage.prototype, 'componentDidMount');
  jest.spyOn(HunchPage.prototype, 'componentWillUnmount');
  jest.spyOn(HunchPage.prototype, 'loadData');
  jest.spyOn(HunchPage.prototype, 'unloadData');
  jest.spyOn(HunchPage.prototype, 'createHunch');
  jest.spyOn(HunchPage.prototype, 'editHunch');
  jest.spyOn(HunchPage.prototype, 'deleteHunch');

  let props;
  let mountedHunchPage;

  const hunchPage = () => {
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
      isFetchingHunches: false,
      hunches: undefined,
      isFetchingBox: false,
      box: undefined,
      match: {params: {id: 'boxId#1'}}
    };
    mountedHunchPage = undefined;
  });

  it('always renders a div as wrapper', () => {
    expect(hunchPage().find('.hunch-page').length).toBe(1);
  });

  it('load data on `ComponentDidMount()`', () => {
    hunchPage();
    expect(HunchPage.prototype.componentDidMount).toBeCalled();
    expect(HunchPage.prototype.loadData).toBeCalled();
    const boxId = props.match.params.id;
    expect(props.loadBox).toBeCalledWith(boxId);
    expect(props.loadHunches).toBeCalledWith(boxId);
  });

  it('unload data on `ComponentWillUnmount()`', () => {
    hunchPage().unmount();
    expect(HunchPage.prototype.componentWillUnmount).toBeCalled();
    expect(HunchPage.prototype.unloadData).toBeCalled();
    expect(props.unloadBox).toBeCalled();
    expect(props.unloadHunches).toBeCalled();
  });

  describe('when `isFetchingBox`', () => {
    beforeEach(() => {
      props.isFetchingBox = true;
    });
    it('renders loading message', () => {
      expect(hunchPage().find('.hunch-page__box-loading').length).toBe(1);
    });
  });

  describe('when `box` is not available', () => {
    beforeEach(() => {
      props.box = undefined;
    });
    it('renders not found message', () => {
      expect(hunchPage().find('.hunch-page__box-not-found').length).toBe(1);
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
      expect(hunchPage().find('.hunch-page__header').length).toBe(1);
    });

    it('renders box title', () => {
      const boxTitle = hunchPage().find('.hunch-page__box-title');
      expect(boxTitle.length).toBe(1);
      expect(boxTitle.text()).toBe(props.box.title);
    });

    it('renders the `Add Hunch` button', () => {
      expect(hunchPage().find('.hunch-page__add-hunch-button').length).toBe(1);
    });

    describe('when the `Add Hunch` button is clicked`', () => {
      it('calls `createHunch()` that dispatches `openHunchEditorModal()`', () => {
        const addHunchButton = hunchPage().find('.hunch-page__add-hunch-button');
        addHunchButton.simulate('click', {
          preventDefault: jest.fn()
        });
        expect(HunchPage.prototype.createHunch).toBeCalled();
        expect(props.openHunchEditorModal).toBeCalledWith(selectors.getEditor);
      });
    });

    describe('when `isFetchingHunches`', () => {
      beforeEach(() => {
        props.isFetchingHunches = true;
      });
      it('renders loading message', () => {
        expect(hunchPage().find('.hunch-page__hunches-loading').length).toBe(1);
      });
    });

    describe('when `hunches` is not available', () => {
      beforeEach(() => {
        props.hunches = undefined;
      });
      it('does not render `<HunchList />`', () => {
        expect(hunchPage().find('HunchList').length).toBe(0);
      });
      it('renders not-found message', () => {
        expect(hunchPage().find('.hunch-page__hunches-not-found').length).toBe(1);
      });
    });

    describe('when `hunches` is available', () => {
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
      });

      it('renders `<HunchList />`', () => {
        expect(hunchPage().find(HunchList).length).toBe(1);
      });
      describe('the rendered `<HunchList />`', () => {
        let HunchList;
        let selectedHunch;
        const e = {preventDefault: jest.fn()};

        beforeEach(() => {
          HunchList = hunchPage().find('HunchList');
          selectedHunch = props.hunches[0];
        });

        it('has `hunches` as its props', () => {
          expect(HunchList.props().hunches).toEqual(props.hunches);
        });

        it('`onEdit` event, calls `editHunch()` that dispatches `props.openHunchEditorModal()`', () => {
          HunchList.props().onEdit(e, selectedHunch);
          expect(HunchPage.prototype.editHunch).toBeCalledWith(e, selectedHunch);
          expect(props.openHunchEditorModal).toBeCalledWith(selectors.getEditor, selectedHunch);
        });

        it('`onDelete` event, calls `deleteHunch()` that dispatches `props.deleteHunch()`', () => {
          HunchList.props().onDelete(e, selectedHunch);
          expect(HunchPage.prototype.deleteHunch).toBeCalledWith(e, selectedHunch);
          expect(props.deleteHunch).toBeCalledWith(selectedHunch);
        });
      });
    });

    it('renders a `<HunchEditorModal />`', () => {
      expect(hunchPage().find(HunchEditorModal).length).toBe(1);
    });
  });

});
