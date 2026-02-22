import refs from '../refs';
const loader = refs.loaderArtists;

export function showLoader() {
  loader.style.display = 'inline-block';
}
export function hideLoader() {
  loader.style.display = 'none';
}
