// Validation — show message if field was touched but left empty

document.querySelectorAll(".text-input").forEach((input) => {
  input.addEventListener("blur", () => {
    const field = input.closest(".form-field");
    const isDontKnow = field.classList.contains("form-field--dont-know");
    if (isDontKnow) return;
    field.classList.toggle("form-field--invalid", input.value.trim() === "");
  });

  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.closest(".form-field").classList.remove("form-field--invalid");
    }
  });
});

// Don't know button — toggle per instance

document.querySelectorAll(".dont-know-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const field = btn.closest(".form-field");
    const input = field.querySelector(".text-input");
    const isActive = btn.classList.toggle("dont-know-btn--active");

    field.classList.toggle("form-field--dont-know", isActive);
    if (isActive) field.classList.remove("form-field--invalid");
    input.disabled = isActive;
  });
});
