import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
// reducers
import {
  AuthReducer,
  SearchReducer,
  PostReducer,
  FriendReducer,
} from './reducer/index';
export const rootReducer = combineReducers({
  AuthReducer,
  SearchReducer,
  PostReducer,
  FriendReducer,
});

const middleware = applyMiddleware(thunk, createLogger());
export const store = createStore(rootReducer, middleware);
