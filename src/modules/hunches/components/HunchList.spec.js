/**
 * Created on 19-May-18.
 */
import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import HunchList from './HunchList';
import mockDataFactory from '../../../utils/test/mockDataFactory';

describe('<HunchList />', () => {
  let props;
  let mountedHunchList;
  const hunchList = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedHunchList) {
      mountedHunchList = mount(
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
      hunches: _.mapKeys([
        mockDataFactory.createHunch(),
        mockDataFactory.createHunch(),
      ], 'slug'),
    };
    mountedHunchList = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = hunchList().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  describe('the rendered div', () => {
    it('contains everything else that gets rendered', () => {
      const divs = hunchList().find('div');
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(hunchList().children().children());
    });
  });


  it('always renders `<HunchItem />`s for all hunches passed in as its props', () => {
    const HunchItems = hunchList().find('HunchItem');
    const numberOfHunches = Object.keys(props.hunches).length;
    expect(HunchItems.length).toBe(numberOfHunches);
  });

});
