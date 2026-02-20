import { getArtists } from '../../api/artists-api';
import refs from '../../refs';

console.log(refs.listArtists);
const { artists } = await getArtists();

function createArtistsList() {
  const markup = artists
    .map(({ _id, strArtist, strBiographyEN, strArtistThumb, genres }) => {
      return `
        <li class="artists-list-item" data-artist-id="${_id}">
          <div class="list-item-img">
            <img src="${strArtistThumb}" alt="${strArtist}" />
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
            Load More
            <span>
              <svg width="8" height="14">
                <use href="./assets/icons/symbol-defs.svg#learn-more"></use>
              </svg>
            </span>
          </button>
        </li>
      `;
    })
    .join('');
  refs.listArtists.insertAdjacentHTML('beforeend', markup);
}

createArtistsList();
