import galleryItem from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const closeBtnModal = document.querySelector('[data-action="close-lightbox"]');
const modalContent = document.querySelector('.lightbox__image');
const overlay = document.querySelector('.lightbox__overlay');

galleryContainer.addEventListener('click', onOpenModal);
closeBtnModal.addEventListener('click', onCloseModal);
overlay.addEventListener('click', onOverlayClick);

const cardsMarkup = createGalleryCardsMarkup(galleryItem);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createGalleryCardsMarkup(item) {
  return item
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

function onOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();

  modal.classList.add('is-open');

  modalContent.src = event.target.dataset.source;
  modalContent.alt = event.target.alt;

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onImgLeftPress);
  window.addEventListener('keydown', onImgRightPress);
}

function onCloseModal() {
  modal.classList.remove('is-open');
  modalContent.src = '';
  modalContent.alt = '';

  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onImgLeftPress);
  window.removeEventListener('keydown', onImgRightPress);
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onImgLeftPress(event) {
  const ARR_LEFT_KEY_CODE = 'ArrowLeft';
  const isArrLeftKey = event.code === ARR_LEFT_KEY_CODE;

  if (isArrLeftKey) {
    const sources = galleryItem.map(({ original }) => original);
    let indexOfCurrentImg = sources.indexOf(modalContent.src);

    if (indexOfCurrentImg === 0) {
      indexOfCurrentImg = sources.length;
    }
    modalContent.src = sources[indexOfCurrentImg - 1];
  }
}

function onImgRightPress(event) {
  const ARR_RIGHT_KEY_CODE = 'ArrowRight';
  const isArrRightKey = event.code === ARR_RIGHT_KEY_CODE;

  if (isArrRightKey) {
    const sources = galleryItem.map(({ original }) => original);
    let indexOfCurrentImg = sources.indexOf(modalContent.src);

    if (indexOfCurrentImg + 1 > sources.length - 1) {
      indexOfCurrentImg = -1;
    }
    modalContent.src = sources[indexOfCurrentImg + 1];
  }
}
