/**
 * Created on 14-May-18.
 */
import { all } from 'redux-saga/effects';
import { cardSagaWatchers }  from './modules/card/saga';

export default function* sagas() {
  yield all ([
    ...cardSagaWatchers,
  ]);
}
