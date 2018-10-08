/**
 * Created on 03-Aug-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
/* eslint-disable import/no-named-as-default */
import BoxList from './BoxList';
import BoxPreview from './preview/BoxPreview';

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

  it('renders `<BoxPreview />`s for all boxes passed in as its props as well as setting `onEdit` and `onDelete` for each `<BoxPreview/>', () => {
    const BoxItems = boxList().find(BoxPreview);
    expect(BoxItems.length).toBe(props.boxes.length);
    BoxItems.forEach(BoxPreview => {
      expect(BoxPreview.props().onDelete).toBe(props.onDelete);
      expect(BoxPreview.props().onEdit).toBe(props.onEdit);
    })
  });

});
