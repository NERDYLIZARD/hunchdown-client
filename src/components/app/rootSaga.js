/**
 * Created on 14-May-18.
 */
import { all } from 'redux-saga/effects';
import { cardSagaWatchers }  from '../card/cardSagas';

export default function* rootSaga() {
  yield all ([
    ...cardSagaWatchers,
  ]);
}
