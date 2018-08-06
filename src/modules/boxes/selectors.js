/**
 * Created on 06-Aug-18.
 */
import { createSelector } from 'reselect';
import { NAME } from './constants';
import _ from 'lodash';

export const getAll = state => state[NAME].byId;

export const getOptionsForCheckbox = createSelector(
  getAll,
  (boxes) => {
    return _.reduce(boxes, (options, box) => {
      options.push({
        label: box.title,
        value: box.id
      });
      return options;
    }, []);
  }
);
