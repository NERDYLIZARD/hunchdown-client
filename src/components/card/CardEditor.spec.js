/**
 * Created on 12-Apr-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { CardEditor } from "./CardEditor";
import CardForm from './CardForm';
import { history } from '../app/configureStore';
import { ConnectedRouter } from 'react-router-redux';


describe("<CardEdior />", () => {
  const actions = {
    saveCard: jest.fn(),
  };

  it('contains CardForm', () => {
    const wrapper = shallow(
      <ConnectedRouter history={history}>
        <CardEditor
          actions={actions}
        />
      </ConnectedRouter>
    );
    expect(wrapper.find(CardForm).length).toBe(1);
  });

});


// describe("<CardEdior />", () => {
//   it('placeholder', () => {
//
//   });
// });
