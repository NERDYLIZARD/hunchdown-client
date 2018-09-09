/**
 * Created on 03-Aug-18.
 */
import { put, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { getActive, getEntity, getPagination } from './selectors';
import { fetchBox, fetchBoxes } from './actions';
import { loadBox, loadBoxes } from './saga';


describe('Box Sagas', () => {

  describe('loadBoxes', () => {
    const action = {
      perPage: 3,
      nextPageIsRequested: false,
    };
    describe('when `action.nextPageIsRequested` is `false`', () => {
      action.nextPageIsRequested = false;
      const generator = cloneableGenerator(loadBoxes)(action);
      expect(generator.next().value).toEqual(select(getPagination));

      describe('when `isFetching` is `true`', () => {
        it('exits the function', () => {
          const clone = generator.clone();
          const pagination = {
            isFetching: true,
          };
          expect(clone.next(pagination).done).toEqual(true);
        });
      });

      describe('when `isFetching` is `false` & it is an initial load i.e. `page === 0`', () => {
        it('call `fetchBoxes`', () => {
          const clone = generator.clone();
          const pagination = {
            nextPageUrl: 'next',
            page: 0,
            isFetching: false,
          };
          expect(clone.next(pagination).value).toEqual(put(fetchBoxes(pagination.nextPageUrl)));
          expect(clone.next().done).toEqual(true);
        });
      });
    });

    describe('when `action.nextPageIsRequested` is `true`', () => {
      action.nextPageIsRequested = true;
      const generator = cloneableGenerator(loadBoxes)(action);
      expect(generator.next().value).toEqual(select(getPagination));

      describe('when `isFetching` is `true`', () => {
        it('exits the function', () => {
          const clone = generator.clone();
          const pagination = {
            isFetching: true,
          };
          expect(clone.next(pagination).done).toEqual(true);
        });
      });

      describe('when `isFetching` is `false` & it is not an initial load i.e. `page > 0`', () => {
        it('call `fetchBoxes`', () => {
          const clone = generator.clone();
          const pagination = {
            nextPageUrl: 'next',
            page: 1,
            isFetching: false,
          };
          expect(clone.next(pagination).value).toEqual(put(fetchBoxes(pagination.nextPageUrl)));
          expect(clone.next().done).toEqual(true);
        });
      });
    });
  });


  describe('loadBox', () => {
    const action = {
      id: 'id#1',
      requiredFields: ['mustHaveField'],
    };
    const generator = cloneableGenerator(loadBox)(action);
    expect(generator.next().value).toEqual(select(getActive));

    describe('when `isFetching` is `true`', () => {
      it('exits the function', () => {
        const clone = generator.clone();
        expect(clone.next({isFetching: true}).done).toBe(true);
      });
    });

    describe('when `isFetching` is `false`', () => {
      const clone = generator.clone();
      expect(clone.next({isFetching: false}).value).toEqual(select(getEntity));

      describe('when `box` is not cached in `entity`', () => {
        it('calls `fetchBox()`', () => {
          const _clone = clone.clone();
          const entity = {
            'id#2': {
              id: 'id#2',
            }
          };
          expect(_clone.next(entity).value).toEqual(put(fetchBox(action.id)));
        });
      });

      describe('when `box` is cached in `entity` without all `requiredFields`', () => {
        it('calls `fetchBox()`', () => {
          const _clone = clone.clone();
          const entity = {
            'id#1': {
              id: 'id#1',
              notMustHaveField: 'available'
            }
          };
          expect(_clone.next(entity).value).toEqual(put(fetchBox(action.id)));
        });
      });

      describe('when `box` is cached in `entity` with all `requiredFields`', () => {
        it('exits the function', () => {
          const _clone = clone.clone();
          const entity = {
            'id#1': {
              id: 'id#1',
              mustHaveField: 'available'
            }
          };
          expect(_clone.next(entity).done).toBe(true);
        });
      });

    });
  });

});
