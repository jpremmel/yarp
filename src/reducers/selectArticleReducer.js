import constants from './../constants';
const { initialState, types } = constants;

const selectArticleReducer = (state = initialState.currentPaperId, action) => {
  switch (action.type) {
  case types.SELECT_ARTICLE:
    if (state === action.selectedArticleId) {
      return null;
    } else {
      return action.selectedArticleId;
    }
  case types.REMOVE_ARTICLE:
    return null;
  default:
    return state;
  }
};

export default selectArticleReducer;