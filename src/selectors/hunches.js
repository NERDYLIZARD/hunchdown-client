/**
 * Created on 06-Aug-18.
 */
import { createSelector } from "reselect";

const NAME = 'hunches';

export const getEntity = state => state.entities[NAME];
export const getVisibleItems = state => state[NAME].pagination.ids;

export const getAll = createSelector(
  getVisibleItems,
  getEntity,
  (visibleItems, entitiy) => visibleItems.map(item => entitiy[item])
);

export const getPagination = state => state[NAME].pagination;

export const getEditor = state => state[NAME].editor;
