import refs from '../../refs.js';

if (refs.menu && refs.toggleBtn) {
  const openMenu = () => {
    refs.menu.classList.add('is-open');
    refs.toggleBtn.classList.add('is-open');
    refs.toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-menu-open');
  };

  const closeMenu = () => {
    refs.menu.classList.remove('is-open');
    refs.toggleBtn.classList.remove('is-open');
    refs.toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-menu-open');
  };

  const toggleMenu = () => {
    refs.menu.classList.contains('is-open') ? closeMenu() : openMenu();
  };

  refs.toggleBtn.addEventListener('click', toggleMenu);

  refs.navLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeMenu();
  });
}
