// Grid buttons — multiselect, toggle individual buttons independently
document.querySelectorAll(".grid-group").forEach((group) => {
  const field = group.closest(".grid-field");

  group.querySelectorAll(".grid-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isSelected = btn.classList.contains("grid-btn--selected");
      btn.classList.toggle("grid-btn--selected", !isSelected);
      btn.setAttribute("aria-checked", String(!isSelected));

      // Clear don't know if any answer is selected
      if (!isSelected && field) {
        const dkBtn = field.querySelector(".dont-know-btn");
        if (dkBtn) dkBtn.classList.remove("dont-know-btn--active");
      }
    });
  });
});

// Don't know button — clears all selections in the group
document.querySelectorAll(".dont-know-btn").forEach((dkBtn) => {
  const field = dkBtn.closest(".grid-field");
  if (!field) return;

  dkBtn.addEventListener("click", () => {
    const isActive = dkBtn.classList.contains("dont-know-btn--active");
    field.querySelectorAll(".grid-btn").forEach((b) => {
      b.classList.remove("grid-btn--selected");
      b.setAttribute("aria-checked", "false");
    });
    dkBtn.classList.toggle("dont-know-btn--active", !isActive);
  });
});

// Equalize button widths for all fixed-width groups
document.querySelectorAll(".grid-group--fixed").forEach((group) => {
  const btns = [...group.querySelectorAll(".grid-btn")];
  const maxW = Math.max(...btns.map((b) => b.offsetWidth));
  btns.forEach((b) => (b.style.width = maxW + "px"));
});
