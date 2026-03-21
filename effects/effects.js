const panels = document.querySelectorAll('.panel');

function updateEffects() {
  panels.forEach((panel, i) => {
    const offset = Math.abs(i - currentIndex);

    if (offset === 0) {
      panel.style.opacity = "1";
      panel.style.transform += " scale(1)";
      panel.style.filter = "blur(0px)";
    } else {
      panel.style.opacity = "0.4";
      panel.style.transform += " scale(0.9)";
      panel.style.filter = "blur(2px)";
    }
  });
}

// hook into rotation
const originalRotate = window.rotateTo;
window.rotateTo = function(index) {
  originalRotate(index);
  setTimeout(updateEffects, 100);
};
