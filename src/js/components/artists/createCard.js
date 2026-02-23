import sprite from '../../../assets/icons/symbol-defs.svg';

export function createCard(artist) {
  const { _id, strArtist, strBiographyEN, strArtistThumb, genres } = artist;
  return `
      <li class="artists-list-item" data-artist-id="${_id}">
        <div class="list-item-img">
          <img src="${strArtistThumb}" alt="${strArtist}" loading="lazy"/>
        </div>
        <ul class="artists-tags-list">
          ${genres
            .map(genre => {
              return `
              <li class="tags-list-item">${genre}</li>
            `;
            })
            .join('')}
        </ul>
        <h3 class="list-item-title">${strArtist}</h3>
        <p class="list-item-descr">
          ${strBiographyEN}
        </p>
        <button class="list-item-btn">
          Learn More
          <span>
            <svg width="8" height="14">
              <use href="${sprite}#learn-more"></use>
            </svg>
          </span>
        </button>
      </li>
    `;
}
