/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { BoxItem } from './BoxItem';

describe('<BoxItem />', () => {
  let props;
  let mountedBoxItem;
  const boxItem = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedBoxItem) {
      mountedBoxItem = shallow(
        <BoxItem {...props} />
      );
    }
    return mountedBoxItem;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      box: {
        id: 'id#1',
        title: 'A Title',
        description: 'A Description'
      },
      onDelete: jest.fn(),
      onEdit: jest.fn(),
      history: {
        push: jest.fn()
      },
    };
    mountedBoxItem = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = boxItem().find('.box-item');
    expect(divs.length).toBe(1);
  });

  it('calls `onEdit()` with the clicked box when `edit` link is clicked', () => {
    const deleteButton = boxItem().find('.box-edit-button');
    deleteButton.simulate('click');
    // call onEdit with props.box as its second argument
    expect(props.onEdit).toBeCalledWith(undefined, props.box);
  });

  it('calls `onDelete()` with the clicked box when `delete` link is clicked', () => {
    const deleteButton = boxItem().find('.box-delete-button');
    deleteButton.simulate('click');
    // call onDelete with props.box as its second argument
    expect(props.onDelete).toBeCalledWith(undefined, props.box);
  });

  it('renders `<p class="box-title">` with `box.title` as its children', () => {
    const title = boxItem().find('.box-title');
    expect(title.props().children).toBe(props.box.title);
  });

  describe('when `box.description` is defined', () => {

    beforeEach(() => {
      props.box.description = 'A Description';
    });

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
      props.box.description = undefined;
    });

    it('does not render a `<p class="box-description">`', () => {
      expect(boxItem().find('.box-description').length).toBe(0);
    });
  });

});
