/**
 * Created on 19-May-18.
 */
import React from 'react';
import { mount } from 'enzyme';
import HunchItem from './HunchItem';
import mockDataFactory from '../../../utils/test/mockDataFactory';

describe('<HunchItem />', () => {
  let props;
  let mountedHunchItem;
  const hunchItem = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedHunchItem) {
      mountedHunchItem = mount(
        <HunchItem {...props} />
      );
    }
    return mountedHunchItem;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      onEdit: jest.fn(),
      onDelete: jest.fn(),
      hunch: mockDataFactory.createHunch(),
    };
    mountedHunchItem = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = hunchItem().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('the rendered div', () => {
    it('contains everything else that gets rendered', () => {
      const divs = hunchItem().find('div');
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // hunchItem().children === outermost div
      expect(wrappingDiv.children()).toEqual(hunchItem().children().children());
    });
  });

  it('calls `onEdit()` when edit link is clicked', () => {
    const editButton = hunchItem().find('.hunch-edit-button');
    editButton.simulate('click');
    // call onEdit with props.hunch as its second argument
    expect(props.onEdit).toBeCalledWith(expect.anything(), props.hunch);
  });

  it('calls `onDelete()` when edit link is clicked', () => {
    const deleteButton = hunchItem().find('.hunch-delete-button');
    deleteButton.simulate('click');
    // call onDelete with props.hunch as its second argument
    expect(props.onDelete).toBeCalledWith(expect.anything(), props.hunch);
  });

  it('renders `<p class="hunch-wisdom">` with `hunch.wisdom` as its children', () => {
    const wisdom = hunchItem().find('.hunch-wisdom');
    expect(wisdom.props().children).toBe(props.hunch.wisdom);
  });

  describe('when `hunch.attribute` is defined', () => {

    // hunch.attribute is defined from mockDataFactory.createHunch() in top-level beforeEach()
    it('renders a `<p class="hunch-attribute">`', () => {
      expect(hunchItem().find('.hunch-attribute').length).toBe(1);
    });

    it('passes `hunch.attribute` to the rendered `<p class="hunch-attribute">`', () => {
      const attribute = hunchItem().find('.hunch-attribute');
      expect(attribute.props().children).toContain(props.hunch.attribute);
    });
  });

  describe('when `hunch.attribute` is undefined', () => {

    beforeEach(() => {
      props.hunch.attribute = null;
    });

    it('does not render a `<p class="hunch-attribute">`', () => {
      expect(hunchItem().find('.hunch-attribute').length).toBe(0);
    });
  });

});
