import { getArtistById } from '../../api/artists-api';
import { renderModalContent } from '../../render/render-modal';

let currentEventListeners = [];

export async function openArtistModal(artistId) {
  const modal = document.querySelector('.modal-artist');
  const closeBtn = document.querySelector('.modal-artist-close');
  const loader = document.querySelector('.modal-artist-loader');
  const content = document.querySelector('.modal-artist-content');

  if (!modal || !closeBtn || !loader || !content) {
    console.error('Modal elements not found in DOM');
    return;
  }

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Show loader, hide content
  loader.style.display = 'block';
  content.style.display = 'none';

  try {
    const data = await getArtistById(artistId);
    renderModalContent(content, data);

    // Hide loader, show content
    loader.style.display = 'none';
    content.style.display = 'flex';
  } catch (error) {
    loader.textContent = 'Failed to load artist data. Please try again.';
  }

  // Event listeners for closing
  const handleClose = () => closeModal(modal);
  const handleOutsideClick = e => {
    if (e.target === modal) closeModal(modal);
  };
  const handleEscape = e => {
    if (e.key === 'Escape') closeModal(modal);
  };

  closeBtn.addEventListener('click', handleClose);
  modal.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleEscape);

  currentEventListeners = [
    { el: closeBtn, event: 'click', handler: handleClose },
    { el: modal, event: 'click', handler: handleOutsideClick },
    { el: document, event: 'keydown', handler: handleEscape },
  ];
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';

  // Remove all event listeners
  currentEventListeners.forEach(({ el, event, handler }) => {
    el.removeEventListener(event, handler);
  });
  currentEventListeners = [];
}
