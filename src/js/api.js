import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const categoryContainer = document.querySelector('.category-nav');
const showMoreBtn = document.querySelector('.showmore-btn');

const api = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/',
  timeout: 5000,
  headers: { accept: 'application/json' },
});

let allPets = [];
let currentCategory = 'Всі';
let currentPage = 1;

function getLimit() {
  return window.innerWidth >= 1440 ? 9 : 8;
}

function clearGallery() {
  gallery.innerHTML = '';
}

function renderCards(pets) {
  pets.forEach(pet => {
    const card = document.createElement('article');
    card.classList.add('pet-card');
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img class="pet-card-image" src="${pet.image}" alt="Фото ${pet.name}, ${pet.age}, ${pet.gender}" />
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
    `;
    gallery.appendChild(card);
  });
}

function renderFilteredCards() {
  const limit = getLimit();

  const filtered =
    currentCategory === 'Всі'
      ? allPets
      : allPets.filter(pet =>
          pet.categories.some(cat => cat.name === currentCategory)
        );

  const totalPages = Math.ceil(filtered.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const petsToRender = filtered.slice(startIndex, endIndex);

  renderCards(petsToRender);

  showMoreBtn.style.display = currentPage >= totalPages ? 'none' : 'block';
}

async function fetchPets() {
  try {
    const response = await api.get('api/animals');
    allPets = response.data.animals || [];
    renderFilteredCards();
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити тваринок. Спробуйте пізніше.',
      position: 'topRight',
    });
    console.error('Axios error:', error);
  }
}

async function fetchCategories() {
  try {
    const response = await api.get('api/categories');
    const categories = response.data || [];
    renderCategoryButtons(['Всі', ...categories.map(c => c.name)]);
  } catch (error) {
    console.error('Помилка завантаження категорій:', error);
  }
}

function renderCategoryButtons(names) {
  categoryContainer.innerHTML = '';
  names.forEach(name => {
    const btn = document.createElement('button');
    btn.classList.add('category-item');
    btn.textContent = name;
    btn.dataset.category = name;
    if (name === 'Всі') btn.classList.add('active');

    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.category-item')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentCategory = name;
      currentPage = 1;
      clearGallery();
      renderFilteredCards();
    });

    categoryContainer.appendChild(btn);
  });
}

showMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  renderFilteredCards();
});

// Старт
fetchCategories();
fetchPets();
