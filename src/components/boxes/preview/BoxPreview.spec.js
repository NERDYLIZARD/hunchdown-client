/**
 * Created on 19-May-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { BoxPreview } from './BoxPreview';

describe('<BoxPreview />', () => {

  let props;
  let mountedBoxPreview;
  const renderBoxPreview = () => {
    if (!mountedBoxPreview) {
      mountedBoxPreview = shallow(
        <BoxPreview {...props}>
          <div className="child"/>
        </BoxPreview>
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
    };
    mountedBoxPreview = undefined;
  });

  it('always has `props` as `state`', () => {
    const boxPreview = renderBoxPreview();
    expect(boxPreview.state()).toEqual(props);
  });

  it('passes `state` as `value` of `Context.Provider` to ensure that ' +
    'the re-rendering of `Context.Consumer` is only due to state change (not due to the re-rendering of parent)', () => {
    const boxPreview = renderBoxPreview();
    expect(boxPreview.props().value).toEqual(boxPreview.state());
  });

  it('renders the `.box-preview` div', () => {
    const boxPreview = renderBoxPreview().find('.box-preview');
    expect(boxPreview.length).toBe(1);
  });

  it('renders the `children` props', () => {
    const child = renderBoxPreview().find('.child');
    expect(child.length).toBe(1);
  });

});
