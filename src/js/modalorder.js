import { closeModal } from './pet-details-btn';

const modalOrder = document.querySelector('.modal-order');
const modalBtn = document.querySelector('.modal-btn');
const modalDetail = document.querySelector('.modal-detail');

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
