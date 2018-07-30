/**
 * Created on 30-Jul-18.
 */
import * as types from './actionTypes';

export const loadBoxes = () => ({ type: types.LOAD_BOXES });
export const loadBoxesSuccess = boxes => ({ type: types.LOAD_BOXES_SUCCESS, boxes });

export const deleteBox = (box) => ({ type: types.DELETE_BOX, box });
export const deleteBoxSuccess = box => ({ type: types.DELETE_BOX_SUCCESS, box });
