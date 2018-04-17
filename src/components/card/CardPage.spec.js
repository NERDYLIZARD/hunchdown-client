/**
 * Created on 07-Apr-18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import ConnectedCardPage, { CardPage } from './CardPage';
import initialState from '../../constants/initialState';
import configureMockStore from 'redux-mock-store';
import { ConnectedRouter } from 'react-router-redux';
import {history} from "../app/configureStore";
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


describe("<CardPage />", () => {
  const actions = {
    loadCards: jest.fn(),
  };

  function setup() {
    const props = {
      cards: initialState.cards,
      actions: actions,
    };
    return shallow(<CardPage {...props} />)
  }

  it('should contain h1 with "Cards" as its value', () => {
    const wrapper = setup();
    expect(wrapper.find('h1').text()).toBe('Cards');
  });

  it('should call loadCards()', () => {
    setup();
    expect(actions.loadCards).toBeCalled();
  });

  it("should match snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)(initialState);

    const component = create(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedCardPage/>
        </ConnectedRouter>
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

