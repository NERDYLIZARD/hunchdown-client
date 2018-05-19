/**
 * Created on 19-May-18.
 */
import React from 'react';
import { mount } from 'enzyme';
import CardItem from './CardItem';
import mockDataFactory from '../../../utils/test/mockDataFactory';

describe('<CardItem />', () => {
  let props;
  let mountedCardItem;
  const cardItem = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedCardItem) {
      mountedCardItem = mount(
        <CardItem {...props} />
      );
    }
    return mountedCardItem;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      onEdit: jest.fn(),
      onDelete: jest.fn(),
      card: mockDataFactory.createCard(),
    };
    mountedCardItem = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = cardItem().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('the rendered div', () => {
    it('contains everything else that gets rendered', () => {
      const divs = cardItem().find('div');
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      expect(wrappingDiv).toEqual(cardItem().children());
    });
  });

  it('calls `onEdit()` when edit link is clicked', () => {
    const editButton = cardItem().find('.card-edit-button');
    editButton.simulate('click');
    // call onEdit with props.card as its second argument
    expect(props.onEdit).toBeCalledWith(expect.anything(), props.card);
  });

  it('calls `onDelete()` when edit link is clicked', () => {
    const deleteButton = cardItem().find('.card-delete-button');
    deleteButton.simulate('click');
    // call onDelete with props.card as its second argument
    expect(props.onDelete).toBeCalledWith(expect.anything(), props.card);
  });

  it('renders `<p class="card-wisdom">` with `card.wisdom` as its children', () => {
    const wisdom = cardItem().find('.card-wisdom');
    expect(wisdom.props().children).toBe(props.card.wisdom);
  });

  describe('when `card.attribute` is defined', () => {

    // card.attribute is defined from mockDataFactory.createCard() in top-level beforeEach()
    it('renders a `<p class="card-attribute">`', () => {
      expect(cardItem().find('.card-attribute').length).toBe(1);
    });

    it('passes `card.attribute` to the rendered `<p class="card-attribute">`', () => {
      const attribute = cardItem().find('.card-attribute');
      expect(attribute.props().children).toContain(props.card.attribute);
    });
  });

  describe('when `card.attribute` is undefined', () => {

    beforeEach(() => {
      props.card.attribute = null;
    });

    it('does not render a `<p class="card-attribute">`', () => {
      expect(cardItem().find('.card-attribute').length).toBe(0);
    });
  });

});
