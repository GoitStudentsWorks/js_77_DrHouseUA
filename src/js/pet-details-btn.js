import { renderCardInModal } from './helpers/render-functions';

const galleryEl = document.querySelector('.gallery');
const modalPetInfoEl = document.querySelector('.modal-detail');
const modalDetailContainerEl = document.querySelector('.detail-content');
const bodyEl = document.querySelector('body');

galleryEl.addEventListener('click', onBtnDetailClick);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function onBtnDetailClick(event) {
  if (event.target.nodeName === 'BUTTON') {
    modalDetailContainerEl.insertAdjacentHTML(
      'beforeend',
      renderCardInModal(event.target.attributes.id.value)
    );
    openModal();
  }
}

function openModal() {
  bodyEl.addEventListener('click', onClickInModal);
  modalPetInfoEl.classList.remove('hide-modal');
  document.body.classList.add('modal-open');
}

function onClickInModal(event) {
  if (
    (document.body.classList.contains('modal-open') &&
      event.target.nodeName === 'SECTION') ||
    event.target.classList.contains('detail-icon-close')
  ) {
    closeModal();
  }
}

function closeModal() {
  modalPetInfoEl.classList.add('hide-modal');
  document.body.classList.remove('modal-open');
  bodyEl.removeEventListener('click', onClickInModal);
  modalDetailContainerEl.innerHTML = '';
}
