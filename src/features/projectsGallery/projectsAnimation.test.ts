// --- MOCK GSAP FUNCTIONS ---
// Provide chainable timeline, context, matchMedia, and utility mocks for animations
const gsapSet = jest.fn();
const gsapTo = jest.fn();
const gsapTimeline = jest.fn(() => ({ set: jest.fn(), to: jest.fn() }));
const gsapContext = jest.fn((cb: Function) => {
  cb();
  return { revert: jest.fn() };
});
const matchMediaMock = jest.fn();
const utilsToArray = jest.fn((nodeList) => Array.from(nodeList)); // Ensure NodeList converts to array
const registerPlugin = jest.fn();

// --- MOCK GSAP MODULE ---
jest.mock("gsap", () => ({
  __esModule: true,
  default: {
    set: gsapSet,
    to: gsapTo,
    timeline: gsapTimeline,
    context: gsapContext,
    matchMedia: matchMediaMock,
    utils: { toArray: utilsToArray },
    registerPlugin,
  },
}));

// --- MOCK SCROLLTRIGGER ---
// Avoid real ScrollTrigger registration
const scrollTriggerCreate = jest.fn();
jest.mock("gsap/ScrollTrigger", () => ({
  __esModule: true,
  ScrollTrigger: { create: scrollTriggerCreate },
}));

import gsap from "gsap";
import { animateProjectsGallery } from "./projectsAnimation";

describe("animateProjectsGallery", () => {
  let root: HTMLElement;

  beforeEach(() => {
    // Set up DOM structure for testing gallery animations
    root = document.createElement("div");

    const stage = document.createElement("div");
    stage.className = "projects-gallery__stage";

    const title = document.createElement("div");
    title.className = "projects-gallery__title";

    const card1 = document.createElement("div");
    card1.className = "project-card";
    Object.defineProperty(card1, "offsetHeight", { value: 100 });
    const card2 = document.createElement("div");
    card2.className = "project-card";
    Object.defineProperty(card2, "offsetHeight", { value: 100 });

    root.append(stage, title, card1, card2);
    document.body.appendChild(root);

    jest.clearAllMocks();

    // Default matchMedia behavior: immediately execute callback
    (gsap.matchMedia as jest.Mock).mockReturnValue({
      add: (_query: string, cb: Function) => cb(),
    });
  });

  afterEach(() => {
    root.remove();
  });

  it("should return a revert function", () => {
    // Ensure gallery function returns cleanup function
    const revertFn = animateProjectsGallery(root);
    expect(typeof revertFn).toBe("function");
  });

  it("should call gsap.set on mobile", () => {
    // Verify that mobile breakpoint resets element properties and skips animations
    (gsap.matchMedia as jest.Mock).mockReturnValue({
      add: (query: string, cb: Function) => {
        if (query === "(max-width: 767px)") cb();
      },
    });

    animateProjectsGallery(root);

    expect(gsapSet).toHaveBeenCalledWith(
      root.querySelector(".projects-gallery__stage"),
      { clearProps: "position,height" }
    );
    expect(gsapSet).toHaveBeenCalledWith(
      root.querySelectorAll(".project-card"),
      { clearProps: "all" }
    );
    expect(utilsToArray).not.toHaveBeenCalled(); // Mobile skips timeline animations
  });

  it("should call ScrollTrigger.create and timeline on tablet", () => {
    // Ensure scroll-triggered animations and timelines are created for tablet
    (gsap.matchMedia as jest.Mock).mockReturnValue({
      add: (query: string, cb: Function) => {
        if (query === "(min-width: 768px) and (max-width: 1279px)") cb();
      },
    });

    animateProjectsGallery(root);

    expect(scrollTriggerCreate).toHaveBeenCalled(); // pin stage
    expect(gsapTo).toHaveBeenCalled(); // animate first card
    expect(gsapTimeline).toHaveBeenCalled(); // timeline for remaining cards
  });

  it("should call ScrollTrigger.create and timeline on desktop", () => {
    // Ensure scroll-triggered animations and timelines are created for desktop
    (gsap.matchMedia as jest.Mock).mockReturnValue({
      add: (query: string, cb: Function) => {
        if (query === "(min-width: 1280px)") cb();
      },
    });

    animateProjectsGallery(root);

    expect(scrollTriggerCreate).toHaveBeenCalled(); // pin stage
    expect(gsapTo).toHaveBeenCalled(); // animate first card
    expect(gsapTimeline).toHaveBeenCalled(); // timeline for remaining cards
  });
});

//------------

// // ----------------- МОКИ  -----------------
// const gsapSet = jest.fn();
// const gsapTo = jest.fn();
// const gsapTimeline = jest.fn(() => ({ set: jest.fn(), to: jest.fn() }));
// const gsapContext = jest.fn((cb: Function) => {
//   cb();
//   return { revert: jest.fn() };
// });
// const matchMediaMock = jest.fn();
// const utilsToArray = jest.fn((nodeList) => Array.from(nodeList)); // важно возвращать массив
// const registerPlugin = jest.fn();

// // GSAP MOCK
// jest.mock("gsap", () => ({
//   __esModule: true,
//   default: {
//     set: gsapSet,
//     to: gsapTo,
//     timeline: gsapTimeline,
//     context: gsapContext,
//     matchMedia: matchMediaMock,
//     utils: { toArray: utilsToArray },
//     registerPlugin,
//   },
// }));

// // ScrollTrigger MOCK
// const scrollTriggerCreate = jest.fn();
// jest.mock("gsap/ScrollTrigger", () => ({
//   __esModule: true,
//   ScrollTrigger: { create: scrollTriggerCreate },
// }));

// // импорт после моков
// import gsap from "gsap";
// import { animateProjectsGallery } from "./projectsAnimation";

// describe("animateProjectsGallery", () => {
//   let root: HTMLElement;

//   beforeEach(() => {
//     root = document.createElement("div");

//     const stage = document.createElement("div");
//     stage.className = "projects-gallery__stage";

//     const title = document.createElement("div");
//     title.className = "projects-gallery__title";

//     const card1 = document.createElement("div");
//     card1.className = "project-card";
//     Object.defineProperty(card1, "offsetHeight", { value: 100 });
//     const card2 = document.createElement("div");
//     card2.className = "project-card";
//     Object.defineProperty(card2, "offsetHeight", { value: 100 });

//     root.append(stage, title, card1, card2);
//     document.body.appendChild(root);

//     jest.clearAllMocks();

//     // matchMedia по умолчанию просто вызывает callback
//     (gsap.matchMedia as jest.Mock).mockReturnValue({
//       add: (_query: string, cb: Function) => cb(),
//     });
//   });

//   afterEach(() => {
//     root.remove();
//   });

//   it("should return a revert function", () => {
//     const revertFn = animateProjectsGallery(root);
//     expect(typeof revertFn).toBe("function");
//   });

//   it("should call gsap.set on mobile", () => {
//     (gsap.matchMedia as jest.Mock).mockReturnValue({
//       add: (query: string, cb: Function) => {
//         if (query === "(max-width: 767px)") cb();
//       },
//     });

//     animateProjectsGallery(root);

//     expect(gsapSet).toHaveBeenCalledWith(
//       root.querySelector(".projects-gallery__stage"),
//       { clearProps: "position,height" }
//     );
//     expect(gsapSet).toHaveBeenCalledWith(
//       root.querySelectorAll(".project-card"),
//       { clearProps: "all" }
//     );
//     expect(utilsToArray).not.toHaveBeenCalled(); // на мобильных нет анимаций
//   });

//   it("should call ScrollTrigger.create and timeline on tablet", () => {
//     (gsap.matchMedia as jest.Mock).mockReturnValue({
//       add: (query: string, cb: Function) => {
//         if (query === "(min-width: 768px) and (max-width: 1279px)") cb();
//       },
//     });

//     animateProjectsGallery(root);

//     expect(scrollTriggerCreate).toHaveBeenCalled(); // PIN
//     expect(gsapTo).toHaveBeenCalled(); // первый card
//     expect(gsapTimeline).toHaveBeenCalled(); // таймлайн для остальных карточек
//   });

//   it("should call ScrollTrigger.create and timeline on desktop", () => {
//     (gsap.matchMedia as jest.Mock).mockReturnValue({
//       add: (query: string, cb: Function) => {
//         if (query === "(min-width: 1280px)") cb();
//       },
//     });

//     animateProjectsGallery(root);

//     expect(scrollTriggerCreate).toHaveBeenCalled(); // PIN
//     expect(gsapTo).toHaveBeenCalled(); // первый card
//     expect(gsapTimeline).toHaveBeenCalled(); // таймлайн для остальных карточек
//   });
// });
