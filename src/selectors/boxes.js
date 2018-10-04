/**
 * Created on 06-Aug-18.
 */
import { createSelector } from 'reselect';

const NAME = 'boxes';

export const getEntity = state => state.entities[NAME];
export const getVisibleItems = state => state[NAME].pagination.ids;

export const getAll = createSelector(
  getVisibleItems,
  getEntity,
  (visibleItems, entitiy) => visibleItems.map(item => entitiy[item])
);

export const getPagination = state => state[NAME].pagination;

export const getEditor = state => state[NAME].editor;

export const getActive = state => state[NAME].active;

export const getActiveId = state => state[NAME].active.id;

export const getActiveElement = createSelector(
  getActiveId,
  getEntity,
  (activeId, entity) => entity[activeId]
);

export const getOptionsForCheckbox = createSelector(
  getAll,
  (boxes) => {
    return boxes.reduce((options, box) => {
      options.push({
        label: box.title,
        value: box.id
      });
      return options;
    }, []);
  }
);
