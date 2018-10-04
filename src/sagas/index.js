/**
 * Created on 14-May-18.
 */
import { all } from 'redux-saga/effects';
import { hunchSagaWatchers }  from './hunches';
import { boxSagaWatchers }  from './boxes';

export default function* sagas() {
  yield all ([
    ...hunchSagaWatchers,
    ...boxSagaWatchers,
  ]);
}
