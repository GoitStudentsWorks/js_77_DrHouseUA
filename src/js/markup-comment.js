import axios from 'axios';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'starability/starability-css/starability-all.css';

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
        <div class="swiper-slide swiper-comment-slide">
  <div class="rating value-${res.rate} star-svg half small">
    <div class="star-container">
      <div class="star">
            <svg class="star-empty">
                <use href="/star-rating.icons.svg#star-empty"></use>
            </svg>
            <svg class="star-half">
                <use href="/star-rating.icons.svg#star-half"></use>
            </svg>
            <svg class="star-filled">
                <use href="/star-rating.icons.svg#star-filled"></use>
            </svg>
        </div>
      <div class="star">
        <svg class="star-empty" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-outline"></use>
        </svg>
        <svg class="star-half" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-half"></use>
        </svg>
        <svg class="star-filled" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-filled"></use>
        </svg>
      </div>
        <div class="star">
        <svg class="star-empty" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-outline"></use>
        </svg>
        <svg class="star-half" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-half"></use>
        </svg>
        <svg class="star-filled" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-filled"></use>
        </svg>
      </div>
         <div class="star">
        <svg class="star-empty" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-outline"></use>
        </svg>
        <svg class="star-half" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-half"></use>
        </svg>
        <svg class="star-filled" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-filled"></use>
        </svg>
      </div>
            <div class="star">
        <svg class="star-empty" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-outline"></use>
        </svg>
        <svg class="star-half" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-half"></use>
        </svg>
        <svg class="star-filled" width="20px" height="19px">
          <use href="../svg/icons.svg#icon-star-filled"></use>
        </svg>
      </div>
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
      nextEl: '.stories-next',
      prevEl: '.stories-prev',
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
