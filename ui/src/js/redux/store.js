import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(preloadedState) {
  let initialState = preloadedState;
  const savedStore = localStorage.getItem('app') && JSON.parse(localStorage.getItem('app') || '');

  if (savedStore) {
    initialState = savedStore;
  }
  const sagaMiddleware = createSagaMiddleware();
  const middlewareEnhancer = applyMiddleware(sagaMiddleware, thunkMiddleware);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);
  const store = createStore(rootReducer(), initialState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers/index', () => store.replaceReducer(rootReducer()));
  }

  sagaMiddleware.run(rootSaga);

  store.subscribe(() => {
    localStorage.setItem('app', JSON.stringify(store.getState()));
  });

  return store;
}
