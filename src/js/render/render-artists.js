import { getArtists } from '../api/artists-api';
import { createArtistsList } from '../components/artists/createList';
import { createFilterError } from '../components/artists/createFilterError';
import { onLoadMoreClick } from '../components/artists/loadMoreCard';
import refs from '../refs';

refs.loadMoreArtistsBtn.addEventListener('click', onLoadMoreClick);

async function renderArtistsList() {
  try {
    const { artists, page } = await getArtists();
    createArtistsList(artists, page);
  } catch (error) {
    console.log(error.message);
  }
}

renderArtistsList();
