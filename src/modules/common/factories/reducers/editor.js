/**
 * Created on 05-Sep-18.
 */
export const createEditorReducer = (boostEditorType, resumeEditorType, clearEditorType, closeEditorType) => {
  [boostEditorType, resumeEditorType, clearEditorType, closeEditorType].forEach(type => {
    if (!(typeof type === 'string')) {
      throw new Error(`Expect ${type} type to be string.`);
    }
  });

  return (state = {
    isOpenedWithModal: false,
    props: null
  }, action) => {

    switch (action.type) {
      case boostEditorType:
        return {
          ...state,
          isOpenedWithModal: action.withModal,
          props: action.data,
        };

      case resumeEditorType:
        return {
          ...state,
          isOpenedWithModal: true,
        };

      case clearEditorType:
        return {
          ...state,
          props: null
        };

      case closeEditorType:
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
