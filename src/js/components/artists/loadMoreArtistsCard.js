import { getArtists } from '../../api/artists-api';
import refs from '../../refs';
import { hideLoader, showLoader } from '../../utils/loader';
import { createArtistsList } from './createArtistsList';

const btn = refs.loadMoreArtistsBtn;
const listArtists = refs.listArtists;
let startPage = 1;

export async function onLoadMoreClick() {
  showLoader();
  //   hideLoadMoreBtn();
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
    }
    createArtistsList(artists, page);
  } catch (error) {
    console.log(error.message);
  } finally {
    hideLoader();
  }
}

export function showLoadMoreBtn() {
  if (btn.hasAttribute('hidden')) {
    btn.removeAttribute('hidden');
    listArtists.style.marginBottom = 32;
  }
}

export function hideLoadMoreBtn() {
  if (!btn.hasAttribute('hidden')) {
    btn.addAttribute('hidden');
    listArtists.style.marginBottom = 0;
  }
}
