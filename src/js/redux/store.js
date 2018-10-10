import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/app';
import rootSaga from '../sagas/app';

export default function configureStore(preloadedState) {
  let initialState = preloadedState;
  const savedStore = localStorage.getItem('store') && JSON.parse(localStorage.getItem('store') || '');

  if (savedStore) {
    initialState = savedStore;
  }
  const sagaMiddleware = createSagaMiddleware();
  const middlewareEnhancer = applyMiddleware(sagaMiddleware, thunkMiddleware);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);
  const store = createStore(rootReducer(), initialState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers/app', () => store.replaceReducer(rootReducer()));
  }

  sagaMiddleware.run(rootSaga);

  return store;
}
