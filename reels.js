const cover = document.getElementById('video-cover');
const video = document.getElementById('showreel-video');

cover.addEventListener('click', () => {
  cover.classList.add('hidden');
  video.classList.remove('hidden');
  video.play();

  // Przejście do pełnego ekranu
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) { // Safari
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { // IE11
    video.msRequestFullscreen();
  }
});

