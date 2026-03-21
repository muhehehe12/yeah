// ---------- SETUP ----------
const cylinder = document.getElementById("cylinder");
const panels = document.querySelectorAll(".panel");

let current = 0;
const total = panels.length;

// ---------- ROTATION ----------
function rotate() {
  const angle = current * -(360 / total);
  cylinder.style.transform = `rotateY(${angle}deg)`;

  // visual effect (depth / blur)
  panels.forEach((panel, i) => {
    if (i === current) {
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

// ---------- NAVIGATION ----------
function next() {
  current = (current + 1) % total;
  rotate();
}

function prev() {
  current = (current - 1 + total) % total;
  rotate();
}

// ---------- SWIPE / DRAG ----------
let startX = 0;
let isDragging = false;

// mobile
window.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

window.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  handleSwipe(endX - startX);
});

// desktop drag
window.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
});

window.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  handleSwipe(e.clientX - startX);
});

// swipe logic
function handleSwipe(diff) {
  if (diff < -40) next();
  if (diff > 40) prev();
}

// ---------- KEYBOARD ----------
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

// ---------- INIT ----------
rotate();
