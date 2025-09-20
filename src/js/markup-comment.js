import axios from 'axios';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export function getAPI() {
  axios.defaults.baseURL = 'https://paw-hut.b.goit.study/';

  return axios
    .get('/api/feedbacks')
    .then(response => {
      console.log(response.data.feedbacks);
      return response.data.feedbacks;
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
      throw error;
    });
}

export function markupComment(data) {
  const container = document.querySelector('.stories-swiper .swiper-wrapper');
  const markup = data
    .map(res => {
      return `
        <div class="swiper-slide">
          <p>${res.description}</p>
          <p class='author-comment'>${res.author}</p>
        </div>
      `;
    })
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
}

getAPI().then(data => {
  markupComment(data);

  new Swiper('.stories-swiper', {
    loop: false,
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
    },
  });
});
