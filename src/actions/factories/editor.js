/**
 * Created on 05-Sep-18.
 */
import { OPEN_EDITOR_MODAL } from '../../middlewares/editor-modal';

export const createOpenEditorModal = (boostEditorType, resumeEditorModalType) => {
  [boostEditorType, resumeEditorModalType].forEach(type => {
    if (typeof type !== 'string') {
      throw new Error('Expected types to be strings.')
    }
  });

  return (editorSelector, data = null) => {
    if (typeof editorSelector !== 'function') {
      throw new Error('Expected types to be function.')
    }
    return {
      [OPEN_EDITOR_MODAL]: {
        boostEditorType: boostEditorType,
        resumeEditorType: resumeEditorModalType,
        data,
        editorSelector
      }
    };
  };
};

export const createOpenEditor = (boostEditorType) => {
  if (typeof boostEditorType !== 'string') {
    throw new Error('Expected types to be strings.')
  }
  return (data = null) => ({
    type: boostEditorType,
    withModal: false,
    data,
  });
};

export const createClearEditor = (clearEditorType) => {
  if (typeof clearEditorType !== 'string') {
    throw new Error('Expected types to be strings.')
  }
  return () => ({
    type: clearEditorType,
  });
};

export const createCloseEditorModal = (closeEditorModalType) => {
  if (typeof closeEditorModalType !== 'string') {
    throw new Error('Expected types to be strings.')
  }
  return (retainedData) => ({
    type: closeEditorModalType,
    retainedData
  });
};
