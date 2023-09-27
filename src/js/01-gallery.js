import simpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items.js';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const galleryEl = document.querySelector('.gallery');

const createMarkup = items => {
  return items
    .map(
      ({ preview, description, original }) =>
        `<li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>`
    )
    .join('');
};

const addMarkup = items => (galleryEl.innerHTML = createMarkup(items));

addMarkup(galleryItems);

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// gallery.on("show.simplelightbox", function (e) {
//   console.log(e.target, window);
// });
