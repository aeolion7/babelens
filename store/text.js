const initialState = {
  lastDetectedText: '',
  recentTranslations: [],
};

const DETECTED_TEXT = 'DETECTED_TEXT';

export const detectedText = textObj => {
  return {
    type: DETECTED_TEXT,
    textObj,
  };
};

const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETECTED_TEXT:
      if (state.recentTranslations.length >= 10) {
        state.recentTranslations = state.recentTranslations.slice(1);
      }
      return {
        ...state,
        lastDetectedText: action.textObj.recognizedText,
        recentTranslations: [...state.recentTranslations, action.textObj],
      };
    default:
      return state;
  }
};

export default textReducer;
