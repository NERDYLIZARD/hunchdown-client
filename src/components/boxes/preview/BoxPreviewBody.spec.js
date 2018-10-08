/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { BoxPreviewBody } from './BoxPreviewBody';

describe('<BoxPreviewBody />', () => {
  let props;
  let mountedBoxPreviewBody;
  const boxPreviewBody = () => {
    if (!mountedBoxPreviewBody) {
      mountedBoxPreviewBody = shallow(
        <BoxPreviewBody {...props} />
      );
    }
    return mountedBoxPreviewBody;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      box: {
        id: 'id#1',
        title: 'A Title',
        description: 'A Description'
      },
      onClick: jest.fn(),
    };
    mountedBoxPreviewBody = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = boxPreviewBody().find('.box-preview__body');
    expect(divs.length).toBe(1);
  });

  it('calls `onClick()` when the box is clicked', () => {
    boxPreviewBody().simulate('click');
    expect(props.onClick).toBeCalled();
  });

  it('renders `<p class=".box-preview__body__title">` with `box.title` as its children', () => {
    const title = boxPreviewBody().find('.box-preview__body__title');
    expect(title.props().children).toBe(props.box.title);
  });

  describe('when `box.description` is defined', () => {

    beforeEach(() => {
      props.box.description = 'A Description';
    });

    it('renders a `<p class="box-preview__body__description">`', () => {
      expect(boxPreviewBody().find('.box-preview__body__description').length).toBe(1);
    });

    it('passes `box.description` to the rendered `<p class="box-preview__body__description">`', () => {
      const description = boxPreviewBody().find('.box-preview__body__description');
      expect(description.props().children).toContain(props.box.description);
    });
  });

  describe('when `box.description` is undefined', () => {

    beforeEach(() => {
      props.box.description = undefined;
    });

    it('does not render a `<p class="box-preview__body__description">`', () => {
      expect(boxPreviewBody().find('.box-preview__body__description').length).toBe(0);
    });
  });

});
