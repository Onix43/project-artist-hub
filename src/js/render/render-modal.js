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
    genres: genres,
    albumsList: albums,
  } = data;

  console.log(data);

  // Name
  content.querySelector('.modal-artist-name').textContent = name || '';

  // Image
  const imgEl = content.querySelector('.modal-artist-image');
  imgEl.src = strArtistThumb || '';
  imgEl.alt = name || 'Artist photo';

  // Years
  const yearsEl = content.querySelector('.modal-artist-years-value');
  if (founded && disbanded) {
    yearsEl.textContent = `${founded} – ${disbanded}`;
  } else if (founded) {
    yearsEl.textContent = `${founded} – present`;
  } else {
    yearsEl.textContent = 'Information missing';
  }

  // Gender
  const genderEl = content.querySelector('.modal-artist-gender');
  if (gender) {
    content.querySelector('.modal-artist-gender-value').textContent = gender;
    genderEl.style.display = '';
  } else {
    genderEl.style.display = 'none';
  }

  // Members
  const membersEl = content.querySelector('.modal-artist-members');
  if (members) {
    content.querySelector('.modal-artist-members-value').textContent = members;
    membersEl.style.display = '';
  } else {
    membersEl.style.display = 'none';
  }

  // Country
  content.querySelector('.modal-artist-country-value').textContent =
    country || 'Information missing';

  // Biograph
  const biographyText = biography
    .replace(/\n/g, '<br>')
    .split('<br>')
    .slice(0, 1)
    .join('<br>');
  content.querySelector('.modal-artist-description-text').innerHTML =
    biographyText || 'No biography available.';

  // Genres
  const genreList = content.querySelector('.modal-artist-genre-list');
  genreList.innerHTML = '';
  console.log(genres);
  if (genres && genres.length) {
    genres.forEach(genre => {
      const li = document.createElement('li');
      li.className = 'modal-artist-genre-item';
      li.textContent = genre;
      genreList.appendChild(li);
    });
  }

  // Albums
  const albumList = content.querySelector('.modal-artist-album-list');
  albumList.innerHTML = '';
  if (albums && albums.length) {
    for (let index = 0; index < 8; index++) {
      const album = albums[index];
      const li = document.createElement('li');
      li.className = 'modal-artist-album-item';

      const h4 = document.createElement('h4');
      h4.textContent = album.strAlbum;
      li.appendChild(h4);

      const trackUl = document.createElement('ul');
      trackUl.className = 'modal-artist-track-header';
      li.appendChild(trackUl);

      const p = document.createElement('p');
      p.className = 'modal-artist-track-title-name';
      p.textContent = 'Track';
      trackUl.appendChild(p);

      const p2 = document.createElement('p');
      p2.className = 'modal-artist-track-title-time';
      p2.textContent = 'Time';
      trackUl.appendChild(p2);

      const p3 = document.createElement('p');
      p3.className = 'modal-artist-track-title-link';
      p3.textContent = 'Link';
      trackUl.appendChild(p3);

      if (album.tracks && album.tracks.length) {
        const trackUl = document.createElement('ul');
        trackUl.className = 'modal-artist-track-list';

        album.tracks.forEach(track => {
          console.log(track);
          const trackLi = document.createElement('li');
          trackLi.className = 'modal-artist-track-item';

          const nameP = document.createElement('p');
          nameP.className = 'modal-artist-track-name';
          nameP.textContent = track.strTrack;
          trackLi.appendChild(nameP);

          const timeP = document.createElement('p');
          timeP.className = 'modal-artist-track-time';
          timeP.textContent = msToMinutesSeconds(track.intDuration) || '';
          trackLi.appendChild(timeP);

          if (track.movie) {
            const link = document.createElement('a');
            link.className = 'modal-artist-track-link';
            link.href = track.movie;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', `Watch ${track.name} on YouTube`);
            link.innerHTML = `<svg class="modal-artist-track-icon" width="24" height="24">
              <use href="${sprite}#youtube"></use>
            </svg>`;
            trackLi.appendChild(link);
          } else {
            const link = document.createElement('a');
            link.className = 'modal-artist-track-link';
            link.innerHTML = '';
            trackLi.appendChild(link);
          }

          trackUl.appendChild(trackLi);
        });

        li.appendChild(trackUl);
      }

      albumList.appendChild(li);
    }
  }
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
