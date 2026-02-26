import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// init Swiper:
const swiper = new Swiper('.swiper', {
  spaceBetween: 20,
  speed: 500,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // configure Swiper to use modules
  modules: [Navigation],
});
const bulletFirst = document.querySelector('.bullet-first');
const bulletMiddle = document.querySelector('.bullet-middle');
const bulletLast = document.querySelector('.bullet-last');

function updatePagination() {
  const total = swiper.slides.length;
  const active = swiper.activeIndex;

  bulletFirst.classList.remove('is-active');
  bulletMiddle.classList.remove('is-active');
  bulletLast.classList.remove('is-active');

  if (active === 0) bulletFirst.classList.add('is-active');
  else if (active === total - 1) bulletLast.classList.add('is-active');
  else bulletMiddle.classList.add('is-active');
}

swiper.on('slideChange', updatePagination);
updatePagination();

bulletFirst.addEventListener('click', () => swiper.slideTo(0));
bulletLast.addEventListener('click', () =>
  swiper.slideTo(swiper.slides.length - 1)
);
bulletMiddle.addEventListener('click', () => swiper.slideTo(1));
