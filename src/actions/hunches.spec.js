/**
 * Created on 06-Apr-18.
 */
import * as hunchActions from './hunches';
import * as types from './types/hunches';
import { CALL_API } from '../middlewares/api/index';
import { hunchSchema } from '../utils/normalizr-schema';
import { OPEN_EDITOR_MODAL } from '../middlewares/editor-modal';


describe('Hunch Actions', () => {

  describe('loadHunches', () => {
    it(`creates an action typed ${types.LOAD_HUNCHES} with 'perPage' and 'nextPageIsRequested'`, () => {
      const expectedAction = {
        type: types.LOAD_HUNCHES,
        boxId: 'id#1',
        nextPageIsRequested: false,
        perPage: 12,
      };
      expect(hunchActions.loadHunches('id#1', false, 12)).toEqual(expectedAction);
    });
  });

  describe('fetchHunches', () => {
    it(`creates an action ${CALL_API} 'GET' method`, () => {
      const expectedAction = {
        [CALL_API]: {
          types: [types.FETCH_HUNCHES_REQUEST, types.FETCH_HUNCHES_SUCCESS, types.FETCH_HUNCHES_FAILURE],
          schema: [hunchSchema],
          endpoint: 'next-page.com',
          method: 'GET'
        }
      };
      expect(hunchActions.fetchHunches('next-page.com')).toEqual(expectedAction);
    });
  });

  describe('unloadHunches', () => {
    it(`creates an action typed ${types.UNLOAD_HUNCHES}`, () => {
      const expectedAction = {
        type: types.UNLOAD_HUNCHES,
      };
      expect(hunchActions.unloadHunches()).toEqual(expectedAction);
    });
  });

  describe('loadHunch', () => {
    it.skip(`creates an action typed ${types.LOAD_HUNCH} with 'id'`, () => {
      const expectedAction = {
        type: types.LOAD_HUNCH,
        id: 'id#1',
      };
      expect(hunchActions.loadHunch('id#1')).toEqual(expectedAction);
    });
  });

  describe('fetchHunch', () => {
    it.skip(`creates an action ${CALL_API} with 'GET' method`, () => {
      const hunchId = 'id#1';
      const expectedAction = {
        [CALL_API]: {
          types: [types.FETCH_HUNCH_REQUEST, types.FETCH_HUNCH_SUCCESS, types.FETCH_HUNCH_FAILURE],
          schema: hunchSchema,
          endpoint: `/hunches/${hunchId}`,
          method: 'GET'
        }
      };
      expect(hunchActions.fetchHunch(hunchId)).toEqual(expectedAction);
    });
  });

  describe('unloadHunch', () => {
    it.skip(`creates an action typed ${types.UNLOAD_HUNCH}`, () => {
      const expectedAction = {
        type: types.UNLOAD_HUNCH,
      };
      expect(hunchActions.unloadHunch()).toEqual(expectedAction);
    });
  });

  describe('createHunch', () => {
    it(`creates an action ${CALL_API} with 'data' and 'POST' method`, () => {
      const hunch = {
        wisdom: 'foo',
        attritbute: 'bar',
      };
      const expectedAction = {
        [CALL_API]: {
          types: [types.CREATE_HUNCH_REQUEST, types.CREATE_HUNCH_SUCCESS, types.CREATE_HUNCH_FAILURE],
          schema: hunchSchema,
          endpoint: '/hunches',
          method: 'POST',
          data: hunch
        }
      };
      expect(hunchActions.createHunch(hunch)).toEqual(expectedAction);
    });
  });

  describe('updateHunch', () => {
    it(`creates an action ${CALL_API} with 'data' and 'PATCH' method`, () => {
      const hunch = {
        id: 'id#1',
        wisdom: 'foo',
        attritbute: 'bar',
      };
      const expectedAction = {
        [CALL_API]: {
          types: [types.UPDATE_HUNCH_REQUEST, types.UPDATE_HUNCH_SUCCESS, types.UPDATE_HUNCH_FAILURE],
          schema: hunchSchema,
          endpoint: `/hunches/${hunch.id}`,
          method: 'PATCH',
          data: hunch
        }
      };
      expect(hunchActions.updateHunch(hunch)).toEqual(expectedAction);
    });
  });

  describe('deleteHunch', () => {
    it(`creates an action ${CALL_API} with 'data' and 'DELETE' method`, () => {
      const hunch = {
        id: 'id#1',
        wisdom: 'foo',
        attritbute: 'bar',
      };
      const expectedAction = {
        [CALL_API]: {
          types: [types.DELETE_HUNCH_REQUEST, types.DELETE_HUNCH_SUCCESS, types.DELETE_HUNCH_FAILURE],
          schema: hunchSchema,
          endpoint: `/hunches/${hunch.id}`,
          method: 'DELETE',
          data: hunch
        }
      };
      expect(hunchActions.deleteHunch(hunch)).toEqual(expectedAction);
    });
  });

  describe('openHunchEditorModal', () => {
    it('throws an error if `selector` is not a function', () => {
      const editorSelector = 'notAFunction';
      expect(() => hunchActions.openHunchEditorModal(editorSelector)).toThrow();
    });
    it(`creates an action ${OPEN_EDITOR_MODAL}`, () => {
      const data = {
        id: 'id#1',
        wisdom: 'foo',
        attritbute: 'bar',
      };
      const editorSelector = jest.fn();
      const expectedAction = {
        [OPEN_EDITOR_MODAL]: {
          boostEditorType: types.BOOST_HUNCH_EDITOR,
          resumeEditorType: types.RESUME_HUNCH_EDITOR_MODAL,
          data,
          editorSelector
        }
      };
      expect(hunchActions.openHunchEditorModal(editorSelector, data)).toEqual(expectedAction);
    });
  });

  describe('openHunchModal', () => {
    it(`creates an action ${types.BOOST_HUNCH_EDITOR}`, () => {
      const data = {
        id: 'id#1',
        wisdom: 'foo',
        attritbute: 'bar',
      };
      const expectedAction = {
        type: types.BOOST_HUNCH_EDITOR,
        withModal: false,
        data,
      };
      expect(hunchActions.openHunchEditor(data)).toEqual(expectedAction);
    });
  });

  describe('clearHunchEditor', () => {
    it(`creates an action ${types.CLEAR_HUNCH_EDITOR}`, () => {
      const expectedAction = {
        type: types.CLEAR_HUNCH_EDITOR,
      };
      expect(hunchActions.clearHunchEditor()).toEqual(expectedAction);
    });
  });

  describe('closeHunchEditorModal', () => {
    it(`creates an action ${types.CLOSE_HUNCH_EDITOR_MODAL} with 'retainedData'`, () => {
      const retainedData = {
        id: 'id#1',
        wisdom: 'foo',
        attritbute: 'bar',
      };
      const expectedAction = {
        type: types.CLOSE_HUNCH_EDITOR_MODAL,
        retainedData
      };
      expect(hunchActions.closeHunchEditorModal(retainedData)).toEqual(expectedAction);
    });
  });

});
