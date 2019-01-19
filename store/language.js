const initialState = {
  sourceLanguage: 'en',
  targetLanguage: 'de',
};

const SET_SOURCE = 'SET_SOURCE';
const SET_TARGET = 'SET_TARGET';

export const setSource = sourceLanguage => {
  return {
    type: SET_SOURCE,
    sourceLanguage,
  };
};

export const setTarget = targetLanguage => {
  return {
    type: SET_TARGET,
    targetLanguage,
  };
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOURCE:
      return { ...state, sourceLanguage: action.sourceLanguage };
    case SET_TARGET:
      return { ...state, targetLanguage: action.targetLanguage };
    default:
      return state;
  }
};

export default languageReducer;
