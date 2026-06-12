// love-button-mid.js — midpoint variant of the love button question type
// Range: -100 to +100. Fill starts at 50% (midpoint). Less/More visible immediately — no press-and-hold step.

const loveField    = document.getElementById('loveField');
const loveFill     = document.getElementById('loveFill');
const loveValue    = document.getElementById('loveValue');
const loveBtnGroup = document.getElementById('loveBtnGroup');
const loveBtnLess  = document.getElementById('loveBtnLess');
const loveBtnMore  = document.getElementById('loveBtnMore');

// 6s to traverse the full 200-unit range end-to-end
const ADJUST_DURATION = 6000;

let currentValue = 0; // float -100 to 100; 0 = visual midpoint (50% fill)

// --- Less / More adjustment ---

let adjustFrameId      = null;
let adjustStartTime    = null;
let adjustValueAtStart = 0;
let adjustDirection    = 0; // -1 = Less, +1 = More

function startAdjusting(direction, e) {
  e.preventDefault();
  adjustDirection    = direction;
  adjustStartTime    = performance.now();
  adjustValueAtStart = currentValue;

  loveFill.classList.toggle('love-fill--less', direction === -1);
  loveFill.classList.toggle('love-fill--more', direction === 1);

  cancelAnimationFrame(adjustFrameId);
  adjustFrameId = requestAnimationFrame(adjustTick);
}

function stopAdjusting() {
  cancelAnimationFrame(adjustFrameId);
  adjustFrameId   = null;
  adjustStartTime = null;

  loveFill.classList.remove('love-fill--less', 'love-fill--more');
}

function adjustTick(timestamp) {
  if (!adjustStartTime) return;

  const elapsed = timestamp - adjustStartTime;
  // ADJUST_DURATION covers the full 200-unit range (-100 → +100)
  const change  = (elapsed / ADJUST_DURATION) * 200 * adjustDirection;
  currentValue  = Math.min(100, Math.max(-100, adjustValueAtStart + change));
  updateDisplay();

  const atLimit = adjustDirection > 0 ? currentValue >= 100 : currentValue <= -100;
  if (!atLimit) {
    adjustFrameId = requestAnimationFrame(adjustTick);
  } else {
    stopAdjusting();
  }
}

// --- Display ---

function updateDisplay() {
  // Map -100..100 → 0%..100% for the fill circle
  const fillPct = ((currentValue + 100) / 2) + '%';
  loveFill.style.width  = fillPct;
  loveFill.style.height = fillPct;
  loveValue.textContent = Math.round(currentValue);
}

// Sets both adjustment buttons to the width of whichever is naturally wider.
function equalizeAdjustBtns() {
  loveBtnLess.style.width = '';
  loveBtnMore.style.width = '';
  const w = Math.max(loveBtnLess.offsetWidth, loveBtnMore.offsetWidth);
  loveBtnLess.style.width = w + 'px';
  loveBtnMore.style.width = w + 'px';
}

window.addEventListener('resize', equalizeAdjustBtns);

// Initialise at midpoint
updateDisplay();
equalizeAdjustBtns();

// --- Event listeners ---

// Less button
loveBtnLess.addEventListener('mousedown', (e) => startAdjusting(-1, e));
loveBtnLess.addEventListener('mouseup', stopAdjusting);
loveBtnLess.addEventListener('mouseleave', stopAdjusting);
loveBtnLess.addEventListener('touchstart', (e) => startAdjusting(-1, e), { passive: false });
loveBtnLess.addEventListener('touchend', stopAdjusting);
loveBtnLess.addEventListener('touchcancel', stopAdjusting);

// More button
loveBtnMore.addEventListener('mousedown', (e) => startAdjusting(1, e));
loveBtnMore.addEventListener('mouseup', stopAdjusting);
loveBtnMore.addEventListener('mouseleave', stopAdjusting);
loveBtnMore.addEventListener('touchstart', (e) => startAdjusting(1, e), { passive: false });
loveBtnMore.addEventListener('touchend', stopAdjusting);
loveBtnMore.addEventListener('touchcancel', stopAdjusting);
