import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------------
   PUBLIC API
   Initializes responsive scroll-triggered animations for About section.
   Returns cleanup function to revert matchMedia and ScrollTrigger effects.
-------------------------------------------------- */
export const animateAbout = (rootEl: HTMLElement | null) => {
  if (!rootEl) return;

  setupBase(rootEl);

  const mm = gsap.matchMedia();

  // Breakpoint-specific scenes
  mm.add("(max-width: 767px)", () => mobileScene(rootEl));
  mm.add("(min-width: 768px) and (max-width: 1279px)", () =>
    tabletScene(rootEl)
  );
  mm.add("(min-width: 1280px)", () => desktopScene(rootEl));

  return () => mm.revert(); // Cleanup GSAP matchMedia
};

/* --------------------------------------------------
   BASE SETUP
   Prepare elements for animation with will-change hints for performance
-------------------------------------------------- */
const setupBase = (rootEl: HTMLElement) => {
  const bg = rootEl.querySelector<HTMLElement>(".about__bg");
  const photo = rootEl.querySelector<HTMLElement>(".about__photo");

  if (bg) gsap.set(bg, { willChange: "height" });
  if (photo) gsap.set(photo, { willChange: "transform, opacity" });
};

/* --------------------------------------------------
   MOBILE SCENE
   Fade-in animation for title and photo on small screens
   Simple stagger for readability and performance
-------------------------------------------------- */
export const mobileScene = (rootEl: HTMLElement) => {
  const photo = rootEl.querySelector<HTMLElement>(".about__photo");
  const title = rootEl.querySelector<HTMLElement>(".about__title");
  const texts = rootEl.querySelectorAll<HTMLElement>(".about__text");

  if (!photo || !title) return;

  title.dataset.split = "";
  texts.forEach((p) => (p.dataset.split = ""));
  splitTitleToChars(title);
  splitTextToLines(texts);

  const titleChars = title.querySelectorAll<HTMLElement>("span");
  const lines = rootEl.querySelectorAll<HTMLElement>(".about__text span");

  // Force initial visibility state
  gsap.set([lines], { autoAlpha: 1, y: 0 });
  gsap.set(photo, { autoAlpha: 0 });
  gsap.set(titleChars, { autoAlpha: 0, y: 10 });

  const scrollConfig = {
    trigger: rootEl,
    start: "top 90%",
    end: "bottom 90%",
    scrub: true,
  };

  gsap.to(photo, { autoAlpha: 1, scrollTrigger: scrollConfig });
  gsap.fromTo(
    titleChars,
    { autoAlpha: 0, y: 10 },
    { autoAlpha: 1, y: 0, stagger: 0.3, scrollTrigger: scrollConfig }
  );
};

/* --------------------------------------------------
   TABLET SCENE
   Staggered animations for title, text lines, button and photo
   Content scale and opacity effect for scroll depth
-------------------------------------------------- */
export const tabletScene = (rootEl: HTMLElement) => {
  const photo = rootEl.querySelector<HTMLElement>(".about__photo");
  const title = rootEl.querySelector<HTMLElement>(".about__title");
  const texts = rootEl.querySelectorAll<HTMLElement>(".about__text");
  const btn = rootEl.querySelector<HTMLElement>(".about__btn");
  const content = rootEl.querySelector<HTMLElement>(".about__inner");
  if (!photo || !title || !content) return;

  title.dataset.split = "";
  texts.forEach((p) => (p.dataset.split = ""));
  splitTitleToChars(title);
  splitTextToLines(texts);

  const titleChars = title.querySelectorAll<HTMLElement>("span");
  const lines = rootEl.querySelectorAll<HTMLElement>(".about__text span");

  gsap.set(photo, { autoAlpha: 0 });
  gsap.set([titleChars, lines, btn], { autoAlpha: 0, y: 10 });

  const scrollConfig = {
    trigger: rootEl,
    start: "top bottom",
    end: "top top+=200",
    scrub: true,
  };

  gsap.to(photo, { autoAlpha: 1, ease: "none", scrollTrigger: scrollConfig });
  gsap.fromTo(
    titleChars,
    { autoAlpha: 0, y: 10 },
    { autoAlpha: 1, y: 0, stagger: 0.2, ease: "none", scrollTrigger: scrollConfig }
  );
  gsap.fromTo(
    lines,
    { autoAlpha: 0, y: 10 },
    { autoAlpha: 1, y: 0, stagger: 0.15, ease: "none", scrollTrigger: scrollConfig }
  );
  if (btn)
    gsap.fromTo(
      btn,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, ease: "none", scrollTrigger: scrollConfig }
    );

  // Scale down and fade out content on scroll
  gsap.to(content, {
    scale: 0.6,
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: {
      trigger: rootEl,
      start: "top top+=100",
      end: "bottom top",
      scrub: true,
    },
  });
};

/* --------------------------------------------------
   DESKTOP SCENE
   Horizontal photo movement and staggered fade-in for text and buttons
   Content scale and fade effect for deep scroll
-------------------------------------------------- */
export const desktopScene = (rootEl: HTMLElement) => {
  const photo = rootEl.querySelector<HTMLElement>(".about__photo");
  const title = rootEl.querySelector<HTMLElement>(".about__title");
  const texts = rootEl.querySelectorAll<HTMLElement>(".about__text");
  const content = rootEl.querySelector<HTMLElement>(".about__inner");
  const btn = rootEl.querySelector<HTMLElement>(".about__btn");

  if (!photo || !title || !content) return;

  title.dataset.split = "";
  texts.forEach((p) => (p.dataset.split = ""));
  splitTitleToChars(title);
  splitTextToLines(texts);

  const titleChars = title.querySelectorAll<HTMLElement>("span");
  const lines = rootEl.querySelectorAll<HTMLElement>(".about__text span");

  const scrollConfig = {
    trigger: rootEl,
    start: "top bottom",
    end: "top top+=200",
    scrub: true,
  };

  gsap.fromTo(
    titleChars,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, stagger: 0.2, ease: "none", scrollTrigger: scrollConfig }
  );
  gsap.fromTo(
    lines,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, stagger: 0.2, ease: "none", scrollTrigger: scrollConfig }
  );
  gsap.fromTo(
    photo,
    { opacity: 0, x: -130 },
    { opacity: 1, x: 0, ease: "none", scrollTrigger: scrollConfig }
  );
  if (btn)
    gsap.fromTo(
      btn,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, ease: "none", scrollTrigger: scrollConfig }
    );

  // Scale down and fade out content on scroll
  gsap.to(content, {
    scale: 0.6,
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: {
      trigger: rootEl,
      start: "top top+=120",
      end: "bottom top",
      scrub: true,
    },
  });
};

/* --------------------------------------------------
   REUSABLE TIMELINE BLOCKS
   Split text into spans for staggered animations
   Prevent duplicate splits via dataset flags
-------------------------------------------------- */
export const splitTitleToChars = (title: HTMLElement) => {
  if (title.dataset.split === "chars") return;
  title.dataset.split = "chars";
  const text = title.textContent || "";
  title.innerHTML = text
    .split("")
    .map((c) => `<span>${c === " " ? "&nbsp;" : c}</span>`)
    .join("");
};

export const splitTextToLines = (texts: NodeListOf<HTMLElement>) => {
  texts.forEach((p) => {
    if (p.dataset.split === "lines") return;
    p.dataset.split = "lines";
    const text = p.textContent || "";
    p.innerHTML = text
      .split("\n")
      .map((line) => `<span>${line}</span>`)
      .join(" ");
  });
};


//------------

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// /* --------------------------------------------------
//    Public API
// -------------------------------------------------- */
// export const animateAbout = (rootEl: HTMLElement | null) => {
//   if (!rootEl) return;

//   setupBase(rootEl);

//   const mm = gsap.matchMedia();

//   mm.add("(max-width: 767px)", () => mobileScene(rootEl));
//   mm.add("(min-width: 768px) and (max-width: 1279px)", () =>
//     tabletScene(rootEl)
//   );
//   mm.add("(min-width: 1280px)", () => desktopScene(rootEl));

//   return () => mm.revert();
// };

// /* --------------------------------------------------
//    Base setup (common)
// -------------------------------------------------- */
// const setupBase = (rootEl: HTMLElement) => {
//   const bg = rootEl.querySelector<HTMLElement>(".about__bg");
//   const photo = rootEl.querySelector<HTMLElement>(".about__photo");

//   if (bg) gsap.set(bg, { willChange: "height" });
//   if (photo) gsap.set(photo, { willChange: "transform, opacity" });
// };

// /* --------------------------------------------------
//    MOBILE SCENE
// -------------------------------------------------- */
// export const mobileScene = (rootEl: HTMLElement) => {
//   const photo = rootEl.querySelector<HTMLElement>(".about__photo");
//   const title = rootEl.querySelector<HTMLElement>(".about__title");
//   const texts = rootEl.querySelectorAll<HTMLElement>(".about__text");

//   if (!photo || !title) return;

//   // --- RESET ---
//   title.dataset.split = "";
//   texts.forEach((p) => (p.dataset.split = ""));

//   // --- SPLIT ---
//   splitTitleToChars(title);
//   splitTextToLines(texts);

//   const titleChars = title.querySelectorAll<HTMLElement>("span");
//   const lines = rootEl.querySelectorAll<HTMLElement>(".about__text span");

//   // --- FORCE VISIBLE ---
//   gsap.set([lines], { autoAlpha: 1, y: 0 });
//   gsap.set(photo, { autoAlpha: 0 });
//   gsap.set(titleChars, { autoAlpha: 0, y: 10 });

//   const scrollConfig = {
//     trigger: rootEl,
//     start: "top 90%",
//     end: "bottom 90%",
//     scrub: true,
//   };

//   gsap.to(photo, {
//     autoAlpha: 1,
//     scrollTrigger: scrollConfig,
//   });

//   gsap.fromTo(
//     titleChars,
//     { autoAlpha: 0, y: 10 },
//     {
//       autoAlpha: 1,
//       y: 0,
//       stagger: 0.3,
//       scrollTrigger: scrollConfig,
//     }
//   );
// };

// /* --------------------------------------------------
//    TABLET SCENE
// -------------------------------------------------- */
// export const tabletScene = (rootEl: HTMLElement) => {
//   const photo = rootEl.querySelector<HTMLElement>(".about__photo");
//   const title = rootEl.querySelector<HTMLElement>(".about__title");
//   const texts = rootEl.querySelectorAll<HTMLElement>(".about__text");
//   const btn = rootEl.querySelector<HTMLElement>(".about__btn");
//   const content = rootEl.querySelector<HTMLElement>(".about__inner");
//   if (!photo || !title || !content) return;

//   title.dataset.split = "";
//   texts.forEach((p) => (p.dataset.split = ""));
//   splitTitleToChars(title);
//   splitTextToLines(texts);

//   const titleChars = title.querySelectorAll<HTMLElement>("span");
//   const lines = rootEl.querySelectorAll<HTMLElement>(".about__text span");

//   gsap.set(photo, { autoAlpha: 0 });
//   gsap.set([titleChars, lines, btn], { autoAlpha: 0, y: 10 });

//   const scrollConfig = {
//     trigger: rootEl,
//     start: "top bottom",
//     end: "top top+=200",
//     scrub: true,
//   };

//   gsap.to(photo, { autoAlpha: 1, ease: "none", scrollTrigger: scrollConfig });
//   gsap.fromTo(
//     titleChars,
//     { autoAlpha: 0, y: 10 },
//     {
//       autoAlpha: 1,
//       y: 0,
//       stagger: 0.2,
//       ease: "none",
//       scrollTrigger: scrollConfig,
//     }
//   );
//   gsap.fromTo(
//     lines,
//     { autoAlpha: 0, y: 10 },
//     {
//       autoAlpha: 1,
//       y: 0,
//       stagger: 0.15,
//       ease: "none",
//       scrollTrigger: scrollConfig,
//     }
//   );
//   if (btn)
//     gsap.fromTo(
//       btn,
//       { autoAlpha: 0, y: 10 },
//       { autoAlpha: 1, y: 0, ease: "none", scrollTrigger: scrollConfig }
//     );

//   gsap.to(content, {
//     scale: 0.6,
//     autoAlpha: 0,
//     ease: "none",
//     scrollTrigger: {
//       trigger: rootEl,
//       start: "top top+=100",
//       end: "bottom top",
//       scrub: true,
//     },
//   });
// };

// /* --------------------------------------------------
//    DESKTOP SCENE
// -------------------------------------------------- */
// export const desktopScene = (rootEl: HTMLElement) => {
//   const photo = rootEl.querySelector<HTMLElement>(".about__photo");
//   const title = rootEl.querySelector<HTMLElement>(".about__title");
//   const texts = rootEl.querySelectorAll<HTMLElement>(".about__text");
//   const content = rootEl.querySelector<HTMLElement>(".about__inner");
//   const btn = rootEl.querySelector<HTMLElement>(".about__btn");

//   if (!photo || !title || !content) return;

//   title.dataset.split = "";
//   texts.forEach((p) => (p.dataset.split = ""));
//   splitTitleToChars(title);
//   splitTextToLines(texts);

//   const titleChars = title.querySelectorAll<HTMLElement>("span");
//   const lines = rootEl.querySelectorAll<HTMLElement>(".about__text span");

//   const scrollConfig = {
//     trigger: rootEl,
//     start: "top bottom",
//     end: "top top+=200",
//     scrub: true,
//   };

//   gsap.fromTo(
//     titleChars,
//     { opacity: 0, y: 10 },
//     {
//       opacity: 1,
//       y: 0,
//       stagger: 0.2,
//       ease: "none",
//       scrollTrigger: scrollConfig,
//     }
//   );
//   gsap.fromTo(
//     lines,
//     { opacity: 0, y: 10 },
//     {
//       opacity: 1,
//       y: 0,
//       stagger: 0.2,
//       ease: "none",
//       scrollTrigger: scrollConfig,
//     }
//   );
//   gsap.fromTo(
//     photo,
//     { opacity: 0, x: -130 },
//     { opacity: 1, x: 0, ease: "none", scrollTrigger: scrollConfig }
//   );
//   if (btn)
//     gsap.fromTo(
//       btn,
//       { opacity: 0, y: 10 },
//       { opacity: 1, y: 0, ease: "none", scrollTrigger: scrollConfig }
//     );

//   gsap.to(content, {
//     scale: 0.6,
//     autoAlpha: 0,
//     ease: "none",
//     scrollTrigger: {
//       trigger: rootEl,
//       start: "top top+=120",
//       end: "bottom top",
//       scrub: true,
//     },
//   });
// };

// /* --------------------------------------------------
//    Reusable timeline blocks
// -------------------------------------------------- */
// export const splitTitleToChars = (title: HTMLElement) => {
//   if (title.dataset.split === "chars") return;
//   title.dataset.split = "chars";
//   const text = title.textContent || "";
//   title.innerHTML = text
//     .split("")
//     .map((c) => `<span>${c === " " ? "&nbsp;" : c}</span>`)
//     .join("");
// };

// export const splitTextToLines = (texts: NodeListOf<HTMLElement>) => {
//   texts.forEach((p) => {
//     if (p.dataset.split === "lines") return;
//     p.dataset.split = "lines";
//     const text = p.textContent || "";
//     p.innerHTML = text
//       .split("\n")
//       .map((line) => `<span>${line}</span>`)
//       .join(" ");
//   });
// };

//----------------

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// /* --------------------------------------------------
//    Public API
// -------------------------------------------------- */

// export const animateAbout = (rootEl: HTMLElement | null) => {
//   if (!rootEl) return;

//   setupBase(rootEl);

//   const mm = gsap.matchMedia();

//   mm.add("(max-width: 767px)", () => {
//     mobileScene(rootEl);
//   });

//   mm.add("(min-width: 768px) and (max-width: 1279px)", () => {
//     tabletScene(rootEl);
//   });

//   mm.add("(min-width: 1280px)", () => {
//     desktopScene(rootEl);
//   });

//   return () => mm.revert();
// };

// /* --------------------------------------------------
//    Base setup (common)
// -------------------------------------------------- */
// const setupBase = (rootEl: HTMLElement) => {
//   const bg = rootEl.querySelector<HTMLElement>(".about__bg");
//   const photo = rootEl.querySelector<HTMLElement>(".about__photo");

//   if (bg) {
//     gsap.set(bg, {
//       willChange: "height",
//     });
//   }

//   if (photo) {
//     gsap.set(photo, {
//       willChange: "transform, opacity",
//     });
//   }
// };

// /* --------------------------------------------------
//    MOBILE SCENE
//    - только текст
//    - лёгкая, быстрая
// -------------------------------------------------- */

// const mobileScene = (rootEl: HTMLElement) => {
//   const photo = rootEl.querySelector<HTMLElement>(".about__photo");
//   const title = rootEl.querySelector<HTMLElement>(".about__title");

//   if (!photo || !title) return;
//   // ---------- RESET SPLIT ----------
//   title.dataset.split = "";

//   // ---------- SPLIT ----------
//   splitTitleToChars(title);

//   const titleChars = title.querySelectorAll<HTMLElement>("span");

//   // ---------- INITIAL STATES ----------
//   gsap.set(photo, { autoAlpha: 0 });
//   gsap.set([titleChars], { autoAlpha: 0, y: 10 });

//   const scrollConfig = {
//     trigger: rootEl,
//     start: "top 90%",
//     end: "bottom 90%",
//     scrub: true,
//   };

//   // ---------- PHOTO ----------
//   gsap.to(photo, {
//     autoAlpha: 1,
//     ease: "none",
//     scrollTrigger: scrollConfig,
//   });

//   // ---------- TITLE ----------
//   gsap.fromTo(
//     titleChars,
//     { autoAlpha: 0, y: 10 },
//     {
//       autoAlpha: 1,
//       y: 0,
//       stagger: 0.3,
//       ease: "none",
//       scrollTrigger: scrollConfig,
//     }
//   );
// };

// /* --------------------------------------------------
//    TABLET SCENE
//    - без анимации высоты фона
//    - фото справа налево
//    - текст + кнопка
// -------------------------------------------------- */

// const tabletScene = (rootEl: HTMLElement) => {
//   const photo = rootEl.querySelector<HTMLElement>(".about__photo");
//   const title = rootEl.querySelector<HTMLElement>(".about__title");
//   const texts = rootEl.querySelectorAll<HTMLElement>(".about__text");
//   const btn = rootEl.querySelector<HTMLElement>(".about__btn");
//   const content = rootEl.querySelector<HTMLElement>(".about__inner");

//   if (!photo || !title || !content) return;

//   // ---------- RESET SPLIT ----------
//   title.dataset.split = "";
//   texts.forEach((p) => (p.dataset.split = ""));

//   // ---------- SPLIT ----------
//   splitTitleToChars(title);
//   splitTextToLines(texts);

//   const titleChars = title.querySelectorAll<HTMLElement>("span");
//   const lines = rootEl.querySelectorAll<HTMLElement>(".about__text span");

//   // ---------- INITIAL STATES ----------
//   gsap.set(photo, { autoAlpha: 0 });
//   gsap.set([titleChars, lines, btn], { autoAlpha: 0, y: 10 });

//   const scrollConfig = {
//     trigger: rootEl,
//     start: "top bottom",
//     end: "top top+=200",
//     scrub: true,
//   };

//   // ---------- PHOTO ----------
//   gsap.to(photo, {
//     autoAlpha: 1,
//     ease: "none",
//     scrollTrigger: scrollConfig,
//   });

//   // ---------- TITLE ----------
//   gsap.fromTo(
//     titleChars,
//     { autoAlpha: 0, y: 10 },
//     {
//       autoAlpha: 1,
//       y: 0,
//       stagger: 0.2,
//       ease: "none",
//       scrollTrigger: scrollConfig,
//     }
//   );

//   // ---------- TEXT ----------
//   gsap.fromTo(
//     lines,
//     { autoAlpha: 0, y: 10 },
//     {
//       autoAlpha: 1,
//       y: 0,
//       stagger: 0.15,
//       ease: "none",
//       scrollTrigger: scrollConfig,
//     }
//   );

//   // ---------- BUTTON ----------
//   if (btn) {
//     gsap.fromTo(
//       btn,
//       { autoAlpha: 0, y: 10 },
//       { autoAlpha: 1, y: 0, ease: "none", scrollTrigger: scrollConfig }
//     );
//   }

//   // ---------- CONTENT EXIT ----------
//   gsap.to(content, {
//     scale: 0.6,
//     autoAlpha: 0,
//     ease: "none",
//     scrollTrigger: {
//       trigger: rootEl,
//       start: "top top+=120",
//       end: "bottom top",
//       scrub: true,
//     },
//   });
// };

// /* --------------------------------------------------
//    DESKTOP SCENE
//    - фон меняет высоту
//    - фото слева направо
//    - текст + кнопка
// -------------------------------------------------- */

// const desktopScene = (rootEl: HTMLElement) => {
//   const bg = rootEl.querySelector<HTMLElement>(".about__bg");
//   const photo = rootEl.querySelector<HTMLElement>(".about__photo");
//   const title = rootEl.querySelector<HTMLElement>(".about__title");
//   const texts = rootEl.querySelectorAll<HTMLElement>(".about__text");
//   const content = rootEl.querySelector<HTMLElement>(".about__inner");

//   if (!bg || !photo || !title || !content) return;

//   // ---------- RESET SPLIT (важно при mm)
//   title.dataset.split = "";
//   texts.forEach((p) => (p.dataset.split = ""));

//   // ---------- SPLIT ----------
//   splitTitleToChars(title);
//   splitTextToLines(texts);

//   const titleChars = title.querySelectorAll<HTMLElement>("span");
//   const lines = rootEl.querySelectorAll<HTMLElement>(".about__text span");

//   // ---------- BG HEIGHT ----------
//   const vh = window.innerHeight;
//   const finalHeight = 550;
//   const startHeight = (vh + finalHeight) / 2;
//   bg.style.height = `${startHeight}px`;

//   gsap.set(bg, { height: startHeight });

//   const scrollConfig = {
//     trigger: rootEl,
//     start: "top bottom",
//     end: "top top+=200",
//     scrub: true,
//   };

//   // ---------- 1. BG ----------
//   gsap.to(bg, {
//     height: finalHeight,
//     ease: "linear",
//     scrollTrigger: scrollConfig,
//   });

//   // ---------- 2. TITLE ----------
//   gsap.fromTo(
//     titleChars,
//     { opacity: 0, y: 10 },
//     {
//       opacity: 1,
//       y: 0,
//       stagger: 0.2,
//       ease: "none",
//       scrollTrigger: scrollConfig,
//     }
//   );

//   // ---------- 3. TEXT ----------
//   gsap.fromTo(
//     lines,
//     { opacity: 0, y: 10 },
//     {
//       opacity: 1,
//       y: 0,
//       stagger: 0.2,
//       ease: "none",
//       scrollTrigger: scrollConfig,
//     }
//   );

//   // ---------- 4. PHOTO ----------
//   gsap.fromTo(
//     photo,
//     { opacity: 0, x: -130 },
//     {
//       opacity: 1,
//       x: 0,
//       ease: "none",
//       scrollTrigger: scrollConfig,
//     }
//   );

//   // ---------- 5. CONTENT EXIT ----------
//   gsap.to(content, {
//     scale: 0.6,
//     autoAlpha: 0,
//     ease: "none",
//     scrollTrigger: {
//       trigger: rootEl,
//       start: "top top+=120",
//       end: "bottom top",
//       scrub: true,
//     },
//   });
// };

// /* --------------------------------------------------
//    Reusable timeline blocks
// -------------------------------------------------- */
// const splitTitleToChars = (title: HTMLElement) => {
//   if (title.dataset.split === "chars") return;

//   title.dataset.split = "chars";

//   const text = title.textContent || "";
//   title.innerHTML = text
//     .split("")
//     .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
//     .join("");
// };

// const splitTextToLines = (texts: NodeListOf<HTMLElement>) => {
//   texts.forEach((p) => {
//     if (p.dataset.split === "lines") return;

//     p.dataset.split = "lines";

//     const text = p.textContent || "";
//     p.innerHTML = text
//       .split("\n")
//       .map((line) => `<span>${line}</span>`)
//       .join(" ");
//   });
// };

//-------------
// версия под старую верстку
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const animateAbout = (rootEl: HTMLElement | null) => {
//   if (!rootEl) return;

//   const bg = rootEl.querySelector<HTMLElement>(".about__bg");
//   const content = rootEl.querySelector<HTMLElement>(".about__inner");
//   const rightCol = rootEl.querySelector<HTMLElement>(".about__right-col");
//   const btn = rootEl.querySelector<HTMLElement>(".about__btn");
//   const photo = rootEl.querySelector<HTMLElement>(".about__photo");

//   const title = rootEl.querySelector<HTMLElement>(".about__title");
//   const texts = rootEl.querySelectorAll<HTMLElement>(".about__text");

//   // ---------- Сбрасываем старый split ----------
//   if (title) title.dataset.split = "";
//   texts.forEach((p) => (p.dataset.split = ""));

//   if (!bg || !rightCol || !title || !btn || !photo) return;

//   const vh = window.innerHeight;
//   const finalHeight = 550;
//   const startHeight = (vh + finalHeight) / 2;
//   bg.style.height = `${startHeight}px`;

//   const ctx = gsap.context(() => {
//     // ---------- 1. BG: рост до финальной высоты ----------
//     gsap.to(bg, {
//       height: finalHeight,
//       ease: "linear",
//       scrollTrigger: {
//         trigger: rootEl,
//         start: "top bottom",
//         end: "top top+=200",
//         scrub: true,
//       },
//     });

//     // ---------- 2. TITLE: split и анимация ----------
//     if (!title.dataset.split) {
//       title.dataset.split = "true";
//       const text = title.textContent || "";
//       title.innerHTML = text
//         .split("")
//         .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
//         .join("");
//     }
//     const titleChars = title.querySelectorAll<HTMLElement>("span");

//     gsap.fromTo(
//       titleChars,
//       { opacity: 0, y: 10 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.7,
//         stagger: 0.2,
//         ease: "none",
//         scrollTrigger: {
//           trigger: rootEl,
//           start: "top bottom",
//           end: "top top+=200",
//           scrub: true,
//         },
//       }
//     );

//     // ---------- 3. TEXT & BUTTON: split и анимация ----------
//     texts.forEach((p) => {
//       if (!p.dataset.split) {
//         p.dataset.split = "true";
//         const text = p.textContent || "";
//         p.innerHTML = text
//           .split("\n")
//           .map((line) => `<span>${line}</span>`)
//           .join(" ");
//       }
//     });

//     const lines = rootEl.querySelectorAll<HTMLElement>(".about__text span");

//     gsap.fromTo(
//       lines,
//       { opacity: 0, y: 10 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         stagger: 0.2,
//         ease: "none",
//         scrollTrigger: {
//           trigger: rootEl,
//           start: "top bottom",
//           end: "top top+=200",
//           scrub: true,
//         },
//       }
//     );

//     // ---------- 4. PHOTO ----------
//     gsap.fromTo(
//       photo,
//       { opacity: 0, x: -130 },
//       {
//         opacity: 1,
//         x: 0,
//         duration: 1.2,
//         scrollTrigger: {
//           trigger: rootEl,
//           start: "top bottom",
//           end: "top top+=200",
//           scrub: true,
//         },
//       }
//     );

//     // ---------- 5. CONTENT SCALE & FADE ----------
//     if (content) {
//       gsap.to(content, {
//         scale: 0.6,
//         autoAlpha: 0,
//         ease: "none",
//         scrollTrigger: {
//           trigger: rootEl,
//           start: "top top+=120",
//           end: "bottom top",
//           scrub: true,
//         },
//       });
//     }
//   }, rootEl);

//   return () => ctx.revert();
// };

//--------------

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const animateAbout = (rootEl: HTMLElement | null) => {
//   if (!rootEl) return;

//   const bg = rootEl.querySelector<HTMLElement>(".about__bg");
//   const content = rootEl.querySelector<HTMLElement>(".about__inner");
//   const rightCol = rootEl.querySelector<HTMLElement>(".about__right-col");
//   const title = rootEl.querySelector<HTMLElement>(".about__title");
//   const texts = rootEl.querySelectorAll<HTMLElement>(".about__text");
//   const btn = rootEl.querySelector<HTMLElement>(".about__btn");
//   const photo = rootEl.querySelector<HTMLElement>(".about__photo");

//   if (content) {
//     gsap.to(content, {
//       scrollTrigger: {
//         trigger: rootEl,
//         start: "top top+=150",
//         end: "bottom top",
//         scrub: true,
//       },
//       scale: 0.6,
//       autoAlpha: 0,
//       ease: "none",
//     });
//   }

//   if (!bg || !rightCol || !title || !btn || !photo) return;

//   const vh = window.innerHeight;
//   const finalHeight = 550;

//   const startHeight = (vh + finalHeight) / 2;
//   bg.style.height = `${startHeight}px`;

//   const ctx = gsap.context(() => {
//     // === 1. ФОН: рост и подтягивание нижней границы ===
//     gsap.to(bg, {
//       height: finalHeight,
//       ease: "linear",
//       scrollTrigger: {
//         trigger: rootEl,
//         start: "top bottom",
//         end: "top top+=200",
//         scrub: true,
//       },
//     });

//     // === ЗАГОЛОВОК: удаляем блюр синхронно со скроллом ===
//     const titleText = title.textContent || "";
//     title.innerHTML = titleText
//       .split("")
//       .map((char) => `<span>${char}</span>`)
//       .join("");

//     const titleChars = title.querySelectorAll("span");

//     gsap.to(titleChars, {
//       opacity: 1,
//       filter: "blur(0px)",
//       y: 0,
//       duration: 0.6,
//       stagger: 0.05,
//       ease: "none",
//       scrollTrigger: {
//         trigger: rootEl,
//         start: "top bottom",
//         end: "top top+=230",
//         scrub: true,
//       },
//     });

//     // === ТЕКСТ И КНОПКА: удаляем блюр синхронно со скроллом ===
//     texts.forEach((p) => {
//       const text = p.textContent || "";
//       p.innerHTML = text
//         .split(". ")
//         .map((line) => `<span>${line}</span>`)
//         .join(". ");
//     });

//     // получаем все span-линии
//     const lines = rootEl.querySelectorAll<HTMLElement>(".about__text span");

//     gsap.to(lines, {
//       filter: "blur(0px)",
//       y: 0,
//       duration: 0.7,
//       stagger: 0.15,
//       ease: "none",
//       scrollTrigger: {
//         trigger: rootEl,
//         start: "top bottom",
//         end: "top top+=200",
//         scrub: true,
//       },
//     });

//     // === ФОТО  ===
//     gsap.fromTo(
//       photo,
//       { opacity: 0, x: -130 },
//       {
//         opacity: 1,
//         x: 0,
//         duration: 1.2,
//         scrollTrigger: {
//           trigger: rootEl,
//           start: "top bottom",
//           end: "top top+=200",
//           scrub: true,
//         },
//       }
//     );
//   }, rootEl);

//   return () => ctx.revert();
// };
