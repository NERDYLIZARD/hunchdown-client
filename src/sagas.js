/**
 * Created on 14-May-18.
 */
import { all } from 'redux-saga/effects';
import { hunchSagaWatchers }  from './modules/hunches/saga';

export default function* sagas() {
  yield all ([
    ...hunchSagaWatchers,
  ]);
}
