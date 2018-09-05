import { applyMiddleware, compose, createStore } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory';
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import saga from './sagas';
import apiMiddleware from './middlewares/api';
import editorModalMiddleware from './middlewares/editor-modal';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

function configureStoreProd(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    reactRouterMiddleware,
    sagaMiddleware,
    apiMiddleware,
    editorModalMiddleware
  ];

  const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );

  sagaMiddleware.run(saga);

  return store;
}

function configureStoreDev(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),
    reactRouterMiddleware,
    sagaMiddleware,
    apiMiddleware,
    editorModalMiddleware
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(reducers, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  sagaMiddleware.run(saga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
