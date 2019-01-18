const initialState = {
  currentImage: '',
  recentImages: [], // an array of the last 5 images taken
};

const GOT_IMAGE = 'GOT_IMAGE';

const gotImage = image => {
  return {
    type: GOT_IMAGE,
    image,
  };
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_IMAGE:
      return { ...state, currentImage: action.image };
    default:
      return state;
  }
};

export default imageReducer;
