/**
 * Created on 03-Aug-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import BoxList from './BoxList';
import BoxItem from './BoxItem';

describe('<BoxList />', () => {
  let props;
  let mountedBoxList;
  const boxList = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedBoxList) {
      mountedBoxList = shallow(
        <BoxList {...props} />
      );
    }
    return mountedBoxList;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      onEdit: jest.fn(),
      onDelete: jest.fn(),
      boxes: [{
        id: 'id#1',
        title: 'A Title',
        description: 'A Description'
      }, {
        id: 'id#2',
        title: 'A Title',
        description: 'A Description'
      }]
    };
    mountedBoxList = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = boxList().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('renders `<BoxItem />`s for all boxes passed in as its props as well as setting `onEdit` and `onDelete` for each `<BoxItem/>', () => {
    const BoxItems = boxList().find(BoxItem);
    const numberOfBoxes = props.boxes.length;
    expect(BoxItems.length).toBe(numberOfBoxes);
    BoxItems.forEach(BoxItem => {
      expect(BoxItem.props().onDelete).toBe(props.onDelete);
      expect(BoxItem.props().onEdit).toBe(props.onEdit);
    })
  });

});
