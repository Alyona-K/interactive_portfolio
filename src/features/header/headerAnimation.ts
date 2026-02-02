import { gsap } from "gsap";

export const animateHeaderIntro = () => {
  return gsap.fromTo(
    "header",
    { y: -100, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.3 }
  );
};