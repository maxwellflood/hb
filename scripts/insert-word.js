/* =====================================================
   Insert Word - live demo behaviour (insert-word.html)

   Reference only. Shows the open / choose / change flow; the
   classes it toggles are the same ones documented as static
   states in index.html, so the host app can drive them however
   it likes.

   1. Tap the trigger    - toggles .insert-word--open
   2. Tap a word         - the word replaces the face's content,
                           its option takes --selected, menu closes
   3. Tap the word again - reopens the menu to change it
   Tapping outside, or pressing Escape, closes the menu.
   ===================================================== */

const OPEN_CLASS = "insert-word--open";
const SELECTED_CLASS = "insert-word-menu__option--selected";

function openMenu(wrapper) {
  // Only one menu open at a time
  document.querySelectorAll(`.${OPEN_CLASS}`).forEach((other) => {
    if (other !== wrapper) closeMenu(other);
  });

  wrapper.classList.add(OPEN_CLASS);
  wrapper.querySelector(".insert-word__trigger").setAttribute("aria-expanded", "true");

  // Focus the current word, or the first word if none is chosen yet
  const options = wrapper.querySelectorAll(".insert-word-menu__option");
  const selected = wrapper.querySelector(`.${SELECTED_CLASS}`);
  (selected || options[0]).focus();
}

function closeMenu(wrapper) {
  wrapper.classList.remove(OPEN_CLASS);
  wrapper.querySelector(".insert-word__trigger").setAttribute("aria-expanded", "false");
}

function chooseWord(wrapper, option) {
  const trigger = wrapper.querySelector(".insert-word__trigger");
  const face = wrapper.querySelector(".insert-word__face");

  // Swap the add icon (or the previous word) for the chosen word.
  // Once a word is shown, it names the button, so the aria-label goes.
  face.classList.remove("insert-word__face--icon");
  face.removeAttribute("aria-hidden");
  face.textContent = option.textContent;
  trigger.removeAttribute("aria-label");

  // Mark the chosen option
  wrapper.querySelectorAll(".insert-word-menu__option").forEach((other) => {
    const isChosen = other === option;
    other.classList.toggle(SELECTED_CLASS, isChosen);
    other.setAttribute("aria-checked", String(isChosen));
  });

  closeMenu(wrapper);
  trigger.focus();
}

document.querySelectorAll(".insert-word").forEach((wrapper) => {
  const trigger = wrapper.querySelector(".insert-word__trigger");
  const options = Array.from(wrapper.querySelectorAll(".insert-word-menu__option"));

  trigger.addEventListener("click", () => {
    if (wrapper.classList.contains(OPEN_CLASS)) {
      closeMenu(wrapper);
    } else {
      openMenu(wrapper);
    }
  });

  options.forEach((option, index) => {
    option.addEventListener("click", () => chooseWord(wrapper, option));

    // Left / Right arrows move between words, as expected inside role="menu"
    option.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        options[(index + 1) % options.length].focus();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        options[(index - 1 + options.length) % options.length].focus();
      }
    });
  });
});

// Tap outside an open menu closes it
document.addEventListener("click", (event) => {
  document.querySelectorAll(`.${OPEN_CLASS}`).forEach((wrapper) => {
    if (!wrapper.contains(event.target)) closeMenu(wrapper);
  });
});

// Escape closes the open menu and returns focus to its trigger
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(`.${OPEN_CLASS}`).forEach((wrapper) => {
    closeMenu(wrapper);
    wrapper.querySelector(".insert-word__trigger").focus();
  });
});
