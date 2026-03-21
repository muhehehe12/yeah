// MAIN ROTATION SYSTEM

const cylinder = document.querySelector('.cylinder');
const panels = document.querySelectorAll('.panel');

let currentIndex = 0;
const totalPanels = panels.length;

// rotate function
function rotateTo(index) {
  currentIndex = (index + totalPanels) % totalPanels;
  const angle = currentIndex * -360 / totalPanels;

  cylinder.style.transform = `rotateY(${angle}deg)`;

  // optional: add active class
  panels.forEach((p, i) => {
    p.classList.toggle('active', i === currentIndex);
  });
}

// next / prev
function nextPanel() {
  rotateTo(currentIndex + 1);
}

function prevPanel() {
  rotateTo(currentIndex - 1);
}

// expose globally (used by touch.js)
window.nextPanel = nextPanel;
window.prevPanel = prevPanel;

// keyboard support (desktop)
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextPanel();
  if (e.key === 'ArrowLeft') prevPanel();
});
