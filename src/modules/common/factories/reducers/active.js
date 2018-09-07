/**
 * Created on 06-Sep-18.
 */
export const createActiveReducer = (types) => {

  if (!Array.isArray(types) || types.length !== 5) {
    throw new Error('Expected types to be an array of four elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }

  const [requestType, successType, failureType, loadType, unloadType] = types;

  const initialState = {
    id: null,
    isFetching: false,
  };
  return (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true,
        };
      case loadType:
        return {
          ...state,
          id: action.id,
        };
      case successType:
      case failureType:
        return {
          ...state,
          isFetching: false,
        };
      case unloadType:
        return initialState;
      default:
        return state;
    }
  };
};
