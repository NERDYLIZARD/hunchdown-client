/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { BoxPreview } from './BoxPreview';
import { BoxPreviewHeader } from './BoxPreviewHeader';
import { BoxPreviewBody } from './BoxPreviewBody';

describe('<BoxPreview />', () => {

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
      onBodyClick: jest.fn(),
      onDelete: jest.fn(),
      onEdit: jest.fn(),
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
    it('has `onBodyClick` passed to `onClick` props', () => {
      const boxPreviewBody = renderBoxPreview().find(BoxPreviewBody);
      expect(boxPreviewBody.props().onClick).toEqual(props.onBodyClick);
    });
  });

});
