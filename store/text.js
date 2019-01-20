const initialState = {
  lastDetectedText: '',
  recentTranslations: [],
};

const DETECTED_TEXT = 'DETECTED_TEXT';
const TRANSLATED_TEXT = 'TRANSLATED_TEXT';

export const detectedText = textObj => {
  return {
    type: DETECTED_TEXT,
    textObj,
  };
};

export const translatedTextDirectly = textObj => {
  return {
    type: TRANSLATED_TEXT,
    textObj,
  };
};

const textReducer = (state = initialState, action) => {
  const trimTranslationArray = () => {
    state.recentTranslations = state.recentTranslations.slice(1);
  };

  switch (action.type) {
    case DETECTED_TEXT:
      if (state.recentTranslations.length >= 10) {
        trimTranslationArray();
      }
      return {
        ...state,
        lastDetectedText: action.textObj.recognizedText,
        recentTranslations: [...state.recentTranslations, action.textObj],
      };
    case TRANSLATED_TEXT:
      if (state.recentTranslations.length >= 10) {
        trimTranslationArray();
      }
      return {
        ...state,
        recentTranslations: [...state.recentTranslations, action.textObj],
      };
    default:
      return state;
  }
};

export default textReducer;
