const projectCards = Array.from(document.querySelectorAll('.project-card'));
const projectFilters = document.querySelectorAll('[data-project-filter]');
const projectCount = document.getElementById('project-count');
const projectDialog = document.getElementById('project-dialog');
const galleryImage = projectDialog.querySelector('[data-gallery-image]');
const galleryCount = projectDialog.querySelector('[data-gallery-count]');
const previousImage = projectDialog.querySelector('[data-gallery-previous]');
const nextImage = projectDialog.querySelector('[data-gallery-next]');
let galleryImages = [];
let galleryIndex = 0;
let projectOpener;

projectFilters.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.projectFilter;
    projectFilters.forEach(filter => {
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    projectCards.forEach(card => {
      card.hidden = category !== 'all' && !card.dataset.category.split(' ').includes(category);
    });
    projectCount.textContent = `${projectCards.filter(card => !card.hidden).length} / ${projectCards.length}`;
  });
});

function showGalleryImage(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  galleryImage.src = galleryImages[galleryIndex];
  galleryCount.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
  previousImage.disabled = galleryImages.length === 1;
  nextImage.disabled = galleryImages.length === 1;
}

document.querySelectorAll('[data-project-open]').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    const title = card.querySelector('h3');
    const description = card.querySelector('.project-description');
    const preview = card.querySelector('img');
    const dialogTitle = projectDialog.querySelector('h2');
    const dialogDescription = projectDialog.querySelector('[data-project-description]');

    dialogTitle.textContent = title.textContent;
    dialogTitle.dataset.translate = title.dataset.translate;
    dialogDescription.textContent = description.textContent;
    dialogDescription.dataset.translate = description.dataset.translate;
    galleryImage.alt = preview.alt;
    galleryImage.dataset.translateAlt = preview.dataset.translateAlt;
    projectDialog.querySelector('[data-project-tags]').replaceChildren(
      ...Array.from(card.querySelectorAll('.project-tags li'), tag => tag.cloneNode(true))
    );
    projectDialog.querySelector('[data-project-github]').href = card.querySelector('.project-github').href;
    galleryImages = card.dataset.gallery.split(' ');
    showGalleryImage(0);
    projectOpener = button;
    projectDialog.showModal();
  });
});

previousImage.addEventListener('click', () => showGalleryImage(galleryIndex - 1));
nextImage.addEventListener('click', () => showGalleryImage(galleryIndex + 1));

projectDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showGalleryImage(galleryIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

projectDialog.addEventListener('click', event => {
  const bounds = projectDialog.getBoundingClientRect();
  if (event.target === projectDialog && (
    event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom
  )) {
    projectDialog.close();
  }
});

projectDialog.addEventListener('close', () => projectOpener.focus());
