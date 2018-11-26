/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { HunchPreviewHeader } from './HunchPreviewHeader';

describe('<HunchPreviewHeader />', () => {
  let props;
  let mountedHunchPreviewHeader;
  const renderHunchPreviewHeader = () => {
    if (!mountedHunchPreviewHeader) {
      mountedHunchPreviewHeader = shallow(
        <HunchPreviewHeader {...props} />
      );
    }
    return mountedHunchPreviewHeader;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      hunch: {
        id: 'id#1',
        wisdom: 'A Wisdom',
        attribute: 'An Attribute'
      },
      onDelete: jest.fn(),
      onEdit: jest.fn(),
    };
    mountedHunchPreviewHeader = undefined;
  });

  it('always renders a div as wrapper', () => {
    const divs = renderHunchPreviewHeader().find('.hunch-preview__header');
    expect(divs.length).toBe(1);
  });

  it('calls `onEdit()` with the clicked hunch when `edit` link is clicked', () => {
    const editButton = renderHunchPreviewHeader().find('.hunch-preview__header__edit-button');
    editButton.simulate('click');
    expect(props.onEdit).toBeCalledWith(props.hunch);
  });

  it('calls `onDelete()` with the clicked hunch when `delete` link is clicked', () => {
    const deleteButton = renderHunchPreviewHeader().find('.hunch-preview__header__delete-button');
    deleteButton.simulate('click');
    expect(props.onDelete).toBeCalledWith(props.hunch);
  });

});
