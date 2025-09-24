export function getLimit() {
  return window.innerWidth >= 1440 ? 9 : 8;
}

export function filterPetsByCategory(categoryName, petsArray) {
  if (categoryName === 'Всі') return petsArray;
  return petsArray.filter(pet =>
    pet.categories.some(cat => cat.name === categoryName)
  );
}

export function filterPetsByID(ID, petsArray) {
  const Pet = petsArray.filter(pet => {
    return pet._id === ID;
  });
  return Pet;
}

export function scrollGallery() {
  const card = document.querySelector('.pet-card');
  if (!card) return;

  const { height } = card.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}

export function showElement(element) {
  console.log(element);
  element.classList.remove('hidden');
}

export function hideElement(element) {
  element.classList.add('hidden');
}
