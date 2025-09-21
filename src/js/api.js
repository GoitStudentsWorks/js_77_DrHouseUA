// import axios from 'axios';
// const axios = require('axios');

// const BASE_URL = 'https://paw-hut.b.goit.study/';
// const ENDPOINTS = {
//   animalList: 'api/animals',
//   category: 'api/categories',
// };

// const instance = axios.create({
//   baseURL: BASE_URL,
//   timeout: 1000,
// });

// // Works just like axios(config)
// instance({
//   url: ENDPOINTS.animalList,
//   method: 'get',
// });

// instance.get('/longRequest', {
//   timeout: 5000,
// });

// async function getAnimalList() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const categoryButtons = document.querySelectorAll('.category-item');

const showMoreBtnEL = document.querySelector('.showmore-btn');

let allPets = [];

// Axios конфігурація з правильним baseURL
const api = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/',
  timeout: 5000,
  headers: {
    accept: 'application/json',
  },
});

function clearGallery() {
  gallery.innerHTML = '';
}

// Рендер карток
function renderCards(category) {
  const filtered =
    category === 'Всі'
      ? allPets
      : allPets.filter(pet => pet.categories[0].name === category);

  if (filtered.length === 0) {
    gallery.innerHTML = '<p>Немає тваринок у цій категорії</p>';
    return;
  }

  filtered.forEach(pet => {
    const card = document.createElement('div');
    card.classList.add('pet-card');

    card.innerHTML = `
      <div class="card-img-wrapper">
       <img class="pet-card-image" src="${pet.image}" alt="${pet.name}" />
      </div>
      <div class="pet-card-info">
        <span class="pet-card-type">${pet.species}</span>
        <h3 class="pet-card-name">${pet.name}</h3>
        <span class="pet-category">${pet.categories[0].name}</span>
        <div class="pet-card-meta">
        <p class="pet-card-age">${pet.age}</p>
        <p class="pet-card-gender">${pet.gender}</p>
        </div>
        
      </div>
        <p class="pet-card-desc">${pet.shortDescription}</p>
        <button class="pet-card-btn">Дізнатись більше</button>
    `;
    gallery.appendChild(card);
  });
}

// Завантаження з API
const screenWidth = window.innerWidth;
const limit = screenWidth >= 1440 ? 9 : 8;

let currentPage = 1;

async function fetchPets(page = 1) {
  try {
    const screenWidth = window.innerWidth;
    const limit = screenWidth >= 1440 ? 9 : 8;

    const response = await api.get(`api/animals?page=${page}&limit=${limit}`);
    console.log('API response:', response.data);

    const newPets = Array.isArray(response.data)
      ? response.data
      : response.data.animals || [];

    allPets = [...newPets];

    renderCards('Всі');
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити тваринок. Спробуйте пізніше.',
      position: 'topRight',
      timeout: 5000,
    });
    console.error('Axios error:', error);
  }
}

// Обробка кліків по категоріях
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    clearGallery();
    renderCards(button.dataset.category);
    console.log(button.dataset.category);
  });
});

// Кнопка завантаження картинок

showMoreBtnEL.addEventListener('click', onClick);

function onClick(event) {
  currentPage += 1;
  fetchPets(currentPage);
}

// Старт
fetchPets(currentPage);
