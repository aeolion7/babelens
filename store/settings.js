const initialState = {
  optimization: true,
  previewOCR: true,
};

const TOGGLE_OPTIMIZATION = 'TOGGLE_OPTIMIZATION';
const TOGGLE_OCR_PREVIEW = 'TOGGLE_OCR_PREVIEW';

export const toggleOptimization = () => {
  return {
    type: TOGGLE_OPTIMIZATION,
  };
};

export const toggleOCRPreview = () => {
  return {
    type: TOGGLE_OCR_PREVIEW,
  };
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OPTIMIZATION:
      return { ...state, optimization: !state.optimization };
    case TOGGLE_OCR_PREVIEW:
      return { ...state, previewOCR: !state.previewOCR };
    default:
      return state;
  }
};

export default settingsReducer;
