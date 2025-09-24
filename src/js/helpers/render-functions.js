import {
  getLimit,
  filterPetsByCategory,
  filterPetsByID,
  showElement,
  hideElement,
} from '../services.js';
import { allPets } from '../api.js';

const gallery = document.querySelector('.gallery');
const categoryContainer = document.querySelector('.category-nav');
const showMoreBtn = document.querySelector('.showmore-btn');
const loaderCardsEl = document.querySelector('.loader-cards-backdrop');

console.log(loaderCardsEl);

let currentCategory = 'Всі';
export let currentPage = 1;

export function clearGallery() {
  gallery.innerHTML = '';
}

export function renderCards(pets, markNew = false) {
  pets.forEach(pet => {
    const card = document.createElement('article');
    card.classList.add('pet-card');
    if (markNew) card.classList.add('new-card');

    card.innerHTML = `
      <div class="card-img-wrapper">
        <img class="pet-card-image" src="${
          pet.image || 'default.jpg'
        }" alt="Фото ${pet.name}, ${pet.age}, ${pet.gender}" loading="lazy"/>
      </div>
      <div class="pet-card-info">
        <span class="pet-card-type">${pet.species}</span>
        <h3 class="pet-card-name">${pet.name}</h3>
        <span class="pet-category-wrapper">${renderCardCategories(
          pet.categories
        )}</span>
        <div class="pet-card-meta">
          <p class="pet-card-age">${pet.age}</p>
          <p class="pet-card-gender">${pet.gender}</p>
        </div>
      </div>
      <p class="pet-card-desc">${pet.shortDescription}</p>
      <button class="pet-card-btn" id="${pet._id}">Дізнатись більше</button>
    `;
    gallery.appendChild(card);
  });
}

function renderCardCategories(categoriesArr) {
  let arrCat = [];
  let markup = '';
  for (const obj of categoriesArr) {
    markup += `<span class="pet-category">
      ${obj.name}
    </span>`;
  }
  return markup;
}

export function renderCardInModal(cardId = 1) {
  const petById = filterPetsByID(cardId, allPets);
  let cardMarkup = ``;

  petById.forEach(
    pet =>
      (cardMarkup = `
        <div class="detail-image-wrapper">
          <img class="image-tamplete" src="${pet.image}"></img>
        </div>
        <div class="detail-descr-wrapper">
          <div class="detail-descr-title">
            <p>${pet.species}</p>
            <h1 class="detail-pet-name">${pet.name}</h1>
            <p>${pet.age}&nbsp;&nbsp;&nbsp;&nbsp;  ${pet.gender}</p>
                    <button type="button" class="showmore-btn take-home-btn take-home-btn-tablet">
            Взяти додому
          </button>
          </div>
          <p><span class="modal-txt">Опис:  <br /></span>
          ${pet.description}
          </p>
          <p><span class="modal-txt">Здоров'я:  <br /></span> 
          ${pet.healthStatus}
          </p>
          <p><span class="modal-txt">Поведінка:</span> <br />
          ${pet.behavior}
          </p>
          <button type="button" class="showmore-btn take-home-btn">
            Взяти додому
          </button>
        </div>
  `)
  );

  return cardMarkup;
}

export function renderCategoryButtons(names) {
  categoryContainer.innerHTML = '';
  names.forEach(name => {
    const btn = document.createElement('button');
    btn.classList.add('category-item');
    btn.textContent = name;
    btn.dataset.category = name;
    if (name === 'Всі') btn.classList.add('active-category');

    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.category-item')
        .forEach(b => b.classList.remove('active-category'));
      btn.classList.add('active-category');

      currentCategory = name;
      currentPage = 1;

      renderFilteredCards();
    });

    categoryContainer.appendChild(btn);
  });
}

export function renderFilteredCards({ append = false } = {}) {
  const limit = getLimit();
  const filtered = filterPetsByCategory(currentCategory, allPets);
  const petsToRender = filtered.slice(0, currentPage * limit);

  if (!append) clearGallery();

  const startIndex = (currentPage - 1) * limit;
  const newPets = petsToRender.slice(startIndex, currentPage * limit);

  renderCards(append ? newPets : petsToRender, append);

  const localTotalPages = Math.ceil(filtered.length / limit);
  showMoreBtn.style.display = currentPage >= localTotalPages ? 'none' : 'block';
}

showMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  showElement(loaderCardsEl);
  hideElement(showMoreBtn);

  document
    .querySelectorAll('.new-card')
    .forEach(el => el.classList.remove('new-card'));

  renderFilteredCards({ append: true });
  setTimeout(() => hideElement(loaderCardsEl), 200);

  setTimeout(scrollToFirstNewCard(74), 200);

  setTimeout(() => showElement(showMoreBtn), 200);
});

function scrollToFirstNewCard(offset = 74) {
  const firstNewCard = document.querySelector('.gallery .new-card');
  if (!firstNewCard) return;

  const cardTop = firstNewCard.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: cardTop - offset,
    behavior: 'smooth',
  });
}
