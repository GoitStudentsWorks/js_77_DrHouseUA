// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

// init Swiper:
const swiper = new Swiper('.swiper-about', {
  // configure Swiper to use modules

  navigation: {
    nextEl: '.swiper-about-button-next',
    prevEl: '.swiper-about-button-prev',
  },
  pagination: {
    el: '.swiper-about-pagination',
    type: 'bullets',
    clickable: true,
  },
});
