/**
 * Created on 07-Apr-18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import ConnectedCardPage, { CardPage } from './CardPage';
import initialState from '../../constants/initialState';
import configureMockStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


describe("<CardPage />", () => {
  const actions = {
    loadCards: jest.fn(),
  };

  it('should contain h1 with "Cards" as its value', () => {
    const wrapper = shallow(
      <CardPage
        actions={actions}
        cards={initialState.cards}
      />
    );
    expect(wrapper.find('h1').text()).toBe('Cards');
  });

  it('should call loadCards()', () => {
    shallow(
      <CardPage
        actions={actions}
        cards={initialState.cards}
      />
    );
    expect(actions.loadCards).toHaveBeenCalled();
  });

  it("should match snapshot", () => {
    const middlewares = [thunk];

    const store = configureMockStore(middlewares)(initialState);
    const component = create(
      <Provider store={store}>
        <ConnectedCardPage/>
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

