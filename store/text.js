const initialState = {
  currentText: '',
  recentText: [], // last 5 pieces of text
};

const GOT_TEXT = 'GOT_TEXT';

const gotText = text => {
  return {
    type: GOT_TEXT,
    text,
  };
};

const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_TEXT:
      return { ...state, currentText: action.text };
    default:
      return state;
  }
};

export default textReducer;
