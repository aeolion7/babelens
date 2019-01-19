const initialState = {
  optimization: false,
};

const TOGGLE_OPTIMIZATION = 'TOGGLE_OPTIMIZATION';

export const toggleOptimization = () => {
  return {
    type: TOGGLE_OPTIMIZATION,
  };
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OPTIMIZATION:
      return { ...state, optimization: !state.optimization };
    default:
      return state;
  }
};

export default settingsReducer;
