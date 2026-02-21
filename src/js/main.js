import './utils/swiper';
import './components/artists/artists';
import { openArtistModal } from './render/render-modal';

// Handle artist modal opening
const artistsList = document.querySelector('.artists-list');
if (artistsList) {
  artistsList.addEventListener('click', e => {
    const btn = e.target.closest('.list-item-btn');
    if (!btn) return;

    const artistId = btn.closest('[data-artist-id]').dataset.artistId;
    if (artistId) {
      openArtistModal(artistId);
    }
  });
}
