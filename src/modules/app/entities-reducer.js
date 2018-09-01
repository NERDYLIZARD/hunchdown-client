/**
 * Created on 15-Aug-18.
 */
import merge from 'lodash/merge';
import initialState from '../../initialState';

export default function entitiesReducer(state = initialState.entities, action) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }
  return state;
}
