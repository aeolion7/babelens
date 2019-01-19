import { createStore, combineReducers } from 'redux';
import imageReducer from './images';
import textReducer from './text';
import languageReducer from './language';
import settingsReducer from './settings';

const mainReducer = combineReducers({
  images: imageReducer,
  language: languageReducer,
  settings: settingsReducer,
  text: textReducer,
});

const store = createStore(mainReducer);

export default store;
