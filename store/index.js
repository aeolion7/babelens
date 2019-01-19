import { createStore, combineReducers } from 'redux';
import imageReducer from './images';
import textReducer from './text';
import languageReducer from './language';

const mainReducer = combineReducers({
  images: imageReducer,
  language: languageReducer,
  text: textReducer,
});

const store = createStore(mainReducer);

export default store;
