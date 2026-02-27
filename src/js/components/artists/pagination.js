import Pagination from 'tui-pagination';
import '../../../../node_modules/tui-pagination/dist/tui-pagination.min.css';
import { createArtistsList } from './createList';
import { getArtists } from '../../api/artists-api';
import refs from '../../refs';
import './pagination.css';

export function createPagination(totalArtists, limit, page, value) {
  const container = document.querySelector('#pagination');
  const paginationOptions = {
    totalItems: totalArtists,
    itemsPerPage: limit,
    visiblePages: 5,
    page: page,
    centerAlign: true,

    template: {
      page: '<a href="#" class="tui-page-btn pages">{{page}}</a>',
      currentPage: '<a class="tui-page-btn tui-is-selected pages">{{page}}</a>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(container, paginationOptions);

  if (totalArtists > 8) {
    const pages = [
      ...document.querySelectorAll('.tui-pagination .tui-page-btn.pages'),
    ];
    const totalPages = Math.ceil(totalArtists / limit);

    pages[0].textContent = page;
    pages[3].textContent = '...';
    pages[3].style.pointerEvents = 'none';
    pages[4].textContent = totalPages;
  }

  pagination.on('afterMove', async event => {
    const currentPage = event.page;

    const pages = [
      ...document.querySelectorAll('.tui-pagination .tui-page-btn.pages'),
    ];
    const totalPages = Math.ceil(totalArtists / limit);
    if (currentPage < 3) {
      pages[0].textContent = page;
      pages[3].textContent = '...';
      pages[3].style.pointerEvents = 'none';
      pages[4].textContent = totalPages;
    }

    if (currentPage >= 3 && currentPage <= totalPages - 2) {
      pages[0].textContent = page;
      pages[1].textContent = '...';
      pages[1].style.pointerEvents = 'none';
      pages[3].textContent = '...';
      pages[3].style.pointerEvents = 'none';
      pages[4].textContent = totalPages;
    }

    if (currentPage >= totalPages - 1) {
      pages[0].textContent = page;
      pages[1].textContent = '...';
      pages[1].style.pointerEvents = 'none';
    }
    const { artists } = await getArtists({
      page: currentPage,
      ...value,
    });

    refs.listArtists.innerHTML = '';
    createArtistsList(artists, page);
    scrollTo(refs.listArtists);
  });
}

function scrollTo(el) {
  el.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
}
