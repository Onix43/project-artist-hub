import sprite from '../../../assets/icons/symbol-defs.svg';

const emptyImg = '/empty-img.webp';
const emptyDescr =
  'Description empty<br/> Please add description on backend!!!!';

export function createCard(artist) {
  const { _id, strArtist, strBiographyEN, strArtistThumb, genres } = artist;
  return `
      <li class="artists-list-item" data-artist-id="${_id}">
        <div class="list-item-img">
          <img src="${strArtistThumb || emptyImg || (strArtistThumb ?? emptyImg)}" alt="${strArtist}" loading="lazy"/>
        </div>
        <ul class="artists-tags-list">
          ${
            genres.length !== 0
              ? genres
                  .map(genre => {
                    return `
              <li class="tags-list-item">${genre}</li>
            `;
                  })
                  .join('')
              : `<li class="tags-list-item">No ganres provided</li>`
          }
        </ul>
        <h4 class="list-item-title">${strArtist}</h4>
        <p class="list-item-descr">
          ${(strBiographyEN ?? emptyDescr) || strBiographyEN || emptyDescr}
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
