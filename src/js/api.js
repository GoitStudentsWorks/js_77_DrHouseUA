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

let allPets = []; // для "Всі"
let currentCategory = 'Всі';
let currentPage = 1;
let totalPages = 1;
let categoryPets = []; // для інших категорій

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
        <img class="pet-card-image" src="${
          pet.image || 'default.jpg'
        }" alt="Фото ${pet.name}, ${pet.age}, ${pet.gender}" />
      </div>
      <div class="pet-card-info">
        <span class="pet-card-type">${pet.species}</span>
        <h3 class="pet-card-name">${pet.name}</h3>
        <span class="pet-category">${
          pet.categories?.[0]?.name || 'Без категорії'
        }</span>
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

function filterPetsByCategory(categoryName, petsArray) {
  console.log(categoryName);
  console.log(petsArray);
  if (categoryName === 'Всі') return petsArray;
  return petsArray.filter(pet =>
    pet.categories.some(cat => cat.name === categoryName)
  );
}

// 🔁 Рендер для "Всі"
function renderFilteredCards(totalPages) {
  const limit = getLimit();
  const filtered = filterPetsByCategory(currentCategory, allPets);
  const petsToRender = filtered.slice(0, currentPage * limit);

  clearGallery();
  renderCards(petsToRender);
  // console.log(filtered.length);
  const localTotalPages = Math.ceil(filtered.length / limit);
  showMoreBtn.style.display = currentPage >= totalPages ? 'none' : 'block';
}

// 🌐 Запит для "Всі"
async function fetchPets(page = 1) {
  try {
    const limit = getLimit();
    const response = await api.get('api/animals', {
      params: { page, limit },
    });

    const newPets = response.data.animals || [];
    const totalItems = response.data.totalItems || 0;
    totalPages = Math.ceil(totalItems / limit);
    console.log(totalPages);
    allPets = [...allPets, ...newPets];
    renderFilteredCards(totalPages);
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити тваринок.',
      position: 'topRight',
    });
    console.error('Axios error:', error);
  }
}

// 🌐 Запит для конкретної категорії
async function fetchPetsForCategory(categoryName, page = 1) {
  try {
    const limit = getLimit();
    const response = await api.get('api/animals', {
      params: { page, limit },
    });

    const newPets = response.data.animals || [];
    console.log(newPets);
    const filtered = filterPetsByCategory(categoryName, newPets);

    if (page === 1) categoryPets = []; // скидаємо при новому виборі
    categoryPets = [...categoryPets, ...filtered];

    const petsToRender = categoryPets.slice(0, page * limit);
    clearGallery();
    renderCards(petsToRender);

    const localTotalPages = Math.ceil(categoryPets.length / limit);
    showMoreBtn.style.display = page >= localTotalPages ? 'none' : 'block';
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити категорію.',
      position: 'topRight',
    });
    console.error('Axios error:', error);
  }
}

// 🧭 Кнопки категорій
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

      if (name === 'Всі') {
        renderFilteredCards();
      } else {
        fetchPetsForCategory(name, currentPage);
      }
    });

    categoryContainer.appendChild(btn);
  });
}

// ➕ Кнопка "Завантажити ще"
showMoreBtn.addEventListener('click', () => {
  currentPage += 1;

  if (currentCategory === 'Всі') {
    fetchPets(currentPage);
  } else {
    fetchPetsForCategory(currentCategory, currentPage);
  }
});

// 🚀 Старт
fetchCategories();
fetchPets(currentPage);

// 📂 Категорії
async function fetchCategories() {
  try {
    const response = await api.get('api/categories');
    const categories = response.data || [];
    renderCategoryButtons(['Всі', ...categories.map(c => c.name)]);
  } catch (error) {
    console.error('Помилка завантаження категорій:', error);
  }
}
