/**
 * Created on 30-Jul-18.
 */
import _ from 'lodash';
import initialState from '../../initialState';
import {
  CREATE_BOX_SUCCESS,
  DELETE_BOX_SUCCESS, EDIT_BOX,
  LOAD_BOXES_SUCCESS,
} from "./actionTypes";


export default function boxReducer(state = initialState.boxes, action) {
  switch (action.type) {
    case LOAD_BOXES_SUCCESS:
      // turn array to associative array having 'id' as key
      return {
        ...state,
        byId: _.mapKeys(action.boxes, 'id')
      };

    case CREATE_BOX_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId, [action.box.id]: action.box
        }
      };

    case DELETE_BOX_SUCCESS:
      return {
        ...state,
        byId: _.omit(state.byId, action.box.id)
      };

    case EDIT_BOX:
      return {
        ...state,
        editing: {
          ...state.editing,
          ...action.editing
        }
      };

    default:
      return state;
  }
}
