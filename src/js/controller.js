import * as model from './Model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import PaginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import bookmarksView from './views/bookmarksView.js';

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0) update resultView to mark selected search result
    resultView.update(model.getSearchResultPage());
    BookmarksView.update(model.state.bookmarks);
    // load recipe
    await model.loadRecipe(id);
    // rendering recipe
    recipeView.render(model.state.recipe);
    // test
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    // get search Query

    const query = searchView.getQuery();

    if (!query) return;
    resultView.renderSpinner();
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
// update serving
const controlServing = function (newServings) {
  // update the recipe serving state

  model.updateServing(newServings);

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

  //
};
// add bookmark

const controlAddbookmark = function () {
  // Add ?remove book mark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update recipe view
  recipeView.update(model.state.recipe);

  // render book marks
  BookmarksView.render(model.state.bookmarks);
};

// showRecipe();
const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loader spinner
    addRecipeView.renderSpinner();
    // uload the new recipe data
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);
    //Sucess message
    addRecipeView.renderMessage();

    // render bookmark views
    controlBookmarks();
    // change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close form window

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = () => {
  BookmarksView.addHandlerRender(controlBookmarks);
  document;
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  PaginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddbookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

//
