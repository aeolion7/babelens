import { createStore, combineReducers } from 'redux';
import imageReducer from './images';
import textReducer from './text';

const mainReducer = combineReducers({
  images: imageReducer,
  text: textReducer,
});

const store = createStore(mainReducer);

export default store;
