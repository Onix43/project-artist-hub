import { getArtists } from '../api/artists-api';
import { createArtistsList } from '../components/artists/createList';
import { createPagination } from '../components/artists/pagination';
import '../components/artists/filters';
import { createFilters } from '../components/artists/filters';
import { getGenres } from '../api/genres-api';
import { hideLoader, showLoader } from '../utils/loader';

export async function renderArtistsList() {
  showLoader();
  try {
    const { artists, totalArtists, limit, page } = await getArtists();
    const genres = await getGenres();

    createArtistsList(artists, page);
    createFilters(genres);
    createPagination(totalArtists, limit, page);
  } catch (error) {
    console.log(error.message);
  } finally {
    hideLoader();
  }
}

renderArtistsList();
