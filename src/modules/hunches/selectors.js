/**
 * Created on 06-Aug-18.
 */
import { NAME } from './constants';

export const getAll = state => state[NAME].byId;

export const getEditing = state => state[NAME].editing;

export const getSelected = state => state[NAME].editing.hunch;
