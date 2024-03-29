
import galleryItems from './gallery-items.js';

//Cоздание и рендер разметки
const imagesContainerRef = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryItems(galleryItems);
imagesContainerRef.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryItems(items) {
  return   galleryItems.map(({preview ,original , description}) => {
    return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image lazyload"
      data-src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  
  `;
  })
    .join('');


}

const lightboxRef = document.querySelector('.lightbox');
const imageLightboxRef = document.querySelector('.lightbox__image');
const closeModalButtonRef = document.querySelector('[data-action="close-lightbox"]');
const modaleBackdropRef = document.querySelector('.lightbox__overlay');



imagesContainerRef.addEventListener('click', galleryClickHandler);
imagesContainerRef.addEventListener('click', openModalHandler);
closeModalButtonRef .addEventListener('click', closeModalHandler);
modaleBackdropRef.addEventListener('click', backdropModalHandler);




// Открытие модального окна
function galleryClickHandler(event) {
  event.preventDefault();
  const galleryRef = event.target;

  if (galleryRef.nodeName !== 'IMG') {
    return;
  }

  const originalImageNewUrl = galleryRef.dataset.source;

  imageLightboxRef.src = originalImageNewUrl;
}

function openModalHandler(event) {
  window.addEventListener('keydown', escapeClickHandler);
  
  if (event.target.nodeName !== 'IMG') {
    return;
  }
lightboxRef.classList.add('is-open');
 
}
// Закрытие модального окна
function closeModalHandler() {
 window.removeEventListener('keydown', escapeClickHandler);

 lightboxRef.classList.remove('is-open');

  imageLightboxRef.src = '';
}

function backdropModalHandler(event) {
  if (event.target === event.currentTarget) {
    closeModalHandler();
  }
}


function escapeClickHandler(event) {
  if (event.code === 'Escape') {
    closeModalHandler();
  }
}

// Переключение с помощью стрелок

window.addEventListener('keydown', toSwitchImagesInModal);
  
function toSwitchImagesInModal(e) {
  let currentIndex = [...galleryItems ]
    .map(i => i.original)
    .findIndex(i => i === imageLightboxRef.src);
  if (e.code === 'ArrowRight' && currentIndex < galleryItems.length - 1) {
    currentIndex += 1;
  } else if (e.code === 'ArrowLeft' && currentIndex > 0) {
    currentIndex -= 1;
  } else {
   closeModalHandler();
  }

  changeDataInCurrentImage(
    galleryItems[currentIndex].original,
    galleryItems[currentIndex].description,
  );
}

function changeDataInCurrentImage(src, alt) {
 imageLightboxRef.src = src;
 imageLightboxRef.alt = alt;
}