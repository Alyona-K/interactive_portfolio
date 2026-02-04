import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * --- PUBLIC API: ANIMATE PROJECTS GALLERY BASED ON VIEWPORT ---
 *
 * Initializes scroll-triggered animations for project cards.
 * Supports responsive behaviors: mobile, tablet, desktop.
 * Returns a cleanup function to revert GSAP context on unmount.
 */
export const animateProjectsGallery = (rootEl: HTMLElement | null) => {
  if (!rootEl) return;

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    // --- MOBILE VIEWPORT: RESET STYLES, NO ANIMATION ---
    mm.add("(max-width: 767px)", () => {
      mobileScene(rootEl);
    });

    // --- TABLET VIEWPORT ---
    mm.add("(min-width: 768px) and (max-width: 1279px)", () => {
      tabletScene(rootEl);
    });

    // --- DESKTOP VIEWPORT ---
    mm.add("(min-width: 1280px)", () => {
      desktopScene(rootEl);
    });
  }, rootEl);

  return () => ctx.revert();
};

// --- MOBILE SCENE: CLEAR INLINE STYLES (NO ANIMATION) ---
const mobileScene = (rootEl: HTMLElement) => {
  const stage = rootEl.querySelector<HTMLElement>(".projects-gallery__stage");
  const cards = rootEl.querySelectorAll<HTMLElement>(".project-card");

  if (!stage) return;

  gsap.set(stage, { clearProps: "position,height" });
  gsap.set(cards, { clearProps: "all" });
};

// --- TABLET SCENE ---
const tabletScene = (rootEl: HTMLElement) => {
  const stage = rootEl.querySelector<HTMLElement>(".projects-gallery__stage");
  const title = rootEl.querySelector<HTMLElement>(".projects-gallery__title");
  const cards = gsap.utils.toArray<HTMLElement>(
    rootEl.querySelectorAll(".project-card"),
  );

  if (!stage || !title || cards.length === 0) return;

  gsap.set([stage, ...cards], { clearProps: "all" });
  const vh = window.innerHeight;
  const titleRect = title.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();

  gsap.set(stage, { position: "relative" });

  // --- INITIAL CARD STATES: STACKED, OFFSET, Z-INDEX FOR OVERLAP ---
  cards.forEach((card, i) => {
    let startY = vh;
    if (i === 0) startY = titleRect.bottom - stageRect.top + 70;

    gsap.set(card, {
      position: "absolute",
      left: "50%",
      xPercent: -50,
      y: startY,
      scale: 1.2,
      opacity: 1,
      zIndex: 1,
    });
  });

  const sectionHeight = vh * cards.length;

  // --- PIN STAGE DURING SCROLL ---
  ScrollTrigger.create({
    trigger: stage,
    start: "top top",
    end: `+=${sectionHeight}`,
    pin: true,
    pinSpacing: true,
    scrub: true,
  });

  // --- FIRST CARD ENTRY ANIMATION ---
  const firstCard = cards[0];
  gsap.to(firstCard, {
    scale: 1,
    y: vh / 2 - firstCard.offsetHeight / 2 - 300,
    ease: "linear",
    scrollTrigger: {
      trigger: firstCard,
      start: "top bottom",
      end: "center center",
      scrub: true,
    },
  });

  // --- STACKED CARDS ANIMATION TIMELINE ---
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stage,
      start: "top top",
      end: `+=${sectionHeight}`,
      scrub: 0.5,
    },
  });

  cards.slice(1).forEach((card, i) => {
    const prevCard = cards[i];
    tl.set(card, { zIndex: 10 });
    tl.to(card, { y: 0, scale: 1, opacity: 1, duration: 1, ease: "linear" });
    if (prevCard) {
      tl.to(
        prevCard,
        { scale: 0.7, opacity: 0, zIndex: 1, duration: 1, ease: "linear" },
        "<",
      );
    }
  });

  // --- LAST CARD EXIT ---
  const lastCard = cards[cards.length - 1];
  tl.to(lastCard, {
    scale: 0.7,
    opacity: 0.6,
    y: -100,
    duration: 1,
    ease: "linear",
  });
};

// --- DESKTOP SCENE ---
// Similar to tabletScene but adjusted offsets and timings for larger viewport
const desktopScene = (rootEl: HTMLElement) => {
  const stage = rootEl.querySelector<HTMLElement>(".projects-gallery__stage");
  const title = rootEl.querySelector<HTMLElement>(".projects-gallery__title");
  const cards = gsap.utils.toArray<HTMLElement>(
    rootEl.querySelectorAll(".project-card"),
  );

  if (!stage || !title || cards.length === 0) return;

  gsap.set([stage, ...cards], { clearProps: "all" });
  const vh = window.innerHeight;
  const titleRect = title.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();

  gsap.set(stage, { position: "relative" });

  // --- INITIAL CARD STATES ---
  cards.forEach((card, i) => {
    let startY = vh;
    if (i === 0) startY = titleRect.bottom - stageRect.top + 80;

    gsap.set(card, {
      position: "absolute",
      left: "50%",
      xPercent: -50,
      y: startY,
      scale: 1.2,
      opacity: 1,
      zIndex: 1,
    });
  });

  const sectionHeight = vh * cards.length;

  // --- PIN STAGE DURING SCROLL ---
  ScrollTrigger.create({
    trigger: stage,
    start: "top top",
    end: `+=${sectionHeight}`,
    pin: true,
    pinSpacing: true,
    scrub: true,
  });

  // --- FIRST CARD ENTRY ANIMATION ---
  const firstCard = cards[0];
  gsap.to(firstCard, {
    scale: 1,
    y: vh / 2 - firstCard.offsetHeight / 2 - 150,
    ease: "linear",
    scrollTrigger: {
      trigger: firstCard,
      start: "top bottom",
      end: "center center",
      scrub: true,
    },
  });

  // --- STACKED CARDS TIMELINE ---
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stage,
      start: "top top",
      end: `+=${sectionHeight}`,
      scrub: 0.5,
    },
  });

  cards.slice(1).forEach((card, i) => {
    const prevCard = cards[i];
    tl.set(card, { zIndex: 10 });
    tl.to(card, { y: 0, scale: 1, opacity: 1, duration: 1, ease: "linear" });
    if (prevCard) {
      tl.to(
        prevCard,
        { scale: 0.7, opacity: 0, zIndex: 1, duration: 1, ease: "linear" },
        "<",
      );
    }
  });

  // --- LAST CARD EXIT ---
  const lastCard = cards[cards.length - 1];
  tl.to(lastCard, {
    scale: 0.7,
    opacity: 0.6,
    y: -150,
    duration: 1,
    ease: "linear",
  });
};
