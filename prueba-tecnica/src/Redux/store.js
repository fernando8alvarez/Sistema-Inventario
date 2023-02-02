import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from './reducer.js';
import thunk from 'redux-thunk';

const store = createStore(
  Reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => console.log(store));

export default store;