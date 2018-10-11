import * as action from './modal';
import * as types from './types/modal';

/**
 * Created on 10-Oct-18.
 */
describe('Modal Actions', () => {

  describe('showModal', () => {
    it(`creates an action typed ${types.SHOW_MODAL} with 'modalType' and 'modalProps'`, () => {
      const expectedAction = {
        type: types.SHOW_MODAL,
        modalType: 'FOO_MODAL',
        modalProps: {
          hunchId: 'id#1'
        },
      };
      expect(action.showModal('FOO_MODAL', {hunchId: 'id#1'})).toEqual(expectedAction);
    });
  });

  describe('hideModal', () => {
    it(`creates an action typed ${types.HIDE_MODAL}`, () => {
      const expectedAction = {
        type: types.HIDE_MODAL,
      };
      expect(action.hideModal()).toEqual(expectedAction);
    });
  });

});
