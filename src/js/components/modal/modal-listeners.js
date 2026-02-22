import refs from '../../refs';
import { openArtistModal } from './artist-modal';

// Handle artist modal opening

refs.listArtists.addEventListener('click', e => {
  const btn = e.target.closest('.list-item-btn');
  if (!btn) return;

  const artistId = btn.closest('[data-artist-id]').dataset.artistId;
  if (artistId) {
    openArtistModal(artistId);
  }
});
