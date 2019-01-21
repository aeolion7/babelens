const initialState = {
  sourceLanguage: 'en',
  targetLanguage: 'de',
};

const SET_SOURCE = 'SET_SOURCE';
const SET_TARGET = 'SET_TARGET';
const SWAP_LANGUAGES = 'SWAP_LANGUAGES';

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

export const swapLanguages = () => {
  return {
    type: SWAP_LANGUAGES,
  };
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOURCE:
      return { ...state, sourceLanguage: action.sourceLanguage };
    case SET_TARGET:
      return { ...state, targetLanguage: action.targetLanguage };
    case SWAP_LANGUAGES:
      const newTarget = state.sourceLanguage;
      return {
        ...state,
        sourceLanguage: state.targetLanguage,
        targetLanguage: newTarget,
      };
    default:
      return state;
  }
};

export default languageReducer;
