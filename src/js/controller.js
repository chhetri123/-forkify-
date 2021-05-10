import * as model from './Model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import PaginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // load recipe
    await model.loadRecipe(id);
    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    // get search Query
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    // load search result
    await model.loadSearchResults(query);

    // render results

    resultView.render(model.getSearchResultPage());

    // render initial pagination button
    PaginationView.render(model.state.search);
  } catch (err) {
    resultView.renderError(err);
  }
};
const controlPagination = function (gotoPage) {
  // render new  results

  resultView.render(model.getSearchResultPage(gotoPage));

  // render new pagination button button
  PaginationView.render(model.state.search);
};

// showRecipe();
const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};
init();

//
