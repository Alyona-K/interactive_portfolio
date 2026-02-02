// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// /* --------------------------------------------------
//    PUBLIC API
//    Initializes hero intro animation based on viewport.
//    Optional onComplete callback fires when timeline finishes.
// -------------------------------------------------- */
// export const animateHeroIntro = (onComplete?: () => void) => {
//   setupBase();

//   const mm = gsap.matchMedia();

//   // --- MOBILE: SIMPLE Y-OFFSET ANIMATION ---
//   mm.add("(max-width: 767px)", () => {
//     introMobile(onComplete);
//   });

//   // --- TABLET: MODERATE OFFSET AND POSITION ADJUSTMENTS ---
//   mm.add("(min-width: 768px) and (max-width: 1279px)", () => {
//     introTablet(onComplete);
//   });

//   // --- DESKTOP: LARGEST OFFSET, TIMING TWEAKS ---
//   mm.add("(min-width: 1280px)", () => {
//     introDesktop(onComplete);
//   });
// };

// /* --------------------------------------------------
//    BASE SETUP (COMMON FOR ALL VIEWPORTS)
//    Prepares initial opacity, scale, and mask states
//    to allow consistent animation entry.
// -------------------------------------------------- */
// const setupBase = () => {
//   gsap.set(".hero", { autoAlpha: 1 });

//   gsap.set(".hero__logo", {
//     autoAlpha: 0,
//     scale: 1.8,
//     x: 0,
//     y: 0,
//     transformOrigin: "50% 50%",
//   });

//   gsap.set(".hero__author-logo", { maskSize: "0% 100%" });
//   gsap.set(".hero__line", { scaleY: 0, transformOrigin: "top" });
//   gsap.set(".hero__title", { autoAlpha: 0 });
// };

// /* --------------------------------------------------
//    MOBILE INTRO
//    Simpler vertical movement with logo reveal and line draw.
// -------------------------------------------------- */
// const introMobile = (onComplete?: () => void) => {
//   const tl = gsap.timeline({ onComplete });

//   tl.to(".hero__logo", { autoAlpha: 1, duration: 0.3 });

//   drawLogoParts(tl);

//   // --- MOVE LOGO UP AND SCALE DOWN ---
//   tl.to(".hero__logo", {
//     y: -130,
//     scale: 1,
//     duration: 0.6,
//     ease: "power2.in",
//   });

//   tl.to(".hero__author-logo", {
//     maskSize: "100% 100%",
//     duration: 0.8,
//   });

//   drawLine(tl);
//   revealTitle(tl);

//   return tl;
// };

// /* --------------------------------------------------
//    TABLET INTRO
//    Adjusted x/y offsets for tablet layout.
// -------------------------------------------------- */
// const introTablet = (onComplete?: () => void) => {
//   const tl = gsap.timeline({ onComplete });

//   tl.to(".hero__logo", { autoAlpha: 1, duration: 0.3 });

//   drawLogoParts(tl);

//   tl.to(".hero__logo", {
//     x: 126,
//     y: -110,
//     scale: 1,
//     duration: 0.6,
//     ease: "power2.in",
//   });

//   tl.to(".hero__author-logo", {
//     maskSize: "100% 100%",
//     duration: 0.8,
//   });

//   drawLine(tl);
//   revealTitle(tl);

//   return tl;
// };

// /* --------------------------------------------------
//    DESKTOP INTRO
//    Largest x/y offsets with slightly overlapped timing
//    for logo author reveal.
// -------------------------------------------------- */
// const introDesktop = (onComplete?: () => void) => {
//   const tl = gsap.timeline({
//     defaults: { ease: "linear" },
//     onComplete,
//   });

//   tl.to(".hero__logo", { autoAlpha: 1, duration: 0.3 });

//   drawLogoParts(tl);

//   tl.to(".hero__logo", {
//     x: 200,
//     y: -152,
//     scale: 1,
//     duration: 0.6,
//     ease: "power2.in",
//   });

//   // --- AUTHOR LOGO MASK: TIMING OFFSET TO OVERLAP LOGO ANIMATION ---
//   tl.to(
//     ".hero__author-logo",
//     { maskSize: "100% 100%", duration: 0.8 },
//     "-=0.4"
//   );

//   drawLine(tl);
//   revealTitle(tl);

//   return tl;
// };

// /* --------------------------------------------------
//    REUSABLE TIMELINE BLOCKS
//    Modular timeline pieces for consistency across breakpoints.
// -------------------------------------------------- */
// const drawLogoParts = (tl: gsap.core.Timeline) => {
//   tl.to(".logo__part-1", { maskSize: "100% 100%", duration: 0.5 });
//   tl.to(".logo__part-2", { maskSize: "100% 100%", duration: 0.8 });
//   tl.to(".logo__part-3", { maskSize: "100% 100%", duration: 0.5 });
// };

// const drawLine = (tl: gsap.core.Timeline) => {
//   tl.fromTo(
//     ".hero__line",
//     { scaleY: 0 },
//     { scaleY: 1, duration: 0.5, ease: "power2.in" }
//   );
// };

// const ORIGINAL_TITLE = "FRONTEND DEVELOPER";

// /**
//  * --- TITLE REVEAL ---
//  * Animates text appearance letter by letter.
//  * Updates DOM textContent on timeline updates.
//  */
// export const revealTitle = (tl: gsap.core.Timeline) => {
//   const title = document.querySelector<HTMLParagraphElement>(".hero__title");
//   if (!title) return;

//   const obj = { length: 0 };
//   title.textContent = "";

//   gsap.set(title, { autoAlpha: 1 });

//   tl.to(obj, {
//     length: ORIGINAL_TITLE.length,
//     duration: 1.2,
//     ease: "none",
//     onUpdate: () => {
//       title.textContent = ORIGINAL_TITLE.slice(0, Math.floor(obj.length));
//     },
//   });
// };

// /**
//  * --- HERO SCROLL EFFECT ---
//  * Scales and fades out hero content on page scroll.
//  * ScrollTrigger automatically updates values on scroll.
//  */
// export const animateHeroScroll = () => {
//   gsap.to(".hero__content", {
//     scale: 0.6,
//     autoAlpha: 0,
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".hero",
//       start: "top top",
//       end: "bottom top",
//       scrub: true,
//       invalidateOnRefresh: false,
//     },
//   });
// };

//----------

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------------
   Public API
-------------------------------------------------- */

export const animateHeroIntro = (onComplete?: () => void) => {
  setupBase();

  const mm = gsap.matchMedia();

  mm.add("(max-width: 767px)", () => {
    introMobile(onComplete);
  });

  mm.add("(min-width: 768px) and (max-width: 1279px)", () => {
    introTablet(onComplete);
  });

  mm.add("(min-width: 1280px)", () => {
    introDesktop(onComplete);
  });
};

/* --------------------------------------------------
   Base setup (common for all)
-------------------------------------------------- */

const setupBase = () => {
  gsap.set(".hero", { autoAlpha: 1 });

  gsap.set(".hero__logo", {
    autoAlpha: 0,
    scale: 1.8,
    x: 0,
    y: 0,
    transformOrigin: "50% 50%",
  });

  gsap.set(".hero__author-logo", { maskSize: "0% 100%" });
  gsap.set(".hero__line", { scaleY: 0, transformOrigin: "top" });
  gsap.set(".hero__title", { autoAlpha: 0 });
};

/* --------------------------------------------------
   MOBILE INTRO
-------------------------------------------------- */

const introMobile = (onComplete?: () => void) => {
  const tl = gsap.timeline({
    onComplete,
  });

  tl.to(".hero__logo", { autoAlpha: 1, duration: 0.3 });

  drawLogoParts(tl);

  tl.to(".hero__logo", {
    y: -130,
    scale: 1,
    duration: 0.6,
    ease: "power2.in",
  });

  tl.to(".hero__author-logo", {
    maskSize: "100% 100%",
    duration: 0.8,
  });

  drawLine(tl);
  revealTitle(tl);

  return tl;
};

/* --------------------------------------------------
   TABLET INTRO
-------------------------------------------------- */

const introTablet = (onComplete?: () => void) => {
  const tl = gsap.timeline({
    onComplete,
  });

  tl.to(".hero__logo", { autoAlpha: 1, duration: 0.3 });

  drawLogoParts(tl);

  tl.to(".hero__logo", {
    x: 126,
    y: -110,
    scale: 1,
    duration: 0.6,
    ease: "power2.in",
  });

  tl.to(".hero__author-logo", {
    maskSize: "100% 100%",
    duration: 0.8,
  });

  drawLine(tl);
  revealTitle(tl);

  return tl;
};

/* --------------------------------------------------
   DESKTOP INTRO
-------------------------------------------------- */

const introDesktop = (onComplete?: () => void) => {
  const tl = gsap.timeline({
    defaults: { ease: "linear" },
    onComplete,
  });

  tl.to(".hero__logo", { autoAlpha: 1, duration: 0.3 });

  drawLogoParts(tl);

  tl.to(".hero__logo", {
    x: 200,
    y: -152,
    scale: 1,
    duration: 0.6,
    ease: "power2.in",
  });

  tl.to(
    ".hero__author-logo",
    {
      maskSize: "100% 100%",
      duration: 0.8,
    },
    "-=0.4"
  );

  drawLine(tl);
  revealTitle(tl);

  return tl;
};

/* --------------------------------------------------
   Reusable timeline blocks
-------------------------------------------------- */

const drawLogoParts = (tl: gsap.core.Timeline) => {
  tl.to(".logo__part-1", { maskSize: "100% 100%", duration: 0.5 });
  tl.to(".logo__part-2", { maskSize: "100% 100%", duration: 0.8 });
  tl.to(".logo__part-3", { maskSize: "100% 100%", duration: 0.5 });
};

const drawLine = (tl: gsap.core.Timeline) => {
  tl.fromTo(
    ".hero__line",
    { scaleY: 0 },
    { scaleY: 1, duration: 0.5, ease: "power2.in" }
  );
};

const ORIGINAL_TITLE = "FRONTEND DEVELOPER";

export const revealTitle = (tl: gsap.core.Timeline) => {
  const title = document.querySelector<HTMLParagraphElement>(".hero__title");
  if (!title) return;

  const obj = { length: 0 };
  title.textContent = "";

  gsap.set(title, { autoAlpha: 1 });

  tl.to(obj, {
    length: ORIGINAL_TITLE.length,
    duration: 1.2,
    ease: "none",
    onUpdate: () => {
      title.textContent = ORIGINAL_TITLE.slice(0, Math.floor(obj.length));
    },
  });
};

export const animateHeroScroll = () => {
  gsap.to(".hero__content", {
    scale: 0.6,
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: false,
    },
  });
};

//--------------------------

// версия с промисами

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// /* --------------------------------------------------
//    Public API
// -------------------------------------------------- */

// export const animateHeroIntro = (): Promise<void> => {
//   return new Promise((resolve) => {
//     setupBase();

//     const mm = gsap.matchMedia();

//     mm.add("(max-width: 767px)", () => {
//       introMobile(resolve);
//     });

//     mm.add("(min-width: 768px) and (max-width: 1279px)", () => {
//       introTablet(resolve);
//     });

//     mm.add("(min-width: 1280px)", () => {
//       introDesktop(resolve);
//     });
//   });
// };

// /* --------------------------------------------------
//    Base setup (common for all)
// -------------------------------------------------- */

// const setupBase = () => {
//   gsap.set(".hero", { autoAlpha: 1 });
//   gsap.set("header, footer", { autoAlpha: 1 });

//   gsap.set(".hero__logo", {
//     autoAlpha: 0,
//     scale: 1.4,
//     x: 0,
//     y: 0,
//     transformOrigin: "50% 50%",
//   });

//   gsap.set(".hero__author-logo", { maskSize: "0% 100%" });
//   gsap.set(".hero__line", { scaleY: 0, transformOrigin: "top" });
//   gsap.set(".hero__title", { autoAlpha: 0 });
// };

// /* --------------------------------------------------
//    MOBILE INTRO
// -------------------------------------------------- */

// const introMobile = (resolve: () => void) => {

//   const tl = gsap.timeline({ onComplete: resolve });

//   tl.to(".hero__logo", { autoAlpha: 1, duration: 0.3 });

//   tl.to(".logo__part-1", { maskSize: "100% 100%", duration: 0.4 });
//   tl.to(".logo__part-2", { maskSize: "100% 100%", duration: 0.6 });
//   tl.to(".logo__part-3", { maskSize: "100% 100%", duration: 0.4 });

//   tl.to(".hero__logo", {
//     y: -130,
//     scale: 1,
//     duration: 0.6,
//     ease: "power2.in",
//   });

//   tl.to(".hero__author-logo", {
//     maskSize: "100% 100%",
//     duration: 0.8,
//   });

//   drawLine(tl);
//   revealTitle(tl);
// };

// /* --------------------------------------------------
//    TABLET INTRO
// -------------------------------------------------- */

// const introTablet = (resolve: () => void) => {

//   const tl = gsap.timeline({ onComplete: resolve });

//   tl.to(".hero__logo", { autoAlpha: 1, duration: 0.3 });

//   drawLogoParts(tl);

//   tl.to(".hero__logo", {
//     x: 126,
//     y: -110,
//     scale: 1,
//     duration: 0.6,
//     ease: "power2.in",
//   });

//   tl.to(".hero__author-logo", {
//     maskSize: "100% 100%",
//     duration: 0.8,
//   });

//   drawLine(tl);
//   revealTitle(tl);
// };

// /* --------------------------------------------------
//    DESKTOP INTRO
// -------------------------------------------------- */

// const introDesktop = (resolve: () => void) => {

//   const tl = gsap.timeline({
//     defaults: { ease: "linear" },
//     onComplete: resolve 
//   });

//   tl.to(".hero__logo", { autoAlpha: 1, duration: 0.3 });

//   tl.to(".logo__part-1", { maskSize: "100% 100%", duration: 0.5 });
//   tl.to(".logo__part-2", { maskSize: "100% 100%", duration: 0.8 });
//   tl.to(".logo__part-3", { maskSize: "100% 100%", duration: 0.5 });

//   tl.to(".hero__logo", {
//     x: 200,
//     y: -152,
//     scale: 1,
//     duration: 0.6,
//     ease: "power2.in",
//   });

//   tl.to(
//     ".hero__author-logo",
//     {
//       maskSize: "100% 100%",
//       duration: 0.8,
//     },
//     "-=0.4"
//   );

//   drawLine(tl);
//   revealTitle(tl);

//   tl.fromTo(
//     "header",
//     { y: -100, autoAlpha: 0 },
//     { y: 0, autoAlpha: 1, duration: 0.3 }
//   );
// };

// /* --------------------------------------------------
//    Reusable timeline blocks
// -------------------------------------------------- */

// const drawLogoParts = (tl: gsap.core.Timeline) => {
//   tl.to(".logo__part-1", { maskSize: "100% 100%", duration: 0.5 });
//   tl.to(".logo__part-2", { maskSize: "100% 100%", duration: 0.8 });
//   tl.to(".logo__part-3", { maskSize: "100% 100%", duration: 0.5 });
// };

// const drawLine = (tl: gsap.core.Timeline) => {
//   tl.fromTo(
//     ".hero__line",
//     { scaleY: 0, transformOrigin: "top" },
//     { scaleY: 1, duration: 0.5, ease: "power2.in" }
//   );
// };

// const ORIGINAL_TITLE = "FRONTEND DEVELOPER";

// const revealTitle = (tl: gsap.core.Timeline) => {
//   const title = document.querySelector<HTMLParagraphElement>(".hero__title");
//   if (!title) return;

//   const text = ORIGINAL_TITLE;
//   const obj = { length: 0 };

//   title.textContent = "";
//   gsap.set(title, { autoAlpha: 1 });

//   tl.to(obj, {
//     length: text.length,
//     duration: 1.2,
//     ease: "none",
//     onUpdate: () => {
//       title.textContent = text.slice(0, Math.floor(obj.length));
//     },
//   });
// };

// export const animateHeroScroll = () => {
//   gsap.to(".hero__content", {
//     scale: 0.6,
//     autoAlpha: 0,
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".hero",
//       start: "top top",
//       end: "bottom top",
//       scrub: true,
//       invalidateOnRefresh: false,
//     },
//   });
// };

//-------------

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const animateHeroIntro = (): Promise<void> => {
//   return new Promise((resolve) => {
//     gsap.set("header, footer", { autoAlpha: 1 });
//     gsap.set(".hero", { opacity: 1 });

//     const tl = gsap.timeline({
//       defaults: { ease: "linear" },
//       onComplete: () => resolve(), // <- промис завершён
//     });

//     // 1. Появление логотипа
//     tl.to(".hero__logo", { opacity: 1, duration: 0.3 });

//     // 2. Отрисовка частей логотипа
//     tl.to(".logo__part-1", { maskSize: "100% 100%", webkitMaskSize: "100% 100%", duration: 0.5 });
//     tl.to(".logo__part-2", { maskSize: "100% 100%", webkitMaskSize: "100% 100%", duration: 0.8 });
//     tl.to(".logo__part-3", { maskSize: "100% 100%", webkitMaskSize: "100% 100%", duration: 0.5 });

//     // 3. Перемещение логотипа
//     tl.to(".hero__logo", { y: -164, x: 242, scale: 1, duration: 0.6, ease: "power2.in" });

//     // 4. Имя и фамилия
//     tl.to(".hero__author-logo", { maskSize: "100% 100%", webkitMaskSize: "100% 100%", duration: 0.8 }, "-=0.4");

//     // 5. Вертикальная линия
//     tl.fromTo(".hero__line", { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 0.5, ease: "power2.in" });

//     // 6. Печатный текст
//     const title = document.querySelector<HTMLParagraphElement>(".hero__title");
//     if (title) {
//       const fullText = title.textContent || "";
//       const textObj = { length: 0 };

//       tl.to(textObj, {
//         length: fullText.length,
//         duration: 1.2,
//         ease: "none",
//       onStart: () => {
//         gsap.set(title, { autoAlpha: 1 });
//       },
//         onUpdate: () => { title.textContent = fullText.slice(0, Math.floor(textObj.length)); },
//       });
//     }

//     // 7. Хедер
//     tl.fromTo("header", { y: -100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" });
//   });
// };

// export const animateHeroScroll = () => {
//   gsap.to(".hero__content", {
//     scale: 0.6,
//     autoAlpha: 0,
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".hero",
//       start: "top top",
//       end: "bottom top",
//       scrub: true,
//       invalidateOnRefresh: false, //  ключевая оптимизация
//     },
//   });
// };
