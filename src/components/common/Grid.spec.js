/**
 * Created on 18-Oct-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import Grid from './Grid';

describe('<Grid />', () => {
  let props;
  let mountedGrid;
  const renderGrid = () => {
    if (!mountedGrid) {
      mountedGrid = shallow(
        <Grid {...props} />
      );
    }
    return mountedGrid;
  };

  beforeEach(() => {
    props = {
      items: [{
        id: 'id#1',
      }, {
        id: 'id#2',
      }],
      render: jest.fn(),
      className: undefined,
    };
    mountedGrid = undefined;
  });

  describe('when `className` is undefined', () => {
    beforeEach(() => {
      props.className = undefined;
    });
    it('renders wrapper with `className="grid"`', () => {
      expect(renderGrid().find('div').first().hasClass('grid')).toBe(true);
    });
  });

  describe('when `className` is defined', () => {
    beforeEach(() => {
      props.className = 'class-argument';
    });
    it('renders wrapper with appended `className`', () => {
      expect(renderGrid().find('div').first().hasClass('grid class-argument')).toBe(true);
    });
  });

  it('calls `render` for all `items`', () => {
    renderGrid();
    expect(props.render.mock.calls).toEqual([
      [props.items[0]],
      [props.items[1]],
    ]);
  });

});
