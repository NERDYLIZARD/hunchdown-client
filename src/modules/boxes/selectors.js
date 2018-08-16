/**
 * Created on 06-Aug-18.
 */
import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getEntity = state => state.entities[NAME];

export const getVisibleItems = state => state[NAME].visible;

export const getAll = createSelector(
  getVisibleItems,
  getEntity,
  (visibleItems, entitiy) => visibleItems.map(item => entitiy[item])
);

export const getSelected = state => state.entities[NAME].editing.box;

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
