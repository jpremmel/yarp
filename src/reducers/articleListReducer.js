import constants from './../constants';
const { initialState, types } = constants;
import v4 from 'uuid/v4';

const articleListReducer = (state = initialState.papersById, action) => {
  let newState;
  switch (action.type) {
    case types.SAVE_ARTICLE:
      let newId = v4();
      let article = action.article;
      article.id = newId;
      console.log('SAVING THIS NEW ARTICLE: ', article);
      newState = {...state,
        [newId]: action.article};
      return newState;
    case types.REMOVE_ARTICLE:
      newState = {...state};
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default articleListReducer;