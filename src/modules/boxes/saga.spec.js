/**
 * Created on 03-Aug-18.
 */
import _ from 'lodash';
import faker from 'faker';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { generateBox } from '../../utils/test/mockDataFactory';
import { createBox, deleteBox, loadBoxes } from './saga';
import {
  createBoxSuccess,
  deleteBoxSuccess,
  loadBoxesSuccess,
} from './actions';


describe('Box Sagas', () => {
  /**
   * Load Boxes
   */
  describe('loadBoxes', () => {
    const generator = cloneableGenerator(loadBoxes)();

    it('should call api to fetch `boxes`', () => {
      expect(generator.next().value).toEqual(call(Services.find));
    });

    it('should dispatch `loadBoxesSuccess()` with the fetched `boxes` as its argument', () => {
      const clone = generator.clone();
      const boxes = [generateBox(), generateBox()];
      expect(clone.next(boxes).value).toEqual(put(loadBoxesSuccess(boxes)));
      expect(clone.next().done).toBe(true);
    });
    // it('should call api to fetch boxes and dispatch loadBoxesSuccess with the fetched boxes', () => {
    //   const clone = generator.clone;
    //   const error = { message: 'later' };
    // expect(clone.throw(error).value).toEqual(put(loadBoxesFailed(box)));
    // expect(clone.next().done).toBe(true);
    // });
  });


  /**
   * Create Box
   */
  describe('createBox', () => {
    const action = {box: _.omit(generateBox(), 'id')};
    const generator = cloneableGenerator(createBox)(action);

    it('should call api to create a `box` with a `box` object as its argument', () => {
      expect(generator.next().value).toEqual(call(Services.create, action.box));
    });
    it('should dispatch `createBoxSuccess()` with the created `box` as its argument', () => {
      const clone = generator.clone();
      const box = {
        ...action.box,
        id: faker.random.uuid(),
      };
      expect(clone.next(box).value).toEqual(put(createBoxSuccess(box)));
      expect(clone.next().done).toBe(true);
    });
    // error case (later)
  });


  /**
   * Delete Box
   */
  describe('deleteBox', () => {
    const action = {box: generateBox()};
    const generator = cloneableGenerator(deleteBox)(action);
    it('should call api to delete a `box` with a `box` object as its argument', () => {
      expect(generator.next().value).toEqual(call(Services.delete, action.box));
    });
    it('should dispatch `deleteBoxSuccess()` with the box that has been passed in `deleteBox()` as it argument', () => {
      const clone = generator.clone();
      expect(clone.next().value).toEqual(put(deleteBoxSuccess(action.box)));
      expect(clone.next().done).toBe(true);
    });
    // error case (later)
  });

});
