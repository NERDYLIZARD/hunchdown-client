/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import HunchItem from './HunchItem';

describe('<HunchItem />', () => {
  let props;
  let mountedHunchItem;
  const hunchItem = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedHunchItem) {
      mountedHunchItem = shallow(
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
      hunch: {
        id: 'id#1',
        wisdom: 'A Wisdom',
      },
    };
    mountedHunchItem = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = hunchItem().find('.hunch-item');
    expect(divs.length).toBe(1);
  });

  it('calls `onEdit()` when edit link is clicked', () => {
    const editButton = hunchItem().find('.hunch-edit-button');
    const e = {preventDefault: jest.fn()};
    editButton.simulate('click', e);
    expect(props.onEdit).toBeCalledWith(e, props.hunch);
  });

  it('calls `onDelete()` when `delete` link is clicked', () => {
    const deleteButton = hunchItem().find('.hunch-delete-button');
    const e = {preventDefault: jest.fn()};
    deleteButton.simulate('click', e);
    expect(props.onDelete).toBeCalledWith(e, props.hunch);
  });

  it('renders `<p class="hunch-wisdom">` with `hunch.wisdom` as its children', () => {
    const wisdom = hunchItem().find('.hunch-wisdom');
    expect(wisdom.props().children).toBe(props.hunch.wisdom);
  });

  describe('when `hunch.attribute` is defined', () => {
    beforeEach(() => {
      props.hunch.attribute = 'An Attribute';
    });
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
      props.hunch.attribute = undefined;
    });
    it('does not render a `<p class="hunch-attribute">`', () => {
      expect(hunchItem().find('.hunch-attribute').length).toBe(0);
    });
  });

});
