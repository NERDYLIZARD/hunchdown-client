/**
 * Created on 06-Apr-18.
 */
import _ from 'lodash';
import * as hunchActions from './actions';
import * as types from './actionTypes';
import mockDataFactory from '../../utils/test/mockDataFactory';


describe('Hunch Actions', () => {

  /**
   * Load Hunches
   */
  describe('loadHunches', () => {
    it(`should creates an action typed ${types.LOAD_HUNCHES} with no payload`, () => {
      const expectedAction = {
        type: types.LOAD_HUNCHES,
      };
      expect(hunchActions.loadHunches()).toEqual(expectedAction);
    });
  });
  describe('loadHunchesSuccess', () => {
    it(`should creates an action typed ${types.LOAD_HUNCHES_SUCCESS} and having hunches[] as a payload`, () => {
      const hunches = [
        mockDataFactory.createHunch(),
        mockDataFactory.createHunch()
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
    it(`should creates an action typed ${types.LOAD_HUNCH} with no payload`, () => {
      const expectedAction = {
        type: types.LOAD_HUNCH,
      };
      expect(hunchActions.loadHunch()).toEqual(expectedAction);
    });
  });
  describe('loadHunchSuccess', () => {
    it(`should creates an action typed ${types.LOAD_HUNCH_SUCCESS} and having hunch as a payload`, () => {
      const hunch = mockDataFactory.createHunch();
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
    it(`should creates an action typed ${types.CREATE_HUNCH} with hunch as a payload`, () => {
      const hunch = _.omit(mockDataFactory.createHunch(), 'slug');
      const expectedAction = {
        type: types.CREATE_HUNCH,
        hunch
      };
      expect(hunchActions.createHunch(hunch)).toEqual(expectedAction);
    });
  });
  describe('createHunchSuccess', () => {
    it(`should creates an action typed ${types.CREATE_HUNCH_SUCCESS} and having hunch as a payload`, () => {
      const hunch = _.omit(mockDataFactory.createHunch(), 'slug');
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
    it(`should creates an action typed ${types.UPDATE_HUNCH} with hunch as a payload`, () => {
      const hunch = mockDataFactory.createHunch();
      const expectedAction = {
        type: types.UPDATE_HUNCH,
        hunch
      };
      expect(hunchActions.updateHunch(hunch)).toEqual(expectedAction);
    });
  });
  describe('updateHunchSuccess', () => {
    it(`should creates an action typed ${types.UPDATE_HUNCH_SUCCESS} and having hunch as a payload`, () => {
      const hunch = mockDataFactory.createHunch();
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
    it(`should creates an action typed ${types.DELETE_HUNCH} with hunch as a payload`, () => {
      const hunch = mockDataFactory.createHunch();
      const expectedAction = {
        type: types.DELETE_HUNCH,
        hunch
      };
      expect(hunchActions.deleteHunch(hunch)).toEqual(expectedAction);
    });
  });
  describe('deleteHunchSuccess', () => {
    it(`should creates an action typed ${types.DELETE_HUNCH_SUCCESS} and having hunch as a payload`, () => {
      const hunch = mockDataFactory.createHunch();
      const expectedAction = {
        type: types.DELETE_HUNCH_SUCCESS,
        hunch
      };
      expect(hunchActions.deleteHunchSuccess(hunch)).toEqual(expectedAction);
    });
  });

});
