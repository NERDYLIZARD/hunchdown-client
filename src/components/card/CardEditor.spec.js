/**
 * Created on 12-Apr-18.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { CardEditor } from "./CardEditor";
import CardForm from './CardForm';


describe("<CardEdior />", () => {
  const actions = {
    saveCard: jest.fn(),
  };

  it('contains CardForm', () => {
    const wrapper = shallow(
      <CardEditor
        actions={actions}
      />
    );
    expect(wrapper.find(CardForm).length).toBe(1);
  });

});
