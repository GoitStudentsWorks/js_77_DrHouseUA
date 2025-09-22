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
