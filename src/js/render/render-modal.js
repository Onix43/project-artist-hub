import { msToMinutesSeconds } from '../utils/seconds-convert.js';
import sprite from '../../assets/icons/symbol-defs.svg';

export function renderModalContent(content, data) {
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
