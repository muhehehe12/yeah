let startX = 0;
let endX = 0;

window.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

window.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = endX - startX;

  if (diff < -50) {
    window.nextPanel(); // swipe left
  } else if (diff > 50) {
    window.prevPanel(); // swipe right
  }
}
