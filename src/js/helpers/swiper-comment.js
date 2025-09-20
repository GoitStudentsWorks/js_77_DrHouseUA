import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const storiesSwiper = new Swiper('.stories-swiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,

  navigation: {
    nextEl: '.stories-next',
    prevEl: '.stories-prev',
  },
  pagination: {
    el: '.stories-pagination',
    clickable: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
