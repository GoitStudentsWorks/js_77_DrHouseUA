import {
  renderCategoryButtons,
  renderFilteredCards,
} from './helpers/render-functions';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const api = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/',
  timeout: 5000,
  headers: { accept: 'application/json' },
});

export let allPets = []; // всі тваринки

export async function fetchAllPets() {
  const limit = 30;
  let page = 1;
  let allFetched = [];

  try {
    const limit = 20;
    let page = 1;
    let allFetched = [];

    while (true) {
      const requests = Array.from({ length: 5 }, (_, i) =>
        api.get('api/animals', {
          params: { page: page + i, limit },
        })
      );

      const responses = await Promise.all(requests);
      const batch = responses.flatMap(res => res.data.animals || []);
      allFetched = [...allFetched, ...batch];

      if (batch.length < limit * requests.length) break;
      page += requests.length;
    }

    allPets = allFetched;
    renderFilteredCards();
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити тваринок.',
      position: 'topRight',
    });
    console.error('Axios error:', error);
  }
}

export async function fetchCategories() {
  try {
    const response = await api.get('api/categories');
    const categories = response.data || [];
    renderCategoryButtons(['Всі', ...categories.map(c => c.name)]);
  } catch (error) {
    console.error('Помилка завантаження категорій:', error);
  }
}
