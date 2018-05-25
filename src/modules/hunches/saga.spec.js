/**
 * Created on 14-May-18.
 */
import _ from 'lodash';
import faker from 'faker';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import Services from './services';
import mockDataFactory from '../../utils/test/mockDataFactory';
import { createHunch, deleteHunch, loadHunch, loadHunches, updateHunch } from './saga';
import { createHunchSuccess, deleteHunchSuccess, loadHunchesSuccess, loadHunchSuccess, updateHunchSuccess } from './actions';


describe('Hunch Sagas', () => {

  /**
   * Load Hunches
   */
  describe('loadHunches', () => {
    const generator = cloneableGenerator(loadHunches)();

    it('should call api to fetch hunches', () => {
      expect(generator.next().value).toEqual(call(Services.find));
    });

    it('should dispatch loadHunchesSuccess() with the fetched hunches as its argument', () => {
      const clone = generator.clone();
      const hunches = [mockDataFactory.createHunch(), mockDataFactory.createHunch()];
      expect(clone.next(hunches).value).toEqual(put(loadHunchesSuccess(hunches)));
      expect(clone.next().done).toBe(true);
    });
    // it('should call api to fetch hunches and dispatch loadHunchesSuccess with the fetched hunches', () => {
    //   const clone = generator.clone;
    //   const error = { message: 'later' };
    // expect(clone.throw(error).value).toEqual(put(loadHunchesFailed(hunch)));
    // expect(clone.next().done).toBe(true);
    // });
  });


  /**
   * Load Hunch
   */
  describe('loadHunch', () => {
    const action = { id: faker.random.uuid() };
    const generator = cloneableGenerator(loadHunch)(action);

    it('should call api to fetch a hunch by id', () => {
      expect(generator.next().value).toEqual(call(Services.get, action.id));
    });
    it('should dispatch loadHunchSuccess() with the fetched hunch as its argument', () => {
      const clone = generator.clone();
      const hunch = mockDataFactory.createHunch();
      expect(clone.next(hunch).value).toEqual(put(loadHunchSuccess(hunch)));
      expect(clone.next().done).toBe(true);
    });
    // error case (later)
  });


  /**
   * Create Hunch
   */
  describe('createHunch', () => {
    const action = { hunch: _.omit(mockDataFactory.createHunch(), 'id') };
    const generator = cloneableGenerator(createHunch)(action);

    it('should call api to create a hunch with a hunch object as its argument', () => {
      expect(generator.next().value).toEqual(call(Services.create, action.hunch));
    });
    it('should dispatch createHunchSuccess() with the created hunch as its argument', () => {
      const clone = generator.clone();
      const hunch = {
        ...action.hunch,
        id: faker.random.uuid(),
      };
      expect(clone.next(hunch).value).toEqual(put(createHunchSuccess(hunch)));
      expect(clone.next().done).toBe(true);
    });
    // error case (later)
  });


  /**
   * Update Hunch
   */
  describe('updateHunch', () => {
    const action = { hunch: mockDataFactory.createHunch() };
    const generator = cloneableGenerator(updateHunch)(action);

    it('should call api to update a hunch with a hunch object as its argument', () => {
      expect(generator.next().value).toEqual(call(Services.update, action.hunch));
    });
    it('should dispatch updateHunchSuccess() with the updated hunch as its argument', () => {
      const clone = generator.clone();
      const hunch = action.hunch;
      expect(clone.next(hunch).value).toEqual(put(updateHunchSuccess(hunch)));
      expect(clone.next().done).toBe(true);
    });
    // error case (later)
  });


  /**
   * Delete Hunch
   */
  describe('deleteHunch', () => {
    const action = { hunch: mockDataFactory.createHunch() };
    const generator = cloneableGenerator(deleteHunch)(action);
    it('should call api to delete a hunch with a hunch object as its argument', () => {
      expect(generator.next().value).toEqual(call(Services.delete, action.hunch));
    });
    it('should dispatch deleteHunchSuccess() with the hunch that has been passed in deleteHunch() as it argument', () => {
      const clone = generator.clone();
      expect(clone.next().value).toEqual(put(deleteHunchSuccess(action.hunch)));
      expect(clone.next().done).toBe(true);
    });
    // error case (later)
  });

});
