import { getArtists } from '../../api/artists-api';
import refs from '../../refs';
import { hideLoader, showLoader } from '../../utils/loader';
import { createArtistsList } from './createList';

const btn = refs.loadMoreArtistsBtn;
const listArtists = refs.listArtists;
let startPage = 1;

export async function onLoadMoreClick() {
  showLoader();
  hideLoadMoreBtn();
  startPage++;
  try {
    const { artists, totalArtists, limit, page } = await getArtists({
      page: startPage,
    });

    const totalPages = Math.ceil(totalArtists / limit);

    if (page < totalPages) {
      showLoadMoreBtn();
    }
    if (page === totalPages) {
      startPage = 1;
      hideLoadMoreBtn();
      listArtists.style.marginBottom = '0px';
    }
    createArtistsList(artists, page);
    scrollDown();
  } catch (error) {
    console.log(error.message);
  } finally {
    hideLoader();
  }
}

function showLoadMoreBtn() {
  if (btn.hasAttribute('hidden')) {
    btn.removeAttribute('hidden');
  }
}

function hideLoadMoreBtn() {
  if (!btn.hasAttribute('hidden')) {
    btn.setAttribute('hidden', '');
  }
}

function scrollDown() {
  const liEl = listArtists.firstElementChild;

  if (!liEl) return;

  const { height } = liEl.getBoundingClientRect();

  window.scrollBy({
    top: height,
    behavior: 'smooth',
  });
}
