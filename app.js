const controller = new ScrollMagic.Controller();
const flightPath = {
  curviness: 1.6,
  values: [
    { webkitClipPath: "circle(50% at 30% 110%)" },
    { webkitClipPath: "circle(35% at -10% 40%)" },
    { webkitClipPath: "circle(50% at 80% 34%)" },
    { webkitClipPath: "circle(90% at 54% 34%)" },
  ],
};

const bioHeight = document.querySelector(".bio").offsetHeight + 10;

const introTween = new TimelineMax({
  onStart: () => {
    document.querySelector(".scroll-down") &&
      document.querySelector(".scroll-down").remove();
  },
});
introTween
  .set(".bio", { height: 0 })
  .to(".intro", 5, { bezier: flightPath })
  .staggerFromTo(
    ".intro-text",
    2,
    { autoAlpha: 0, y: 60 },
    { autoAlpha: 1, y: 0 },
    0.4,
    "-=2"
  )
  .to(".intro-overlay", 4, { backgroundColor: "rgba(0,0,0,.9)" }, "bio")
  .to(".intro-content", 4, { height: "100%" }, "bio")
  .to(".bio", 3, { height: bioHeight, autoAlpha: 1 }, "bio+=.2")
  .staggerFromTo(
    ".bio-content > *",
    1,
    { autoAlpha: 0, y: 50 },
    { autoAlpha: 1, y: 0 },
    0.4,
    "bio+=.4"
  )
  .set(".intro-content", { overflow: "auto" });

const introScene = new ScrollMagic.Scene({
  triggerElement: ".intro",
  duration: 2000,
  triggerHook: 0,
})
  .setPin(".intro")
  .setTween(introTween)
  .addTo(controller);

window.addEventListener("resize", () => {
  new ScrollMagic.Scene({
    triggerElement: ".intro",
    duration: 2000,
    triggerHook: 0,
  })
    .setPin(".intro")
    .setTween(introTween)
    .addTo(controller)
    .addIndicators();
});

window.addEventListener("resize", () => {
  window.location.reload(false);
});
