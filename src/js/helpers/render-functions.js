import { getLimit, filterPetsByCategory } from '../services.js';
import { allPets } from '../api.js';

const gallery = document.querySelector('.gallery');
const categoryContainer = document.querySelector('.category-nav');
const showMoreBtn = document.querySelector('.showmore-btn');

let currentCategory = 'Всі';
export let currentPage = 1;

export function clearGallery() {
  gallery.innerHTML = '';
}

export function renderCards(pets) {
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

export function renderCategoryButtons(names) {
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

      renderFilteredCards();
    });

    categoryContainer.appendChild(btn);
  });
}

export function renderFilteredCards() {
  const limit = getLimit();
  const filtered = filterPetsByCategory(currentCategory, allPets);
  const petsToRender = filtered.slice(0, currentPage * limit);

  clearGallery();
  renderCards(petsToRender);

  const localTotalPages = Math.ceil(filtered.length / limit);
  showMoreBtn.style.display = currentPage >= localTotalPages ? 'none' : 'block';
}

showMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  renderFilteredCards();
});
