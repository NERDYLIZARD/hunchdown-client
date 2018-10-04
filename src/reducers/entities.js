/**
 * Created on 15-Aug-18.
 */
import merge from 'lodash/merge';

export const initialState = {
  boxes: {},
  hunches: {},
};

export default function entitiesReducer(state = initialState, action) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }
  return state;
}
