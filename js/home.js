const crownAnim = lottie.loadAnimation({
  container: document.getElementById("crown-lottie"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "lottie/crown.json",
});

const underlineAnim = lottie.loadAnimation({
  container: document.getElementById("underline-lottie"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "lottie/underline.json",
});

const loaderAnim = lottie.loadAnimation({
  container: document.getElementById("loader-lottie"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "lottie/loader2.json",
});

gsap.set(".display", { opacity: 0, y: "1rem" });
gsap.set(".splash-screen p", { opacity: 0, y: "1rem" });

// Fade in the lottie, then play it
gsap.fromTo(
  "#loader-lottie",
  { opacity: 0 },
  {
    opacity: 1,
    duration: 0.4,
    onComplete: () => loaderAnim.play(),
  },
);

function dismissLoader() {
  gsap.to(".loader-overlay", {
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      document.querySelector(".loader-overlay").remove();
      gsap.fromTo(
        ".display",
        { opacity: 0, y: "1rem" },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          onComplete: () => {
            crownAnim.play();
            underlineAnim.play();
          },
        },
      );
    },
  });
}

let lottiesComplete = 0;
function onSplashLottieComplete() {
  lottiesComplete++;
  if (lottiesComplete === 2) {
    gsap.fromTo(
      ".splash-screen p",
      { opacity: 0, y: "1rem" },
      { opacity: 1, y: 0, duration: 0.5 },
    );
  }
}
crownAnim.addEventListener("complete", onSplashLottieComplete);
underlineAnim.addEventListener("complete", onSplashLottieComplete);

// When animation finishes, dismiss the overlay
loaderAnim.addEventListener("complete", dismissLoader);

// Also dismiss on click
document
  .querySelector(".loader-overlay")
  .addEventListener("click", dismissLoader);
