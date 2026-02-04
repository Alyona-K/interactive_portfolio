import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------------
   Public API
   Initializes responsive GSAP background animation based on viewport width.
   Returns cleanup function to remove all event listeners and GSAP context.
-------------------------------------------------- */
export const animateContactBg = (
  section: HTMLElement | null,
  bg: HTMLElement | null,
) => {
  if (!section || !bg) return;

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    // Define breakpoint-specific scenes
    mm.add("(max-width: 767px)", () => mobileScene(bg));
    mm.add("(min-width: 768px) and (max-width: 1279px)", () => tabletScene(bg));
    mm.add("(min-width: 1280px)", () => desktopScene(bg));
  }, section);

  return () => ctx.revert(); // cleanup GSAP context on unmount
};

/* --------------------------------------------------
   MOBILE SCENE
   No scroll-based animation, simple reset of background element.
-------------------------------------------------- */
const mobileScene = (bg: HTMLElement) => {
  gsap.set(bg, {
    clearProps: "all",
    width: "100%",
    borderRadius: "0px",
    xPercent: -50,
  });
};

/* --------------------------------------------------
   TABLET SCENE
   Animates width and border-radius based on scroll position with smooth expansion/shrink effects.
   Handles window resize and scroll events.
   Cleanup removes event listeners.
-------------------------------------------------- */
const tabletScene = (bg: HTMLElement) => {
  gsap.set(bg, {
    clearProps: "all",
    width: "100%",
    borderRadius: "30px",
    xPercent: -50,
  });

  const vh = window.innerHeight;
  const expandStart = vh;
  const expandEnd = vh / 2 - 150;
  const shrinkStart = vh / 2 + 150;
  const shrinkEnd = 0;

  const update = () => {
    const rect = bg.getBoundingClientRect();
    const top = rect.top;
    const bottom = rect.bottom;

    let width: number;
    let borderRadius: number;

    // Calculate normalized progress for expansion and shrink phases
    const tExpand = Math.min(
      Math.max(1 - (top - expandEnd) / (expandStart - expandEnd), 0),
      1,
    );
    const tShrink = Math.min(
      Math.max(1 - (bottom - shrinkEnd) / (shrinkStart - shrinkEnd), 0),
      1,
    );

    // Apply width and border-radius transformations based on scroll position
    if (top < expandStart && top > expandEnd) {
      width = 90 + 10 * tExpand;
      borderRadius = 30 * (1 - tExpand);
    } else if (bottom <= shrinkStart) {
      width = 90 + 10 * (1 - tShrink);
      borderRadius = 30 * tShrink;
    } else if (top <= expandEnd) {
      width = 100;
      borderRadius = 0;
    } else {
      width = 90;
      borderRadius = 30;
    }

    bg.style.width = `${width}%`;
    bg.style.borderRadius = `${borderRadius}px`;
  };

  window.addEventListener("scroll", update);
  window.addEventListener("resize", update);
  update(); // initial update to set correct state

  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
};

/* --------------------------------------------------
   DESKTOP SCENE
   Similar to tabletScene but with different initial width and scroll ranges.
   Provides smoother desktop-specific expansion/shrink behavior.
-------------------------------------------------- */
const desktopScene = (bg: HTMLElement) => {
  gsap.set(bg, {
    clearProps: "all",
    width: "70%",
    borderRadius: "30px",
    xPercent: -50,
  });

  const vh = window.innerHeight;
  const expandStart = vh;
  const expandEnd = vh / 2 - 180;
  const shrinkStart = vh / 2 + 180;
  const shrinkEnd = 0;

  const update = () => {
    const rect = bg.getBoundingClientRect();
    const top = rect.top;
    const bottom = rect.bottom;

    let width: number;
    let borderRadius: number;

    const tExpand = Math.min(
      Math.max(1 - (top - expandEnd) / (expandStart - expandEnd), 0),
      1,
    );
    const tShrink = Math.min(
      Math.max(1 - (bottom - shrinkEnd) / (shrinkStart - shrinkEnd), 0),
      1,
    );

    if (top < expandStart && top > expandEnd) {
      width = 70 + 30 * tExpand;
      borderRadius = 30 * (1 - tExpand);
    } else if (bottom <= shrinkStart) {
      width = 70 + 30 * (1 - tShrink);
      borderRadius = 30 * tShrink;
    } else if (top <= expandEnd) {
      width = 100;
      borderRadius = 0;
    } else {
      width = 70;
      borderRadius = 30;
    }

    bg.style.width = `${width}%`;
    bg.style.borderRadius = `${borderRadius}px`;
  };

  window.addEventListener("scroll", update);
  window.addEventListener("resize", update);
  update();

  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
};
