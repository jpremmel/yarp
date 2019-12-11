import * as types from './../constants/ActionTypes';

export function fetchSearchResults(search) {
  return function (dispatch) {
    search = search.replace(' ', '_');
    return fetch('https://core.ac.uk:443/api-v2/articles/search/' + search + '?page=1&pageSize=10&metadata=true&citations=false&similar=false&duplicate=false&urls=false&faithfulMetadata=false&apiKey=4b5w1ZMhAfgeOtQTFURDWVmIuNjoq6kc').then(
      response => response.json(),
      error => console.log("Error occurred. ", error)
    ).then(function (json) {
        if (json.data.length > 0) {
          let searchResults = {};
          for (let i = 0; i < json.data.length; i++) {
            let newArticle = {
              coreId: json.data[i].id,
              author: json.data[i].authors[0],
              title: json.data[i].title,
              year: json.data[i].year,
              downloadUrl: json.data[i].downloadUrl,
              description: json.data[i].description
            };
            searchResults = Object.assign({}, searchResults, {
              [newArticle.coreId]: newArticle
            });
          }
          dispatch(receiveSearchResults(searchResults));
        }
      else {
        console.log('No search results.');
        dispatch(searchError());
      }
    }, error => {
      console.log('Error occurred. ', error);
      dispatch(searchError());
    });
  };
}

export const requestArticles = search => ({
  type: types.REQUEST_ARTICLES,
  search
});

export const receiveSearchResults = searchResults => ({
  type: types.RECEIVE_SEARCH_RESULTS,
  searchResults
});

export const selectArticle = selectedArticleId => ({
  type: types.SELECT_ARTICLE,
  selectedArticleId
});

export const saveArticle = article => ({
  type: types.SAVE_ARTICLE,
  article
});

export const removeArticle = id => ({
  type: types.REMOVE_ARTICLE,
  id
});

export const searchError = () => ({
  type: types.SEARCH_ERROR
});