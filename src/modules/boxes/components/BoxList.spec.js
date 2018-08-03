/**
 * Created on 03-Aug-18.
 */
import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import BoxList from './BoxList';
import { generateBox } from '../../../utils/test/mockDataFactory';

describe('<BoxList />', () => {
  let props;
  let mountedBoxList;
  const boxList = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedBoxList) {
      mountedBoxList = mount(
        <BoxList {...props} />
      );
    }
    return mountedBoxList;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      onDelete: jest.fn(),
      boxes: _.mapKeys([
        generateBox(),
        generateBox(),
      ], 'slug'),
    };
    mountedBoxList = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = boxList().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('always renders `<BoxItem />`s for all boxes passed in as its props', () => {
    const BoxItems = boxList().find('BoxItem');
    const numberOfBoxes = Object.keys(props.boxes).length;
    expect(BoxItems.length).toBe(numberOfBoxes);
  });

});
