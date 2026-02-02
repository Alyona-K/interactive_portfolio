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
    rootEl.querySelectorAll(".project-card")
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
        "<"
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
    rootEl.querySelectorAll(".project-card")
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
        "<"
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

//--------------

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // --- PUBLIC API: ANIMATE PROJECTS GALLERY BASED ON VIEWPORT ---
// export const animateProjectsGallery = (rootEl: HTMLElement | null) => {
//   if (!rootEl) return;

//   const ctx = gsap.context(() => {
//     const mm = gsap.matchMedia();

//     // --- MOBILE VIEWPORT ---
//     mm.add("(max-width: 767px)", () => {
//       mobileScene(rootEl);
//     });

//     // --- TABLET VIEWPORT ---
//     mm.add("(min-width: 768px) and (max-width: 1279px)", () => {
//       tabletScene(rootEl);
//     });

//     // --- DESKTOP VIEWPORT ---
//     mm.add("(min-width: 1280px)", () => {
//       desktopScene(rootEl);
//     });
//   }, rootEl);

//   return () => ctx.revert();
// };

// // --- MOBILE SCENE: NO ANIMATION ---
// const mobileScene = (rootEl: HTMLElement) => {
//   const stage = rootEl.querySelector<HTMLElement>(".projects-gallery__stage");
//   const cards = rootEl.querySelectorAll<HTMLElement>(".project-card");

//   if (!stage) return;

//   // --- CLEAR INLINE STYLES ---
//   gsap.set(stage, { clearProps: "position,height" });
//   gsap.set(cards, { clearProps: "all" });
// };

// // --- TABLET SCENE ---
// const tabletScene = (rootEl: HTMLElement) => {
//   const stage = rootEl.querySelector<HTMLElement>(".projects-gallery__stage");
//   const title = rootEl.querySelector<HTMLElement>(".projects-gallery__title");
//   const cards = gsap.utils.toArray<HTMLElement>(
//     rootEl.querySelectorAll(".project-card")
//   );

//   if (!stage || !title || cards.length === 0) return;

//   // --- RESET ALL INLINE STYLES ---
//   gsap.set([stage, ...cards], { clearProps: "all" });

//   const vh = window.innerHeight;
//   const titleRect = title.getBoundingClientRect();
//   const stageRect = stage.getBoundingClientRect();

//   gsap.set(stage, { position: "relative" });

//   // --- INITIAL STATE FOR TABLET ---
//   cards.forEach((card, i) => {
//     let startY = vh;
//     if (i === 0) startY = titleRect.bottom - stageRect.top + 70;

//     gsap.set(card, {
//       position: "absolute",
//       left: "50%",
//       xPercent: -50,
//       y: startY,
//       scale: 1.2,
//       opacity: 1,
//       zIndex: 1,
//     });
//   });

//   const sectionHeight = vh * cards.length;

//   // --- PIN STAGE DURING SCROLL ---
//   ScrollTrigger.create({
//     trigger: stage,
//     start: "top top",
//     end: `+=${sectionHeight}`,
//     pin: true,
//     pinSpacing: true,
//     scrub: true,
//   });

//   // --- FIRST CARD ANIMATION ---
//   const firstCard = cards[0];
//   gsap.to(firstCard, {
//     scale: 1,
//     y: vh / 2 - firstCard.offsetHeight / 2 - 300,
//     ease: "linear",
//     scrollTrigger: {
//       trigger: firstCard,
//       start: "top bottom",
//       end: "center center",
//       scrub: true,
//     },
//   });

//   // --- REST OF THE CARDS ANIMATION ---
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: stage,
//       start: "top top",
//       end: `+=${sectionHeight}`,
//       scrub: 0.5,
//     },
//   });

//   cards.slice(1).forEach((card, i) => {
//     const prevCard = cards[i];
//     tl.set(card, { zIndex: 10 });
//     tl.to(card, { y: 0, scale: 1, opacity: 1, duration: 1, ease: "linear" });
//     if (prevCard) {
//       tl.to(
//         prevCard,
//         { scale: 0.7, opacity: 0, zIndex: 1, duration: 1, ease: "linear" },
//         "<"
//       );
//     }
//   });

//   // --- LAST CARD EXIT ---
//   const lastCard = cards[cards.length - 1];
//   tl.to(lastCard, {
//     scale: 0.7,
//     opacity: 0.6,
//     y: -100,
//     duration: 1,
//     ease: "linear",
//   });
// };

// // --- DESKTOP SCENE ---
// const desktopScene = (rootEl: HTMLElement) => {
//   const stage = rootEl.querySelector<HTMLElement>(".projects-gallery__stage");
//   const title = rootEl.querySelector<HTMLElement>(".projects-gallery__title");
//   const cards = gsap.utils.toArray<HTMLElement>(
//     rootEl.querySelectorAll(".project-card")
//   );

//   if (!stage || !title || cards.length === 0) return;

//   // --- RESET ALL INLINE STYLES ---
//   gsap.set([stage, ...cards], { clearProps: "all" });

//   const vh = window.innerHeight;
//   const titleRect = title.getBoundingClientRect();
//   const stageRect = stage.getBoundingClientRect();

//   gsap.set(stage, { position: "relative" });

//   // --- INITIAL STATE FOR DESKTOP ---
//   cards.forEach((card, i) => {
//     let startY = vh;
//     if (i === 0) startY = titleRect.bottom - stageRect.top + 80;

//     gsap.set(card, {
//       position: "absolute",
//       left: "50%",
//       xPercent: -50,
//       y: startY,
//       scale: 1.2,
//       opacity: 1,
//       zIndex: 1,
//     });
//   });

//   const sectionHeight = vh * cards.length;

//   // --- PIN STAGE DURING SCROLL ---
//   ScrollTrigger.create({
//     trigger: stage,
//     start: "top top",
//     end: `+=${sectionHeight}`,
//     pin: true,
//     pinSpacing: true,
//     scrub: true,
//   });

//   // --- FIRST CARD ANIMATION ---
//   const firstCard = cards[0];
//   gsap.to(firstCard, {
//     scale: 1,
//     y: vh / 2 - firstCard.offsetHeight / 2 - 150,
//     ease: "linear",
//     scrollTrigger: {
//       trigger: firstCard,
//       start: "top bottom",
//       end: "center center",
//       scrub: true,
//     },
//   });

//   // --- OTHER CARDS ANIMATION ---
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: stage,
//       start: "top top",
//       end: `+=${sectionHeight}`,
//       scrub: 0.5,
//     },
//   });

//   cards.slice(1).forEach((card, i) => {
//     const prevCard = cards[i];
//     tl.set(card, { zIndex: 10 });
//     tl.to(card, { y: 0, scale: 1, opacity: 1, duration: 1, ease: "linear" });
//     if (prevCard) {
//       tl.to(
//         prevCard,
//         { scale: 0.7, opacity: 0, zIndex: 1, duration: 1, ease: "linear" },
//         "<"
//       );
//     }
//   });

//   // --- LAST CARD EXIT ---
//   const lastCard = cards[cards.length - 1];
//   tl.to(lastCard, {
//     scale: 0.7,
//     opacity: 0.6,
//     y: -150,
//     duration: 1,
//     ease: "linear",
//   });
// };


//----------

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// /* --------------------------------------------------
//    Public API
// -------------------------------------------------- */
// export const animateProjectsGallery = (rootEl: HTMLElement | null) => {
//   if (!rootEl) return;

//   const ctx = gsap.context(() => {
//     const mm = gsap.matchMedia();

//     mm.add("(max-width: 767px)", () => {
//       mobileScene(rootEl);
//     });

//     mm.add("(min-width: 768px) and (max-width: 1279px)", () => {
//       tabletScene(rootEl);
//     });

//     mm.add("(min-width: 1280px)", () => {
//       desktopScene(rootEl);
//     });
//   }, rootEl);

//   return () => ctx.revert();
// };

// /* --------------------------------------------------
//    MOBILE SCENE (NO ANIMATION)
// -------------------------------------------------- */
// const mobileScene = (rootEl: HTMLElement) => {
//   const stage = rootEl.querySelector<HTMLElement>(".projects-gallery__stage");
//   const cards = rootEl.querySelectorAll<HTMLElement>(".project-card");

//   if (!stage) return;

//   gsap.set(stage, { clearProps: "position,height" });
//   gsap.set(cards, { clearProps: "all" });
// };

// /* --------------------------------------------------
//    TABLET SCENE
// -------------------------------------------------- */
// const tabletScene = (rootEl: HTMLElement) => {
//   const stage = rootEl.querySelector<HTMLElement>(".projects-gallery__stage");
//   const title = rootEl.querySelector<HTMLElement>(".projects-gallery__title");
//   const cards = gsap.utils.toArray<HTMLElement>(
//     rootEl.querySelectorAll(".project-card")
//   );

//   if (!stage || !title || cards.length === 0) return;

//   /* RESET */
//   gsap.set([stage, ...cards], { clearProps: "all" });

//   const vh = window.innerHeight;

//   const titleRect = title.getBoundingClientRect();
//   const stageRect = stage.getBoundingClientRect();

//   gsap.set(stage, { position: "relative" });

//   // ---- INITIAL STATE для планшета ----
//   cards.forEach((card, i) => {
//     let startY = vh;
//     if (i === 0) {
//       startY = titleRect.bottom - stageRect.top + 70;
//     }
//     gsap.set(card, {
//       position: "absolute",
//       left: "50%",
//       xPercent: -50,
//       y: startY,
//       scale: i === 0 ? 1.2 : 1.2,
//       opacity: 1,
//       zIndex: 1,
//     });
//   });

//   const sectionHeight = vh * cards.length;

//   // ---- PIN ----
//   ScrollTrigger.create({
//     trigger: stage,
//     start: "top top",
//     end: `+=${sectionHeight}`,
//     pin: true,
//     pinSpacing: true,
//     scrub: true,
//   });

//   // ---- FIRST CARD анимация ----
//   const firstCard = cards[0];
//   gsap.to(firstCard, {
//     scale: 1,
//     y: vh / 2 - firstCard.offsetHeight / 2 - 300, // центр экрана
//     ease: "linear",
//     scrollTrigger: {
//       trigger: firstCard,
//       start: "top bottom",
//       end: "center center",
//       scrub: true,
//     },
//   });

//   // ---- REST CARDS ----
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: stage,
//       start: "top top",
//       end: `+=${sectionHeight}`,
//       scrub: 0.5,
//     },
//   });

//   cards.slice(1).forEach((card, i) => {
//     const prevCard = cards[i];
//     tl.set(card, { zIndex: 10 });
//     tl.to(card, { y: 0, scale: 1, opacity: 1, duration: 1, ease: "linear" });
//     if (prevCard) {
//       tl.to(
//         prevCard,
//         { scale: 0.7, opacity: 0, zIndex: 1, duration: 1, ease: "linear" },
//         "<"
//       );
//     }
//   });

//   // ---- LAST CARD EXIT ----
//   const lastCard = cards[cards.length - 1];
//   tl.to(lastCard, {
//     scale: 0.7,
//     opacity: 0.6,
//     y: -100,
//     duration: 1,
//     ease: "linear",
//   });
// };

// /* --------------------------------------------------
//    DESKTOP SCENE
// -------------------------------------------------- */
// const desktopScene = (rootEl: HTMLElement) => {
//   const stage = rootEl.querySelector<HTMLElement>(".projects-gallery__stage");
//   const title = rootEl.querySelector<HTMLElement>(".projects-gallery__title");
//   const cards = gsap.utils.toArray<HTMLElement>(
//     rootEl.querySelectorAll(".project-card")
//   );

//   if (!stage || !title || cards.length === 0) return;

//   /* RESET */
//   gsap.set([stage, ...cards], { clearProps: "all" });

//   const vh = window.innerHeight;

//   const titleRect = title.getBoundingClientRect();
//   const stageRect = stage.getBoundingClientRect();

//   gsap.set(stage, { position: "relative" });

//   /* INITIAL STATE */
//   cards.forEach((card, i) => {
//     let startY = vh;
//     if (i === 0) {
//       startY = titleRect.bottom - stageRect.top + 80;
//     }
//     gsap.set(card, {
//       position: "absolute",
//       left: "50%",
//       xPercent: -50,
//       y: startY,
//       scale: i === 0 ? 1.2 : 1.2,
//       opacity: 1,
//       zIndex: 1,
//     });
//   });

//   const sectionHeight = vh * cards.length;

//   /* PIN */
//   ScrollTrigger.create({
//     trigger: stage,
//     start: "top top",
//     end: `+=${sectionHeight}`,
//     pin: true,
//     pinSpacing: true,
//     scrub: true,
//   });

//   /* FIRST CARD */
//   const firstCard = cards[0];
//   gsap.to(firstCard, {
//     scale: 1,
//     y: vh / 2 - firstCard.offsetHeight / 2 - 150, // центр экрана
//     ease: "linear",
//     scrollTrigger: {
//       trigger: firstCard,
//       start: "top bottom",
//       end: "center center",
//       scrub: true,
//     },
//   });

//   /* OTHER CARDS */
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: stage,
//       start: "top top",
//       end: `+=${sectionHeight}`,
//       scrub: 0.5,
//     },
//   });

//   cards.slice(1).forEach((card, i) => {
//     const prevCard = cards[i];
//     tl.set(card, { zIndex: 10 });
//     tl.to(card, { y: 0, scale: 1, opacity: 1, duration: 1, ease: "linear" });
//     if (prevCard) {
//       tl.to(
//         prevCard,
//         { scale: 0.7, opacity: 0, zIndex: 1, duration: 1, ease: "linear" },
//         "<"
//       );
//     }
//   });

//   /* LAST CARD EXIT */
//   const lastCard = cards[cards.length - 1];
//   tl.to(lastCard, {
//     scale: 0.7,
//     opacity: 0.6,
//     y: -150,
//     duration: 1,
//     ease: "linear",
//   });
// };

//---------------- до адаптива

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const animateProjectsGallery = () => {
//   const stage = document.querySelector(
//     ".projects-gallery__stage"
//   ) as HTMLElement;
//   const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
//   const title = document.querySelector(
//     ".projects-gallery__title"
//   ) as HTMLElement;

//   if (!stage || cards.length === 0 || !title) return;

//   const vh = window.innerHeight;
//   gsap.set(stage, { position: "relative" });

//   const titleRect = title.getBoundingClientRect();
//   const stageRect = stage.getBoundingClientRect();

//   // Стартовые позиции всех карточек
//   cards.forEach((card, i) => {
//     let startY = vh;
//     if (i === 0) {
//       startY = titleRect.bottom - stageRect.top + 80;
//     }
//     gsap.set(card, {
//       position: "absolute",
//       left: "50%",
//       xPercent: -50,
//       y: startY,
//       scale: i === 0 ? 1.2 : 1.2,
//       opacity: 1,
//       zIndex: 1,
//     });
//   });

//   const sectionHeight = vh * cards.length;

//   // Пин всей секции
//   ScrollTrigger.create({
//     trigger: stage,
//     start: "top top",
//     end: `+=${sectionHeight}`,
//     pin: true,
//     pinSpacing: true,
//     scrub: true,
//   });

//   // --- Первая карточка: отдельный scrub для плавного уменьшения scale ---
//   const firstCard = cards[0];
//   gsap.to(firstCard, {
//     scale: 1,
//     y: vh / 2 - firstCard.offsetHeight / 2 - 150, // центр экрана
//     ease: "linear",
//     scrollTrigger: {
//       trigger: firstCard,
//       start: "top bottom",
//       end: "center center",
//       scrub: true,
//     },
//   });

//   // --- Остальные карточки ---
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: stage,
//       start: "top top",
//       end: `+=${sectionHeight}`,
//       scrub: 0.5,
//     },
//   });

//   cards.slice(1).forEach((card, i) => {
//     const prevCard = cards[i];
//     tl.set(card, { zIndex: 10 });
//     tl.to(card, { y: 0, scale: 1, opacity: 1, duration: 1, ease: "linear" });
//     if (prevCard) {
//       tl.to(
//         prevCard,
//         { scale: 0.7, opacity: 0, zIndex: 1, duration: 1, ease: "linear" },
//         "<"
//       );
//     }
//   });

//   // Уход последней карточки
//   const lastCard = cards[cards.length - 1];
//   tl.to(lastCard, {
//     scale: 0.7,
//     opacity: 0.6,
//     y: -150,
//     duration: 1,
//     ease: "linear",
//   });
// };

//---------------

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const animateProjectsGallery = () => {
//   const stage = document.querySelector(".projects-gallery__stage") as HTMLElement;
//   const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
//   const title = document.querySelector(".projects-gallery__title") as HTMLElement;

//   if (!stage || cards.length === 0 || !title) return;

//   const vh = window.innerHeight;
//   gsap.set(stage, { position: "relative" });

//   const titleRect = title.getBoundingClientRect();
//   const stageRect = stage.getBoundingClientRect();

//   // Устанавливаем стартовые позиции карточек
//   cards.forEach((card, i) => {
//     let startY = vh;
//     if (i === 0) {
//       // Первая карточка стартует под заголовком
//       startY = titleRect.bottom - stageRect.top + 50;
//     }
//     gsap.set(card, {
//       position: "absolute",
//       left: "50%",
//       xPercent: -50,
//       y: startY,
//       scale: 1.2,
//       opacity: 1,
//       zIndex: 1,
//     });
//   });

//   const sectionHeight = vh * cards.length;

//   ScrollTrigger.create({
//     trigger: stage,
//     start: "top top",
//     end: `+=${sectionHeight}`,
//     pin: true,
//     pinSpacing: true,
//     scrub: true,
//   });

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: stage,
//       start: "top top",
//       end: `+=${sectionHeight}`,
//       scrub: 0.5,
//     },
//   });

// cards.forEach((card, i) => {
//   const prevCard = cards[i - 1];

//   tl.set(card, { zIndex: 10 });

//   if (i === 0) {
//     // Первая карточка: отдельно скролл-триггер для плавного уменьшения масштаба
//     gsap.fromTo(
//       card,
//       { scale: 1.2 },
//       {
//         scale: 1,
//         y: 0,
//         ease: "linear",
//         scrollTrigger: {
//           trigger: card,
//           start: "top bottom",  // когда верхняя граница карточки касается нижней границы экрана
//           end: "center center",  // пока карточка доходит до центра экрана
//           scrub: true,
//         },
//       }
//     );
//   } else {
//     // все остальные карточки — стандартная логика
//     tl.to(card, { y: 0, scale: 1, opacity: 1, duration: 1, ease: "linear" });
//     if (prevCard) {
//       tl.to(
//         prevCard,
//         { scale: 0.7, opacity: 0, zIndex: 1, duration: 1, ease: "linear" },
//         "<"
//       );
//     }
//   }
// });

//   const lastCard = cards[cards.length - 1];
//   tl.to(lastCard, { scale: 0.7, opacity: 0.6, y: -150, duration: 1, ease: "linear" });
// };

//-----------

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const animateProjectsGallery = () => {
//   const stage = document.querySelector(
//     ".projects-gallery__stage"
//   ) as HTMLElement;
//   const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
//   if (!stage || cards.length === 0) return;

//   const vh = window.innerHeight;

//   // Ставим stage в relative, карточки — абсолютные
//   gsap.set(stage, { position: "relative" });

//   cards.forEach((card) => {
//     gsap.set(card, {
//       position: "absolute",
//       left: "50%",
//       xPercent: -50,
//       y: vh, // старт с нижней границы окна
//       scale: 1.2,
//       opacity: 1,
//       zIndex: 1, // все одинаково
//     });
//   });

//   // Стартовое положение всех карточек — снизу
//   cards.forEach((card) => gsap.set(card, { y: vh, scale: 1.2, opacity: 1 }));

//   const sectionHeight = vh * cards.length;

//   ScrollTrigger.create({
//     trigger: stage,
//     start: "top top",
//     end: `+=${sectionHeight}`,
//     pin: true,
//     pinSpacing: true,
//     scrub: true,
//   });

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: stage,
//       start: "top top",
//       end: `+=${sectionHeight}`,
//       scrub: 0.5,
//     },
//   });

//   cards.forEach((card, i) => {
//     const prevCard = cards[i - 1];

//     // текущая карточка всегда сверху
//     tl.set(card, { zIndex: 10 });

//     // поднимаем к центру
//     tl.to(card, { y: 0, scale: 1, opacity: 1, duration: 1, ease: "linear" });

//     // предыдущая карточка уходит вниз и в фон
//     if (prevCard) {
//       tl.to(
//         prevCard,
//         { scale: 0.7, opacity: 0, zIndex: 1, duration: 1, ease: "linear" },
//         "<"
//       );
//     }
//   });

//   // Анимация ухода последней карточки
//   const lastCard = cards[cards.length - 1];
//   tl.to(lastCard, {
//     scale: 0.7,
//     opacity: 0.6,
//     y: -150, // чуть вверх — выглядит как уход за экран
//     duration: 1,
//     ease: "linear",
//   });
// };
