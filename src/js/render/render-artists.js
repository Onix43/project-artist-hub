import { getArtists } from '../api/artists-api';
import { createArtistsList } from '../components/artists/createArtistsList';
import '../components/artists/loadMoreArtistsCard';
import { onLoadMoreClick } from '../components/artists/loadMoreArtistsCard';
import refs from '../refs';

refs.loadMoreArtistsBtn.addEventListener('click', onLoadMoreClick);

export async function renderArtistsList() {
  try {
    const { artists, page } = await getArtists();
    console.log(artists);
    createArtistsList(artists, page);
  } catch (error) {
    console.log(error.message);
  }
}

renderArtistsList();
