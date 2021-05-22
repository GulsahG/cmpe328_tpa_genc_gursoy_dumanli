import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';
import commmentReducer from './commentReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
  comments: commmentReducer
});