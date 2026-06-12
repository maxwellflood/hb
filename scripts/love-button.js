// love-button.js — press-and-hold interaction for the love button question type

const loveField    = document.getElementById('loveField');
const loveCircle   = document.getElementById('loveCircle');
const loveFill     = document.getElementById('loveFill');
const loveValue    = document.getElementById('loveValue');
const loveBtn      = document.getElementById('loveBtn');
const loveBtnGroup = document.getElementById('loveBtnGroup');
const loveBtnLess  = document.getElementById('loveBtnLess');
const loveBtnMore  = document.getElementById('loveBtnMore');

const FILL_DURATION   = 12000; // ms to fill 0 → 100 if held continuously
const ADJUST_DURATION = 6000;  // ms to traverse full range with Less / More

let currentValue = 0;

// --- Initial press-and-hold fill ---

let fillFrameId      = null;
let fillStartTime    = null;
let fillValueAtStart = 0;

function startFilling(e) {
  e.preventDefault();
  if (currentValue >= 100) return;

  loveBtn.classList.add('love-btn--holding');
  fillStartTime    = performance.now();
  fillValueAtStart = currentValue;

  cancelAnimationFrame(fillFrameId);
  fillFrameId = requestAnimationFrame(fillTick);
}

function stopFilling() {
  loveBtn.classList.remove('love-btn--holding');
  cancelAnimationFrame(fillFrameId);
  fillFrameId   = null;
  fillStartTime = null;

  // Swap to adjustment buttons after the first successful hold
  if (currentValue > 0) {
    loveBtn.classList.add('hidden');
    loveBtnGroup.classList.remove('hidden');
    equalizeAdjustBtns();
  }
}

function fillTick(timestamp) {
  if (!fillStartTime) return;

  const elapsed = timestamp - fillStartTime;
  currentValue  = Math.min(100, fillValueAtStart + (elapsed / FILL_DURATION) * 100);
  updateDisplay();

  if (currentValue < 100) {
    fillFrameId = requestAnimationFrame(fillTick);
  } else {
    stopFilling();
  }
}

// --- Less / More adjustment buttons ---

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
  const change  = (elapsed / ADJUST_DURATION) * 100 * adjustDirection;
  currentValue  = Math.min(100, Math.max(0, adjustValueAtStart + change));
  updateDisplay();

  const atLimit = adjustDirection > 0 ? currentValue >= 100 : currentValue <= 0;
  if (!atLimit) {
    adjustFrameId = requestAnimationFrame(adjustTick);
  } else {
    stopAdjusting();
  }
}

// --- Shared display update ---

// Sets both adjustment buttons to the width of whichever is naturally wider.
// Called after the group is revealed (offsetWidth is 0 on hidden elements).
function equalizeAdjustBtns() {
  loveBtnLess.style.width = '';
  loveBtnMore.style.width = '';
  const w = Math.max(loveBtnLess.offsetWidth, loveBtnMore.offsetWidth);
  loveBtnLess.style.width = w + 'px';
  loveBtnMore.style.width = w + 'px';
}

window.addEventListener('resize', function () {
  if (!loveBtnGroup.classList.contains('hidden')) {
    equalizeAdjustBtns();
  }
});

function updateDisplay() {
  const pct = currentValue + '%';
  loveFill.style.width  = pct;
  loveFill.style.height = pct;
  loveValue.textContent = Math.round(currentValue);
}

// --- Event listeners ---

// Initial fill button
loveBtn.addEventListener('mousedown', startFilling);
loveBtn.addEventListener('mouseup', stopFilling);
loveBtn.addEventListener('mouseleave', stopFilling);
loveBtn.addEventListener('touchstart', startFilling, { passive: false });
loveBtn.addEventListener('touchend', stopFilling);
loveBtn.addEventListener('touchcancel', stopFilling);

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
