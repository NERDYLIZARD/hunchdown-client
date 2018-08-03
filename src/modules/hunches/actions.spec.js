/**
 * Created on 06-Apr-18.
 */
import _ from 'lodash';
import * as hunchActions from './actions';
import * as types from './actionTypes';
import { generateHunch } from '../../utils/test/mockDataFactory';


describe('Hunch Actions', () => {
  /**
   * Load Hunches
   */
  describe('loadHunches', () => {
    it(`creates an action typed ${types.LOAD_HUNCHES} with no payload`, () => {
      const expectedAction = {
        type: types.LOAD_HUNCHES,
      };
      expect(hunchActions.loadHunches()).toEqual(expectedAction);
    });
  });
  describe('loadHunchesSuccess', () => {
    it(`creates an action typed ${types.LOAD_HUNCHES_SUCCESS} and having 'hunches' as a payload`, () => {
      const hunches = [
        generateHunch(),
        generateHunch()
      ];
      const expectedAction = {
        type: types.LOAD_HUNCHES_SUCCESS,
        hunches
      };
      expect(hunchActions.loadHunchesSuccess(hunches)).toEqual(expectedAction);
    });
  });


  /**
   * Load Hunch
   */
  describe('loadHunch', () => {
    it(`creates an action typed ${types.LOAD_HUNCH} with no payload`, () => {
      const expectedAction = {
        type: types.LOAD_HUNCH,
      };
      expect(hunchActions.loadHunch()).toEqual(expectedAction);
    });
  });
  describe('loadHunchSuccess', () => {
    it(`creates an action typed ${types.LOAD_HUNCH_SUCCESS} and having a 'hunch' as a payload`, () => {
      const hunch = generateHunch();
      const expectedAction = {
        type: types.LOAD_HUNCH_SUCCESS,
        hunch
      };
      expect(hunchActions.loadHunchSuccess(hunch)).toEqual(expectedAction);
    });
  });


  /**
   * Create Hunch
   */
  describe('createHunch', () => {
    it(`creates an action typed ${types.CREATE_HUNCH} with a 'hunch' as a payload`, () => {
      const hunch = _.omit(generateHunch(), 'slug');
      const expectedAction = {
        type: types.CREATE_HUNCH,
        hunch
      };
      expect(hunchActions.createHunch(hunch)).toEqual(expectedAction);
    });
  });
  describe('createHunchSuccess', () => {
    it(`creates an action typed ${types.CREATE_HUNCH_SUCCESS} and having a 'hunch' as a payload`, () => {
      const hunch = _.omit(generateHunch(), 'slug');
      const expectedAction = {
        type: types.CREATE_HUNCH_SUCCESS,
        hunch
      };
      expect(hunchActions.createHunchSuccess(hunch)).toEqual(expectedAction);
    });
  });


  /**
   * Update Hunch
   */
  describe('updateHunch', () => {
    it(`creates an action typed ${types.UPDATE_HUNCH} with a 'hunch' as a payload`, () => {
      const hunch = generateHunch();
      const expectedAction = {
        type: types.UPDATE_HUNCH,
        hunch
      };
      expect(hunchActions.updateHunch(hunch)).toEqual(expectedAction);
    });
  });
  describe('updateHunchSuccess', () => {
    it(`creates an action typed ${types.UPDATE_HUNCH_SUCCESS} and having a 'hunch' as a payload`, () => {
      const hunch = generateHunch();
      const expectedAction = {
        type: types.UPDATE_HUNCH_SUCCESS,
        hunch
      };
      expect(hunchActions.updateHunchSuccess(hunch)).toEqual(expectedAction);
    });
  });

  /**
   * Delete Hunch
   */
  describe('deleteHunch', () => {
    it(`creates an action typed ${types.DELETE_HUNCH} with a 'hunch' as a payload`, () => {
      const hunch = generateHunch();
      const expectedAction = {
        type: types.DELETE_HUNCH,
        hunch
      };
      expect(hunchActions.deleteHunch(hunch)).toEqual(expectedAction);
    });
  });
  describe('deleteHunchSuccess', () => {
    it(`creates an action typed ${types.DELETE_HUNCH_SUCCESS} and having a 'hunch' as a payload`, () => {
      const hunch = generateHunch();
      const expectedAction = {
        type: types.DELETE_HUNCH_SUCCESS,
        hunch
      };
      expect(hunchActions.deleteHunchSuccess(hunch)).toEqual(expectedAction);
    });
  });


  describe('openHunchEditorModal', () => {
    it(`creates an action typed ${types.EDIT_HUNCH} with 'editing.modelOpen = true' and the being edited 'hunch' as a payload`, () => {
      const hunch = generateHunch();
      const editing = {
        modalOpen: true,
        hunch
      };
      const expectedAction = {
        type: types.EDIT_HUNCH,
        editing
      };
      expect(hunchActions.openHunchEditorModal(hunch)).toEqual(expectedAction);
    });
  });

  describe('closeHunchEditorModal', () => {
    it(`creates an action typed ${types.EDIT_HUNCH} with 'editing.modelOpen = false' as a payload`, () => {
      const editing = {
        modalOpen: false,
      };
      const expectedAction = {
        type: types.EDIT_HUNCH,
        editing
      };
      expect(hunchActions.closeHunchEditorModal()).toEqual(expectedAction);
    });
  });

});
