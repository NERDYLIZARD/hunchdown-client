/**
 * Created on 05-Sep-18.
 */
import { OPEN_EDITOR_MODAL } from '../../../../middlewares/editor-modal';

export const createOpenEditorModal = (boostEditorType, resumeEditorModalType) =>
  (data, editorSelector) => ({
    [OPEN_EDITOR_MODAL]: {
      boostEditorType: boostEditorType,
      resumeEditorType: resumeEditorModalType,
      data,
      editorSelector
    }
  });

export const createOpenEditor = (boostEditorType) =>
  (data) => ({
    type: boostEditorType,
    withModal: false,
    data,
  });

export const createClearEditor = (clearEditorType) =>
  () => ({
    type: clearEditorType,
  });

export const createCloseEditorModal = (closeEditorModalType) =>
  (retainedData) => ({
    type: closeEditorModalType,
    retainedData
  });
