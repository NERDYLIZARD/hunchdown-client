/**
 * Created on 19-May-18.
 */
import React from 'react';
import { mount } from 'enzyme';
import BoxItem from './BoxItem';
import { generateBox } from '../../../utils/test/mockDataFactory';

describe('<BoxItem />', () => {
  let props;
  let mountedBoxItem;
  const boxItem = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedBoxItem) {
      mountedBoxItem = mount(
        <BoxItem {...props} />
      );
    }
    return mountedBoxItem;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      onDelete: jest.fn(),
      box: generateBox(),
    };
    mountedBoxItem = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = boxItem().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('calls `onDelete()` when `delete` link is clicked', () => {
    const deleteButton = boxItem().find('.box-delete-button');
    deleteButton.simulate('click');
    // call onDelete with props.box as its second argument
    expect(props.onDelete).toBeCalledWith(expect.anything(), props.box);
  });

  it('renders `<p class="box-title">` with `box.title` as its children', () => {
    const title = boxItem().find('.box-title');
    expect(title.props().children).toBe(props.box.title);
  });

  describe('when `box.description` is defined', () => {

    // box.description is defined from generateBox() in top-level beforeEach()
    it('renders a `<p class="box-description">`', () => {
      expect(boxItem().find('.box-description').length).toBe(1);
    });

    it('passes `box.description` to the rendered `<p class="box-description">`', () => {
      const description = boxItem().find('.box-description');
      expect(description.props().children).toContain(props.box.description);
    });
  });

  describe('when `box.description` is undefined', () => {

    beforeEach(() => {
      props.box.description = null;
    });

    it('does not render a `<p class="box-description">`', () => {
      expect(boxItem().find('.box-description').length).toBe(0);
    });
  });

});
