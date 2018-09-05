/**
 * Created on 28-Aug-18.
 */
import union from 'lodash/union'
import without from 'lodash/without'

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export const createPaginationReducer = (fetchTypes, createTypes, deleteTypes) => {

  [fetchTypes, createTypes, deleteTypes].forEach(types => {

    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected types to be an array of three elements.')
    }
    if (!types.every(t => typeof t === 'string')) {
      throw new Error('Expected types to be strings.')
    }
  });

  const [fetchRequestType, fetchSuccessType, fetchFailureType] = fetchTypes;
  const [createRequestType, createSuccessType, createFailureType] = createTypes;
  const [deleteRequestType, deleteSuccessType, deleteFailureType] = deleteTypes;

  return (state = {
    isFetching: false,
    nextPageUrl: undefined,
    page: 0,
    ids: []
  }, action) => {
    switch (action.type) {
      case fetchRequestType:
      case createRequestType:
      case deleteRequestType:
        return {
          ...state,
          isFetching: true
        };

      case fetchSuccessType:
        return {
          ...state,
          isFetching: false,
          ids: union(state.ids, action.payload.result),
          nextPageUrl: action.payload.nextPageUrl,
          page: state.page + 1
        };

      case createSuccessType:
        return {
          ...state,
          isFetching: false,
          // todo slow, use immutable `unshift()` for an alternative
          ids: [action.payload.result, ...state.ids],
        };

      case deleteSuccessType:
        return {
          ...state,
          isFetching: false,
          ids: without(state.ids, action.payload.result),
        };

      case fetchFailureType:
      case createFailureType:
      case deleteFailureType:
        return {
          ...state,
          isFetching: false
        };

      default:
        return state
    }
  }

};


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
