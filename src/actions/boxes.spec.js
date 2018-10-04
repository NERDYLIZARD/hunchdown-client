/**
 * Created on 03-Aug-18.
 */
import * as boxActions from './boxes';
import * as types from './types/boxes';
import { CALL_API } from '../middlewares/api/index';
import { boxSchema } from '../utils/normalizr-schema';
import { OPEN_EDITOR_MODAL } from '../middlewares/editor-modal';


describe('Box Actions', () => {

  describe('loadBoxes', () => {
    it(`creates an action typed ${types.LOAD_BOXES} with 'perPage' and 'nextPageIsRequested'`, () => {
      const expectedAction = {
        type: types.LOAD_BOXES,
        nextPageIsRequested: false,
        perPage: 12
      };
      expect(boxActions.loadBoxes(false)).toEqual(expectedAction);
    });
  });

  describe('fetchBoxes', () => {
    it(`creates an action ${CALL_API} 'GET' method`, () => {
      const expectedAction = {
        [CALL_API]: {
          types: [types.FETCH_BOXES_REQUEST, types.FETCH_BOXES_SUCCESS, types.FETCH_BOXES_FAILURE],
          schema: [boxSchema],
          endpoint: 'next-page.com',
          method: 'GET'
        }
      };
      expect(boxActions.fetchBoxes('next-page.com')).toEqual(expectedAction);
    });
  });

  describe('unloadBoxes', () => {
    it(`creates an action typed ${types.UNLOAD_BOXES}`, () => {
      const expectedAction = {
        type: types.UNLOAD_BOXES,
      };
      expect(boxActions.unloadBoxes()).toEqual(expectedAction);
    });
  });

  describe('loadBox', () => {
    it(`creates an action typed ${types.LOAD_BOX} with 'id'`, () => {
      const expectedAction = {
        type: types.LOAD_BOX,
        id: 'id#1',
      };
      expect(boxActions.loadBox('id#1')).toEqual(expectedAction);
    });
  });

  describe('fetchBox', () => {
    it(`creates an action ${CALL_API} with 'GET' method`, () => {
      const boxId = 'id#1';
      const expectedAction = {
        [CALL_API]: {
          types: [types.FETCH_BOX_REQUEST, types.FETCH_BOX_SUCCESS, types.FETCH_BOX_FAILURE],
          schema: boxSchema,
          endpoint: `/boxes/${boxId}`,
          method: 'GET'
        }
      };
      expect(boxActions.fetchBox(boxId)).toEqual(expectedAction);
    });
  });

  describe('unloadBox', () => {
    it(`creates an action typed ${types.UNLOAD_BOX}`, () => {
      const expectedAction = {
        type: types.UNLOAD_BOX,
      };
      expect(boxActions.unloadBox()).toEqual(expectedAction);
    });
  });

  describe('createBox', () => {
    it(`creates an action ${CALL_API} with 'data' and 'POST' method`, () => {
      const box = {
        title: 'foo',
        description: 'bar',
      };
      const expectedAction = {
        [CALL_API]: {
          types: [types.CREATE_BOX_REQUEST, types.CREATE_BOX_SUCCESS, types.CREATE_BOX_FAILURE],
          schema: boxSchema,
          endpoint: '/boxes',
          method: 'POST',
          data: box
        }
      };
      expect(boxActions.createBox(box)).toEqual(expectedAction);
    });
  });

  describe('updateBox', () => {
    it(`creates an action ${CALL_API} with 'data' and 'PATCH' method`, () => {
      const box = {
        id: 'id#1',
        title: 'foo',
        description: 'bar',
      };
      const expectedAction = {
        [CALL_API]: {
          types: [types.UPDATE_BOX_REQUEST, types.UPDATE_BOX_SUCCESS, types.UPDATE_BOX_FAILURE],
          schema: boxSchema,
          endpoint: `/boxes/${box.id}`,
          method: 'PATCH',
          data: box
        }
      };
      expect(boxActions.updateBox(box)).toEqual(expectedAction);
    });
  });

  describe('deleteBox', () => {
    it(`creates an action ${CALL_API} with 'data' and 'DELETE' method`, () => {
      const box = {
        id: 'id#1',
        title: 'foo',
        description: 'bar',
      };
      const expectedAction = {
        [CALL_API]: {
          types: [types.DELETE_BOX_REQUEST, types.DELETE_BOX_SUCCESS, types.DELETE_BOX_FAILURE],
          schema: boxSchema,
          endpoint: `/boxes/${box.id}`,
          method: 'DELETE',
          data: box
        }
      };
      expect(boxActions.deleteBox(box)).toEqual(expectedAction);
    });
  });

  describe('openBoxEditorModal', () => {
    it('throws an error if `selector` is not a function', () => {
      const editorSelector = 'notAFunction';
      expect(() => boxActions.openBoxEditorModal(editorSelector)).toThrow();
    });
    it(`creates an action ${OPEN_EDITOR_MODAL}`, () => {
      const data = {
        id: 'id#1',
        title: 'foo',
        description: 'bar',
      };
      const editorSelector = jest.fn();
      const expectedAction = {
        [OPEN_EDITOR_MODAL]: {
          boostEditorType: types.BOOST_BOX_EDITOR,
          resumeEditorType: types.RESUME_BOX_EDITOR_MODAL,
          data,
          editorSelector
        }
      };
      expect(boxActions.openBoxEditorModal(editorSelector, data)).toEqual(expectedAction);
    });
  });

  describe('openBoxModal', () => {
    it(`creates an action ${types.BOOST_BOX_EDITOR}`, () => {
      const data = {
        id: 'id#1',
        title: 'foo',
        description: 'bar',
      };
      const expectedAction = {
        type: types.BOOST_BOX_EDITOR,
        withModal: false,
        data,
      };
      expect(boxActions.openBoxEditor(data)).toEqual(expectedAction);
    });
  });

  describe('clearBoxEditor', () => {
    it(`creates an action ${types.CLEAR_BOX_EDITOR}`, () => {
      const expectedAction = {
        type: types.CLEAR_BOX_EDITOR,
      };
      expect(boxActions.clearBoxEditor()).toEqual(expectedAction);
    });
  });

  describe('closeBoxEditorModal', () => {
    it(`creates an action ${types.CLOSE_BOX_EDITOR_MODAL} with 'retainedData'`, () => {
      const retainedData = {
        id: 'id#1',
        title: 'foo',
        description: 'bar',
      };
      const expectedAction = {
        type: types.CLOSE_BOX_EDITOR_MODAL,
        retainedData
      };
      expect(boxActions.closeBoxEditorModal(retainedData)).toEqual(expectedAction);
    });
  });

});
