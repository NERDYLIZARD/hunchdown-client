/**
 * Created on 30-Jul-18.
 */
import * as types from './actionTypes';

export const loadBoxes = () => ({ type: types.LOAD_BOXES });
export const loadBoxesSuccess = boxes => ({ type: types.LOAD_BOXES_SUCCESS, boxes });
