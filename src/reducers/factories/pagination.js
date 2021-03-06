/**
 * Created on 28-Aug-18.
 */
import union from 'lodash/union'
import without from 'lodash/without'

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export const createPaginationReducer = (fetchTypes, createTypes, deleteTypes, unloadType) => {

  [fetchTypes, createTypes, deleteTypes].forEach(types => {

    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected types to be an array of three elements.')
    }
    if (!types.every(t => typeof t === 'string')) {
      throw new Error('Expected types to be strings.')
    }
  });

  if (typeof unloadType !== 'string') {
    throw new Error('Expected types to be strings.')
  }

  const [fetchRequestType, fetchSuccessType, fetchFailureType] = fetchTypes;
  const [createRequestType, createSuccessType, createFailureType] = createTypes;
  const [deleteRequestType, deleteSuccessType, deleteFailureType] = deleteTypes;

  return (state = initialState, action) => {
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

      case unloadType:
        return initialState;

      default:
        return state
    }
  }

};

export const initialState = {
  isFetching: false,
  nextPageUrl: undefined,
  page: 0,
  ids: []
};
