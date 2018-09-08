/**
 * Created on 05-Sep-18.
 */
export const createEditorReducer = (types) => {
  if (!Array.isArray(types) || types.length !== 4) {
    throw new Error('Expected types to be an array of four elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }

  const [boostEditorType, resumeEditorModalType, clearEditorType, closeEditorModalType] = types;

  return (state = initialState, action) => {

    switch (action.type) {
      case boostEditorType:
        return {
          ...state,
          isOpenedWithModal: action.withModal,
          props: action.data,
        };

      case resumeEditorModalType:
        return {
          ...state,
          isOpenedWithModal: true,
        };

      case clearEditorType:
        return {
          ...state,
          props: null
        };

      case closeEditorModalType:
        return {
          ...state,
          isOpenedWithModal: false,
          props: action.retainedData,
        };

      default:
        return state;
    }
  };

};

export const initialState = {
  isOpenedWithModal: false,
  props: null
};
