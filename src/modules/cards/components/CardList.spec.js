/**
 * Created on 19-May-18.
 */
import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import CardList from './CardList';
import mockDataFactory from '../../../utils/test/mockDataFactory';

describe('<CardList />', () => {
  let props;
  let mountedCardList;
  const cardList = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedCardList) {
      mountedCardList = mount(
        <CardList {...props} />
      );
    }
    return mountedCardList;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      onEdit: jest.fn(),
      onDelete: jest.fn(),
      cards: _.mapKeys([
        mockDataFactory.createCard(),
        mockDataFactory.createCard(),
      ], 'slug'),
    };
    mountedCardList = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = cardList().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  describe('the rendered div', () => {
    it('contains everything else that gets rendered', () => {
      const divs = cardList().find('div');
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(cardList().children().children());
    });
  });


  it('always renders `<CardItem />`s for all cards passed in as its props', () => {
    const CardItems = cardList().find('CardItem');
    const numberOfCards = Object.keys(props.cards).length;
    expect(CardItems.length).toBe(numberOfCards);
  });

});
