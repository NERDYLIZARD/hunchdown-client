/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import HunchList from './HunchList';
import HunchItem from './HunchItem';

describe('<HunchList />', () => {
  let props;
  let mountedHunchList;
  const hunchList = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedHunchList) {
      mountedHunchList = shallow(
        <HunchList {...props} />
      );
    }
    return mountedHunchList;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      onEdit: jest.fn(),
      onDelete: jest.fn(),
      hunches: [{
        id: 'id#1',
        wisdom: 'A Wisdom',
        attribute: 'A Attribute'
      }, {
        id: 'id#2',
        wisdom: 'A Wisdom',
        attribute: 'A Attribute'
      }]
    };
    mountedHunchList = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = hunchList().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('renders `<HunchItem />`s for all boxes passed in as its props as well as setting `onEdit` and `onDelete` for each `<HunchItem/>', () => {
    const HunchItems = hunchList().find(HunchItem);
    expect(HunchItems.length).toBe(props.hunches.length);
    HunchItems.forEach(HunchItem => {
      expect(HunchItem.props().onDelete).toBe(props.onDelete);
      expect(HunchItem.props().onEdit).toBe(props.onEdit);
    })
  });

});
