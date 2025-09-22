const galleryEl = document.querySelector('.gallery');
const modalPetInfoEl = document.querySelector('.modal-detail');
const bodyEl = document.querySelector('body');

galleryEl.addEventListener('click', onBtnDetailClick);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function onBtnDetailClick(event) {
  console.dir(event.target);

  if (event.target.nodeName === 'IMG') {
    openModal();
  }
}

function openModal() {
  bodyEl.addEventListener('click', onClickInModal);
  modalPetInfoEl.classList.remove('hide-modal');
  document.body.classList.add('modal-open');
}

function onClickInModal(event) {
  console.dir(event.target);
  console.log('work in modal');
  console.log(event.target.classList);
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
}
