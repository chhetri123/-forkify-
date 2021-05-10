import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTOPage = +btn.dataset.goto;
      handler(goTOPage);
    });
  }
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page 1,and there are other pages
    if (currPage === 1 && numPages > 1) {
      return ` <button data-goto="${
        currPage + 1
      }"class="btn--inline pagination__btn--next">
            <span>page${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // page 1,and there are no other pages
    // if (currPage && !numPAges) {
    //   return 'Page 1 ,other no';
    // }

    // last page result

    if (currPage === numPages && numPages > 1) {
      return `
     <button data-goto="${
       currPage - 1
     }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>page ${currPage - 1}</span>
          </button>

         `;
    }
    // other page

    if (currPage < numPages) {
      return `  <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>page ${currPage - 1}</span>
          </button>
          <button data-goto="${
            currPage + 1
          }"class="btn--inline pagination__btn--next">
            <span>page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // page 1,and there are no other pages
    return '';
  }
}

export default new PaginationView();
