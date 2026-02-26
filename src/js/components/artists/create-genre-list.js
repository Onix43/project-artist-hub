export function createListGenre(el, genres) {
  const markup = genres
    .map(({ genre }) => {
      return `<option value="${genre}">${genre}</option>`;
    })
    .join('');
  el.insertAdjacentHTML('beforeend', markup);
}
