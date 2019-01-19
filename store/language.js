const initialState = {
  originLanguage: 'en',
  targetLanguage: '',
};

const SET_ORIGIN = 'SET_ORIGIN';
const SET_TARGET = 'SET_TARGET';

const setOrigin = originLanguage => {
  return {
    type: SET_ORIGIN,
    originLanguage,
  };
};

const setTarget = targetLanguage => {
  return {
    type: SET_TARGET,
    targetLanguage,
  };
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORIGIN:
      return { ...state, originLanguage: action.originLanguage };
    case SET_TARGET:
      return { ...state, targetLanguage: action.targetLanguage };
    default:
      return state;
  }
};

export default languageReducer;
