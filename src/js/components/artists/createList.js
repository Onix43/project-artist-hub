import refs from '../../refs';
import { createCard } from './createCard';

export function createArtistsList(list, page = 1) {
  const markup = list.map(createCard).join('');
  return refs.listArtists.insertAdjacentHTML('beforeend', markup);
}
