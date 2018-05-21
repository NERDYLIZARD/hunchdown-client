/**
 * Created on 19-May-18.
 */
import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import { CardPage } from './CardPage';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import initialState from '../../../initialState';
import mockDataFactory from '../../../utils/test/mockDataFactory';


describe('<CardPage />', () => {

  jest.spyOn(CardPage.prototype, 'createCard');
  jest.spyOn(CardPage.prototype, 'componentDidMount');

  let props;
  let mountedCardPage;

  const cardPage = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedCardPage) {
      const store = configureMockStore()(initialState);
      mountedCardPage = mount(
        <Provider store={store}>
          <CardPage {...props} />
        </Provider>
      );
    }
    return mountedCardPage;
  };


  // reset props before running a new test
  beforeEach(() => {
    props = {
      loadCards: jest.fn(),
      deleteCard: jest.fn(),
      openCardEditorModal: jest.fn(),
      cards: undefined,
    };
    mountedCardPage = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = cardPage().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('calls `loadCards()` on `ComponentDidMount()`', () => {
    cardPage();
    expect(CardPage.prototype.componentDidMount).toBeCalled();
    expect(props.loadCards).toBeCalled();
  });

  it('always renders the `New Card` button', () => {
    const createCardButton = cardPage().find('.create-card-button');
    expect(createCardButton.length).toBe(1);
  });

  describe('when the `New Card` button is clicked`', () => {
    it('dispatches `openCardEditorModal()` action creator in `createCard()` method', () => {
      const createCardButton = cardPage().find('.create-card-button');
      createCardButton.simulate('click');
      expect(CardPage.prototype.createCard).toBeCalled();
      expect(props.openCardEditorModal).toBeCalled();
    });
  });

  describe('when `cards` is passed', () => {
    beforeEach(() => {
      props.cards = _.mapKeys([
        mockDataFactory.createCard(),
        mockDataFactory.createCard(),
      ], 'slug');
    });
    it('renders `<CardList />`', () => {
      expect(cardPage().find('CardList').length).toBe(1);
    });
    it('passes `cards` as `cards` property of `<CardList />`', () => {
      const CardPage = cardPage().find('CardList');
      expect(CardPage.props().cards).toEqual(props.cards);
    });
  });

  describe('when `cards` is not passed', () => {
    beforeEach(() => {
      props.cards = undefined;
    });
    it('does not render `<CardList />`', () => {
      expect(cardPage().find('CardList').length).toBe(0);
    });
  });

  it('always renders a `<CardEditorModal />`', () => {
    expect(cardPage().find('CardEditorModal').length).toBe(1);
  });

});
