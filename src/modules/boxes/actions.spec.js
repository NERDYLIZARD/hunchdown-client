/**
 * Created on 06-Apr-18.
 */
import _ from 'lodash';
import * as boxActions from './actions';
import * as types from './actionTypes';
import { generateBox } from '../../utils/test/mockDataFactory';


describe('Box Actions', () => {
  /**
   * Load Boxes
   */
  describe('loadBoxes', () => {
    it(`creates an action typed ${types.LOAD_BOXES} with no payload`, () => {
      const expectedAction = {
        type: types.LOAD_BOXES,
      };
      expect(boxActions.loadBoxes()).toEqual(expectedAction);
    });
  });
  describe('loadBoxesSuccess', () => {
    it(`creates an action typed ${types.LOAD_BOXES_SUCCESS} and having 'boxes' as a payload`, () => {
      const boxes = [
        generateBox(),
        generateBox()
      ];
      const expectedAction = {
        type: types.LOAD_BOXES_SUCCESS,
        boxes
      };
      expect(boxActions.loadBoxesSuccess(boxes)).toEqual(expectedAction);
    });
  });

  /**
   * Create Box
   */
  describe('createBox', () => {
    it(`creates an action typed ${types.CREATE_BOX} with a 'box' as a payload`, () => {
      const box = _.omit(generateBox(), 'id');
      const expectedAction = {
        type: types.CREATE_BOX,
        box
      };
      expect(boxActions.createBox(box)).toEqual(expectedAction);
    });
  });
  describe('createBoxSuccess', () => {
    it(`creates an action typed ${types.CREATE_BOX_SUCCESS} and having a 'box' as a payload`, () => {
      const box = _.omit(generateBox(), 'id');
      const expectedAction = {
        type: types.CREATE_BOX_SUCCESS,
        box
      };
      expect(boxActions.createBoxSuccess(box)).toEqual(expectedAction);
    });
  });

  /**
   * Delete Box
   */
  describe('deleteBox', () => {
    it(`creates an action typed ${types.DELETE_BOX} with a 'box' as a payload`, () => {
      const box = generateBox();
      const expectedAction = {
        type: types.DELETE_BOX,
        box
      };
      expect(boxActions.deleteBox(box)).toEqual(expectedAction);
    });
  });
  describe('deleteBoxSuccess', () => {
    it(`creates an action typed ${types.DELETE_BOX_SUCCESS} and having a 'box' as a payload`, () => {
      const box = generateBox();
      const expectedAction = {
        type: types.DELETE_BOX_SUCCESS,
        box
      };
      expect(boxActions.deleteBoxSuccess(box)).toEqual(expectedAction);
    });
  });


  describe('openCreateBoxModal', () => {
    it(`creates an action typed ${types.EDIT_BOX} with 'editing.modelOpen = true' as a payload`, () => {
      const editing = {
        modalOpen: true,
      };
      const expectedAction = {
        type: types.EDIT_BOX,
        editing
      };
      expect(boxActions.openCreateBoxModal()).toEqual(expectedAction);
    });
  });

  describe('closeCreateBoxModal', () => {
    it(`creates an action typed ${types.EDIT_BOX} with 'editing.modelOpen = false' as a payload`, () => {
      const editing = {
        modalOpen: false,
      };
      const expectedAction = {
        type: types.EDIT_BOX,
        editing
      };
      expect(boxActions.closeCreateBoxModal()).toEqual(expectedAction);
    });
  });

});
