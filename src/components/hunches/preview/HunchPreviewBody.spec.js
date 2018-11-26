/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { HunchPreviewBody } from './HunchPreviewBody';

describe('<HunchPreviewBody />', () => {
  let props;
  let mountedHunchPreviewBody;
  const renderHunchPreviewBody = () => {
    if (!mountedHunchPreviewBody) {
      mountedHunchPreviewBody = shallow(
        <HunchPreviewBody {...props} />
      );
    }
    return mountedHunchPreviewBody;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      hunch: {
        id: 'id#1',
        wisdom: 'A Wisdom',
        attribute: 'An Attribute'
      },
    };
    mountedHunchPreviewBody = undefined;
  });

  it('always renders a `div.hunch-preview__body` as wrapper', () => {
    const wrapperDiv = renderHunchPreviewBody().find('.hunch-preview__body');
    expect(wrapperDiv.length).toBe(1);
  });

  it('renders `<p class=".hunch-preview__body__wisdom">` with `hunch.wisdom` as its children', () => {
    const wisdom = renderHunchPreviewBody().find('.hunch-preview__body__wisdom');
    expect(wisdom.props().children).toBe(props.hunch.wisdom);
  });

  describe('when `hunch.attribute` is defined', () => {
    beforeEach(() => {
      props.hunch.attribute = 'A Description';
    });

    it('renders a `<p class="hunch-preview__body__attribute">`', () => {
      expect(renderHunchPreviewBody().find('.hunch-preview__body__attribute').length).toBe(1);
    });

    it('passes `hunch.attribute` to the rendered `<p class="hunch-preview__body__attribute">`', () => {
      const attribute = renderHunchPreviewBody().find('.hunch-preview__body__attribute');
      expect(attribute.props().children).toContain(props.hunch.attribute);
    });
  });

  describe('when `hunch.attribute` is undefined', () => {
    beforeEach(() => {
      props.hunch.attribute = undefined;
    });

    it('does not render a `<p class="hunch-preview__body__attribute">`', () => {
      expect(renderHunchPreviewBody().find('.hunch-preview__body__attribute').length).toBe(0);
    });
  });

});
