// scroll-up.js
import refs from '../../refs';
export function initScrollUp(button) {
  if (!button) return;

  const toggleVisibility = () => {
    const scrollPosition =
      window.scrollY || document.documentElement.scrollTop;

    button.classList.toggle('is-visible', scrollPosition > 300);
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  window.addEventListener('load', toggleVisibility);

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
initScrollUp(refs.scrollUpBtn)
