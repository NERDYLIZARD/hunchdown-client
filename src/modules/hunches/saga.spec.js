/**
 * Created on 14-May-18.
 */
import faker from 'faker';
import { put, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { getPagination } from './selectors';
import { fetchHunches } from './actions';


describe('Hunch Sagas', () => {

  describe('loadHunches', () => {
    const action = {
      boxId: faker.random.uuid(),
      perPage: 3,
      nextPageIsRequested: false,
    };
    describe('when `action.nextPageIsRequested` is `false`', () => {
      action.nextPageIsRequested = false;
      const generator = cloneableGenerator(loadHunches)(action);
      expect(generator.next().value).toEqual(select(getPagination));

      describe('when `isFetching` is `true`', () => {
        it ('exits the function', () => {
          const clone = generator.clone();
          const pagination = {
            isFetching: true,
          };
          expect(clone.next(pagination).done).toEqual(true);
        });
      });

      describe('when `isFetching` is `false` & it is an initial load i.e. `page === 0`', () => {
        it ('call `fetchBoxes`', () => {
          const clone = generator.clone();
          const pagination = {
            nextPageUrl: 'next',
            page: 0,
            isFetching: false,
          };
          expect(clone.next(pagination).value).toEqual(put(fetchHunches(pagination.nextPageUrl)));
          expect(clone.next().done).toEqual(true);
        });
      });
    });

    describe('when `action.nextPageIsRequested` is `true`', () => {
      action.nextPageIsRequested = true;
      const generator = cloneableGenerator(loadHunches)(action);
      expect(generator.next().value).toEqual(select(getPagination));

      describe('when `isFetching` is `true`', () => {
        it ('exits the function', () => {
          const clone = generator.clone();
          const pagination = {
            isFetching: true,
          };
          expect(clone.next(pagination).done).toEqual(true);
        });
      });

      describe('when `isFetching` is `false` & it is not an initial load i.e. `page > 0`', () => {
        it ('call `fetchHunches`', () => {
          const clone = generator.clone();
          const pagination = {
            nextPageUrl: 'next',
            page: 1,
            isFetching: false,
          };
          expect(clone.next(pagination).value).toEqual(put(fetchHunches(pagination.nextPageUrl)));
          expect(clone.next().done).toEqual(true);
        });
      });
    });
  });
});
