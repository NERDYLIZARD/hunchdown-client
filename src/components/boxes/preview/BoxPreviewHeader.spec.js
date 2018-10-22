/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { BoxPreviewHeader } from './BoxPreviewHeader';

describe('<BoxPreviewHeader />', () => {
  let props;
  let mountedBoxPreviewHeader;
  const renderBoxPreviewHeader = () => {
    if (!mountedBoxPreviewHeader) {
      mountedBoxPreviewHeader = shallow(
        <BoxPreviewHeader {...props} />
      );
    }
    return mountedBoxPreviewHeader;
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
    };
    mountedBoxPreviewHeader = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = renderBoxPreviewHeader().find('.box-preview__header');
    expect(divs.length).toBe(1);
  });

  it('calls `onEdit()` with the clicked box when `edit` link is clicked', () => {
    const deleteButton = renderBoxPreviewHeader().find('.box-preview__header__edit-button');
    deleteButton.simulate('click');
    // call onEdit with props.box as its second argument
    expect(props.onEdit).toBeCalledWith(undefined, props.box);
  });

  it('calls `onDelete()` with the clicked box when `delete` link is clicked', () => {
    const deleteButton = renderBoxPreviewHeader().find('.box-preview__header__delete-button');
    deleteButton.simulate('click');
    // call onDelete with props.box as its second argument
    expect(props.onDelete).toBeCalledWith(undefined, props.box);
  });

});
