/**
 * Created on 30-Jul-18.
 */
import _ from 'lodash';
import initialState from '../../initialState';
import {
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

    default:
      return state;
  }
}
