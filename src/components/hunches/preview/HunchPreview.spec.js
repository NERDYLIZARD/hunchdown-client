/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { HunchPreview } from './HunchPreview';

describe('<HunchPreview />', () => {

  let props;
  let mountedHunchPreview;
  const renderHunchPreview = () => {
    if (!mountedHunchPreview) {
      mountedHunchPreview = shallow(
        <HunchPreview {...props}>
          <div className="child"/>
        </HunchPreview>
      );
    }
    return mountedHunchPreview;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      hunch: {
        id: 'id#1',
        wisdom: 'A Wisdom',
        attribute: 'An Aattribute'
      },
    };
    mountedHunchPreview = undefined;
  });

  it('always has `props` as `state`', () => {
    const hunchPreview = renderHunchPreview();
    expect(hunchPreview.state()).toEqual(props);
  });

  it('passes `state` as `value` of `Context.Provider` to ensure that ' +
    'the re-rendering of `Context.Consumer` is only due to state change (not due to the re-rendering of parent)', () => {
    const hunchPreview = renderHunchPreview();
    expect(hunchPreview.props().value).toEqual(hunchPreview.state());
  });

  it('renders the `.hunch-preview` div', () => {
    const hunchPreview = renderHunchPreview().find('.hunch-preview');
    expect(hunchPreview.length).toBe(1);
  });

  it('renders the `children` props', () => {
    const child = renderHunchPreview().find('.child');
    expect(child.length).toBe(1);
  });

});
