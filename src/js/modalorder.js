import { closeModal } from './pet-details-btn';

const modalOrder = document.querySelector('.modal-order');
const modalBtn = document.querySelector('.modal-btn');
const modalDetail = document.querySelector('.modal-detail');
// const scriptURL =
//   'https://script.google.com/macros/s/AKfycbxvMWn2o1KlD0kaVSKKSwRLIwg2s2lHDLJmxp62IilpEI-At8MMNph678NHE8LfZELkVA/exec';

modalDetail.addEventListener('click', e => {
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

// modalForm.addEventListener('submit', e => {
//   e.preventDefault();

//   const name = modalForm.querySelector('#user-name').value.trim();
//   const phone = modalForm.querySelector('#user-phone').value.trim();
//   const comment = modalForm.querySelector('#user-comment').value.trim();

//   const data = { name, phone, comment };

//   fetch(scriptURL, {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: { 'Content-Type': 'application/json' },
//   })
//     .then(() => {
//       alert('Заявка надіслана!');
//       modalForm.reset();
//       closeModalOrder();
//     })
//     .catch(error => {
//       alert('Помилка: ' + error.message);
//     });
// });
