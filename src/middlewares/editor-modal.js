/**
 * Created on 01-Sep-18.
 */
export const OPEN_EDITOR_MODAL = 'Open Editor Modal';


// if data is retained in editor, resume editor with the retained data,
// else, populate editor with passed in data.
export default store => next => action => {
  const openEditorModal = action[OPEN_EDITOR_MODAL];
  if (typeof openEditorModal === 'undefined') {
    return next(action);
  }

  const {boostEditorType, resumeEditorType, data = {}, editorSelector} = openEditorModal;

  if (typeof boostEditorType !== 'string') {
    throw new Error('Specify a string boostEditorType.')
  }
  if (typeof resumeEditorType !== 'string') {
    throw new Error('Specify a string resumeEditorType.')
  }
  if (typeof editorSelector !== 'function') {
    throw new Error('editorSelector must be a function');
  }

  const editor = editorSelector(store.getState());

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[OPEN_EDITOR_MODAL];
    return finalAction
  };

  if (editor && editor.props) {
    next(actionWith({
      type: resumeEditorType
    }));
  } else {
    next(actionWith({
      type: boostEditorType,
      withModal: true,
      data
    }));
  }
};
