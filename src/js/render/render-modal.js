import { getArtistById } from '../api/artists-api.js';
import sprite from '../../assets/icons/symbol-defs.svg';

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
    console.error('Error fetching artist data:', error);
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

function renderModalContent(content, data) {
  const {
    strArtist: name,
    strArtistThumb,
    intFormedYear: founded,
    intDiedYear: disbanded,
    strGender: gender,
    intMembers: members,
    strCountry: country,
    strBiographyEN: biography,
    genres = [],
    albumsList: albums = [],
  } = data;

  // Years active
  let yearsActive = 'Information missing';
  if (founded && disbanded) {
    yearsActive = `${founded} – ${disbanded}`;
  } else if (founded) {
    yearsActive = `${founded} – present`;
  }

  // Genres markup
  const genresMarkup = genres.length
    ? genres
        .map(genre => `<li class="modal-artist-genre-item">${genre}</li>`)
        .join('')
    : '<li class="modal-artist-genre-item">No genres listed</li>';

  // Albums markup
  const albumsMarkup = albums
    .map(album => {
      const tracksMarkup = (album.tracks || [])
        .map(track => {
          const duration = msToMinutesSeconds(track.intDuration) || '';
          const youtubeLink = track.movie
            ? `<a class="modal-artist-track-link" href="${track.movie}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${track.strTrack} on YouTube">
            <svg class="modal-artist-track-icon" width="24" height="24">
              <use href="${sprite}#youtube"></use>
            </svg>
           </a>`
            : '<div class="modal-artist-track-link"></div>';

          return `
        <li class="modal-artist-track-item">
          <p class="modal-artist-track-name">${track.strTrack}</p>
          <p class="modal-artist-track-time">${duration}</p>
          ${youtubeLink}
        </li>
      `;
        })
        .join('');

      return `
      <li class="modal-artist-album-item">
        <h4 class="modal-artist-album-name">${album.strAlbum}</h4>
        <div class="modal-artist-track-header">
          <p class="modal-artist-track-title-name">Track</p>
          <p class="modal-artist-track-title-time">Time</p>
          <p class="modal-artist-track-title-link">Link</p>
        </div>
        <ul class="modal-artist-track-list">
          ${tracksMarkup}
        </ul>
      </li>
    `;
    })
    .join('');

  // Biography - get first paragraph or slice if too long
  const biographyText = biography
    ? biography.split('\n')[0]
    : 'No biography available.';

  content.innerHTML = `
    <h3 class="modal-artist-name">${name || ''}</h3>

    <div class="modal-artist-header">
      <img class="modal-artist-image" src="${strArtistThumb || ''}" alt="${name || 'Artist photo'}" />

      <div class="modal-artist-details">
        <div class="modal-artist-info">
          <p class="modal-artist-years">
            <span class="modal-artist-info-label">Years active</span>
            <span class="modal-artist-years-value">${yearsActive}</span>
          </p>
          ${
            gender
              ? `
          <p class="modal-artist-gender">
            <span class="modal-artist-info-label">Sex</span>
            <span class="modal-artist-gender-value">${gender}</span>
          </p>`
              : ''
          }
          ${
            members
              ? `
          <p class="modal-artist-members">
            <span class="modal-artist-info-label">Members</span>
            <span class="modal-artist-members-value">${members}</span>
          </p>`
              : ''
          }
          <p class="modal-artist-country">
            <span class="modal-artist-info-label">Country</span>
            <span class="modal-artist-country-value">${country || 'Information missing'}</span>
          </p>
        </div>

        <div class="modal-artist-description">
          <h4 class="modal-artist-description-title">Biography</h4>
          <p class="modal-artist-description-text">${biographyText}</p>
        </div>
        
        <div class="modal-artist-genres">
          <ul class="modal-artist-genre-list">
            ${genresMarkup}
          </ul>
        </div>
      </div>
    </div>

    <div class="modal-artist-albums">
      <h4 class="modal-artist-albums-title">Albums</h4>
      <ul class="modal-artist-album-list">
        ${albumsMarkup}
      </ul>
    </div>
  `;
}

function msToMinutesSeconds(milliseconds) {
  // Calculate total seconds (rounding can be adjusted based on desired precision)
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate minutes (using modulo 60 to reset after each hour if needed, though not strictly required for just minutes/seconds)
  const minutes = Math.floor(totalSeconds / 60);

  // Calculate remaining seconds using the modulo operator
  const seconds = totalSeconds % 60;

  // Format seconds to always be two digits (e.g., '05' instead of '5')
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${minutes}:${formattedSeconds}`;
}
