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
gsap.set(".splash-screen p, .splash-screen .btn", { opacity: 0, y: "1rem" });

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
      ".splash-screen p, .splash-screen .btn",
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

// Home panels - switch nav (Start / Cookies / Honesty Box)
// Choosing a tab moves .switch-btn--active and aria-selected to it, and
// .home-panel--active to the panel named by its aria-controls. The fade
// out / fade in is all CSS (.home-panel in styles.css); this only moves
// the classes.
const homeTabs = document.querySelectorAll(
  '.bottom-nav .switch-nav [role="tab"]',
);
const homePanels = document.querySelectorAll(".home-panel");

function showHomePanel(panelToShow) {
  homePanels.forEach((panel) => {
    panel.classList.toggle("home-panel--active", panel === panelToShow);
  });
}

function selectHomeTab(chosenTab) {
  homeTabs.forEach((tab) => {
    const isChosen = tab === chosenTab;
    tab.classList.toggle("switch-btn--active", isChosen);
    tab.setAttribute("aria-selected", isChosen ? "true" : "false");
  });
  showHomePanel(
    document.getElementById(chosenTab.getAttribute("aria-controls")),
  );
}

homeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (!tab.classList.contains("switch-btn--active")) selectHomeTab(tab);
  });
});

// Start the survey - Get started and the Next arrow (data-home-begin)
// Shows the first question panel and adds .survey-started to <body>, which
// fades out the switch nav and fades in the
// progress bar and Help button (Survey Started in styles.css). All on this
// page - nothing navigates.
const questionPanel = document.getElementById("home-panel-question");

function startSurvey(event) {
  event.preventDefault(); // the Next arrow is a link with href="#"
  if (document.body.classList.contains("survey-started")) return;
  document.body.classList.add("survey-started");
  showHomePanel(questionPanel);
}

document
  .querySelectorAll("[data-home-begin]")
  .forEach((control) => control.addEventListener("click", startSurvey));
