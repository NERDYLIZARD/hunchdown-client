/**
 * Created on 06-Aug-18.
 */
import { NAME } from './constants';
import { createSelector } from "reselect";

export const getEntity = state => state.entities[NAME];

export const getVisibleItems = state => state[NAME].pagination.ids;

export const getAll = createSelector(
  getVisibleItems,
  getEntity,
  (visibleItems, entitiy) => visibleItems.map(item => entitiy[item])
);

export const getPaginationData = state => state[NAME].pagination;
