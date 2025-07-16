// === LIGHTBOX ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const arrows = document.querySelectorAll('.arrow');
const images = Array.from(document.querySelectorAll('.carousel-img'));

let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.classList.remove('hidden');
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.add('hidden');
});

arrows.forEach(arrow => {
  arrow.addEventListener('click', () => {
    if (arrow.classList.contains('left')) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      currentIndex = (currentIndex + 1) % images.length;
    }
    lightboxImg.src = images[currentIndex].src;
  });
});
// Zamknij lightbox po kliknięciu poza zdjęciem
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add('hidden');
  }
});
