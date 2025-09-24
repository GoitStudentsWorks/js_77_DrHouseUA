import { closeModal } from './pet-details-btn';

const modalOrder = document.querySelector('.modal-order');
const modalBtn = document.querySelector('.modal-btn');
const modalDetail = document.querySelector('.modal-detail');
const modalForm = document.querySelector('.modal-form');
const loader = document.querySelector('#form-loader');

const scriptURL =
  'https://script.google.com/macros/s/AKfycbxvMWn2o1KlD0kaVSKKSwRLIwg2s2lHDLJmxp62IilpEI-At8MMNph678NHE8LfZELkVA/exec';

https: modalDetail.addEventListener('click', e => {
  if (e.target.nodeName === 'BUTTON') {
    modalOrder.classList.add('is-open-order');
    document.body.classList.add('modal-order', 'is-open-order');
    modalDetail.classList.add('hide-modal');
  }
});

modalBtn.addEventListener('click', closeModalOrder);

modalOrder.addEventListener('click', e => {
  const clickedBackdrop = !e.target.closest('.modal');
  const isModalOpen = modalOrder.classList.contains('is-open-order');

  if (clickedBackdrop && isModalOpen) {
    closeModalOrder();
  }
});

function closeModalOrder() {
  modalOrder.classList.remove('is-open-order');
  document.body.classList.remove('modal-order', 'is-open-order');
  closeModal();
}

modalForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = modalForm.querySelector('#user-name').value.trim();
  const phone = modalForm.querySelector('#user-phone').value.trim();
  const comment = modalForm.querySelector('#user-comment').value.trim();

  // 🔍 Валідація
  if (!name || name.length < 2) {
    alert('Введіть коректне ім’я (мінімум 2 символи)');
    return;
  }

  const phoneRegex = /^\+?\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    alert('Введіть коректний номер телефону (наприклад, +380991234567)');
    return;
  }

  if (comment.length > 300) {
    alert('Коментар занадто довгий (максимум 300 символів)');
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('comment', comment);

  showLoader();

  fetch(scriptURL, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.text())
    .then(result => {
      alert('Заявка надіслана!');
      modalForm.reset();
      closeModalOrder();
    })
    .catch(error => {
      alert('Помилка: ' + error.message);
    })
    .finally(() => {
      hideLoader();
    });
});

const loaderBackdrop = document.querySelector('#loader-backdrop');

function showLoader() {
  loaderBackdrop.classList.remove('hidden');
}

function hideLoader() {
  loaderBackdrop.classList.add('hidden');
}
