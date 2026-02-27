import '../../../../node_modules/choices.js/public/assets/styles/choices.min.css';
import Choices from '../../../../node_modules/choices.js';
import './filters.css';
import { createListGenre } from './create-genre-list.js';
import { getArtists } from '../../api/artists-api.js';
import { createFilterError } from './createFilterError';
import refs from '../../refs.js';
import { createArtistsList } from './createList.js';
import { createPagination } from './pagination.js';
import { searchState } from '../../utils/variables.js';
import { hideLoader, showLoader } from '../../utils/loader.js';

const sorting = document.querySelector('.js-filters-select-sorting');
const genre = document.querySelector('.js-filters-select-genre');
const searchBtn = document.querySelector('.js-filters-btn-search');
const searchInput = document.querySelector('.js-filters-search-input');
const btnFilter = document.querySelector('.js-sidebar-btn-search');
const arrow = btnFilter.querySelector('.js-sidebar-search-arrow');
const isArrowUp = arrow.classList.contains('arrow-up');
const filtersWrapper = document.querySelector('.js-artists-filter-wrapper');
const container = document.querySelector('#pagination');
const resetBtn = document.querySelector('.js-sidebar-btn-reset');

let sortingChoices;
let genreChoices;

if (isArrowUp) arrow.classList.remove('arrow-up');

btnFilter.addEventListener('click', onFiltersBtnClick);
searchBtn.addEventListener('click', onSearchByName);
searchInput.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;
  onSearchByName();
});
sorting.addEventListener('change', onSortingByName);
genre.addEventListener('change', onSortingByGenre);
resetBtn.addEventListener('click', onResetFilters);

export function createFilters(genres) {
  createListGenre(genre, genres);

  sortingChoices = new Choices(sorting, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    placeholder: true,
    placeholderValue: 'Sorting',
  });
  genreChoices = new Choices(genre, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    placeholder: true,
    placeholderValue: 'Genre',
  });
}

async function sortingArtists(value) {
  showLoader();
  container.innerHTML = '';

  try {
    refs.listArtists.innerHTML = '';
    const { artists, totalArtists, limit, page } = await getArtists(value);
    if (totalArtists === 0) {
      container.innerHTML = '';

      refs.listArtists.innerHTML = createFilterError();
      const resetBtnInEmptyList = document.querySelector(
        '.js-empty-artists-btn'
      );
      resetBtnInEmptyList.addEventListener('click', onResetFilters);
      return;
    }
    createArtistsList(artists, totalArtists, limit, page, value);
    createPagination(totalArtists, limit, page, value);
  } catch (error) {
    container.innerHTML = '';
    refs.listArtists.innerHTML = createFilterError();
    const resetBtnInEmptyList = refs.listArtists.querySelector(
      '.js-empty-artists-btn'
    );
    resetBtnInEmptyList.addEventListener('click', onResetFilters);
  } finally {
    hideLoader();
  }
}

function onFiltersBtnClick() {
  arrow.classList.toggle('arrow-up');

  if (!isArrowUp) return;
  filtersWrapper.classList.toggle('hide');
}

function onSearchByName() {
  const value = searchInput.value;
  searchState.name = value;
  const filterredObject = Object.fromEntries(
    Object.entries(searchState).filter(([_, value]) => value !== '')
  );
  sortingArtists(filterredObject);
}

function onSortingByName() {
  const arr = [...sorting.children];
  const finded = arr.find(item => item.selected === true);
  const res = finded.value;

  searchState.sortName = res;
  const filterredObject = Object.fromEntries(
    Object.entries(searchState).filter(([_, value]) => value !== '')
  );
  sortingArtists(filterredObject);
}

function onSortingByGenre() {
  const arr = [...genre.children];
  const finded = arr.find(item => item.selected === true);
  const res = finded.value;

  searchState.genre = res;
  const filterredObject = Object.fromEntries(
    Object.entries(searchState).filter(([_, value]) => value !== '')
  );
  sortingArtists(filterredObject);
}

async function onResetFilters() {
  const { artists, totalArtists, limit, page } = await getArtists();
  sortingChoices.removeActiveItems();
  genreChoices.removeActiveItems();
  searchState.name = '';
  searchState.sortName = '';
  searchState.genre = '';
  searchInput.value = '';
  refs.listArtists.innerHTML = '';
  createArtistsList(artists, page);
  createPagination(totalArtists, limit, page);
}
