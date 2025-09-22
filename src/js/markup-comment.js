import axios from 'axios';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'starability/starability-css/starability-all.css';

export function getAPI() {
  axios.defaults.baseURL = 'https://paw-hut.b.goit.study/';

  return axios
    .get('/api/feedbacks')
    .then(response => {
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
      <div class="swiper-slide swiper-comment-slide">
        <div class="rating value-${res.rate} star-svg half small">
          <div class="star-container">
            ${generateStars(res.rate)}
          </div>
        </div>
        <div>
          <p class="description-comment">${res.description}</p>
          <p class="author-comment">${res.author}</p>
        </div>
      </div>
    `;
    })
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
}

getAPI().then(data => {
  console.log(data);
  markupComment(data);

  new Swiper('.stories-swiper', {
    loop: false,
    slidesPerView: 1,

    navigation: {
      nextEl: '.swiper-comment-button-next',
      prevEl: '.swiper-comment-button-prev',
    },
    pagination: {
      el: '.stories-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
    },
  });
});

function generateStars(rate) {
  const fullStars = Math.floor(rate);
  const halfStar = rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let stars = '';

  for (let i = 0; i < fullStars; i++) {
    stars += `
      <div class="star">
        <svg class="star-filled" width="20" height="19">
          <use href="../svg/icons.svg#icon-star-filled"></use>
        </svg>
      </div>`;
  }

  if (halfStar) {
    stars += `
      <div class="star">
        <svg class="star-half" width="20" height="19">
          <use href="../svg/icons.svg#icon-star-half"></use>
        </svg>
      </div>`;
  }

  for (let i = 0; i < emptyStars; i++) {
    stars += `
      <div class="star">
        <svg class="star-empty" width="20" height="19">
          <use href="../svg/icons.svg#icon-star-outline"></use>
        </svg>
      </div>`;
  }

  return stars;
}
