/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { BoxPreview } from './BoxPreview';
import { BoxPreviewHeader } from './BoxPreviewHeader';
import { BoxPreviewBody } from './BoxPreviewBody';

describe('<BoxPreview />', () => {

  jest.spyOn(BoxPreview.prototype, 'navigateToBoxDetail');

  let props;
  let mountedBoxPreview;
  const renderBoxPreview = () => {
    if (!mountedBoxPreview) {
      mountedBoxPreview = shallow(
        <BoxPreview {...props} />
      );
    }
    return mountedBoxPreview;
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
    mountedBoxPreview = undefined;
  });

  it('always renders a `div.box-preview` as wrapper', () => {
    const wrapperDiv = renderBoxPreview().find('.box-preview');
    expect(wrapperDiv.length).toBe(1);
  });

  it('renders `<BoxPreviewHeader />`', () => {
    expect(renderBoxPreview().find(BoxPreviewHeader).length).toBe(1);
  });
  describe('the rendered `<BoxPreviewHeader />`', () => {
    it('has `box` passed to `box` props', () => {
      const boxPreviewHeader = renderBoxPreview().find(BoxPreviewHeader);
      expect(boxPreviewHeader.props().box).toEqual(props.box);
    });
    it('has `onEdit` passed to `onEdit` props', () => {
      const boxPreviewHeader = renderBoxPreview().find(BoxPreviewHeader);
      expect(boxPreviewHeader.props().onEdit).toEqual(props.onEdit);
    });
    it('has `onDelete` passed to `onDelete` props', () => {
      const boxPreviewHeader = renderBoxPreview().find(BoxPreviewHeader);
      expect(boxPreviewHeader.props().onDelete).toEqual(props.onDelete);
    });
  });

  it('renders `<BoxPreviewBody />`', () => {
    expect(renderBoxPreview().find(BoxPreviewBody).length).toBe(1);
  });
  describe('the rendered `<BoxPreviewBody />`', () => {
    it('has `box` passed to `box` props', () => {
      const boxPreviewBody = renderBoxPreview().find(BoxPreviewBody);
      expect(boxPreviewBody.props().box).toEqual(props.box);
    });
    it('has `navigateToBoxDetail` passed to `onClick` props', () => {
      const boxPreviewBody = renderBoxPreview().find(BoxPreviewBody);
      boxPreviewBody.simulate('click');
      expect(BoxPreview.prototype.navigateToBoxDetail).toBeCalled();
    });
  });

});
