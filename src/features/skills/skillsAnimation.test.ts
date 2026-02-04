// --- MOCK SCROLLTRIGGER ---
// Mock ScrollTrigger to prevent actual scroll animations in tests
jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

// --- MOCK GSAP ---
// Full GSAP mock to control animations and matchMedia behavior
const mmInstance = {
  add: jest.fn(),
  revert: jest.fn(),
};

jest.mock("gsap", () => {
  const set = jest.fn();
  const to = jest.fn();
  const utils = {
    // Provide interpolate utility for testing animation calculations
    interpolate: jest.fn(
      (start: number, end: number, progress: number) =>
        start + (end - start) * progress
    ),
  };

  return {
    __esModule: true,
    default: {
      set,
      to,
      utils,
      registerPlugin: jest.fn(),
      // matchMedia mock returns fixed instance to test responsive callbacks
      matchMedia: jest.fn(() => mmInstance),
    },
  };
});

import gsap from "gsap";
import { animateSkills } from "./skillsAnimation";

describe("animateSkills", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    document.body.innerHTML = "";

    container = document.createElement("div");
    container.className = "skills__accordions";

    // Create 4 child elements to simulate accordion items
    for (let i = 0; i < 4; i++) {
      const item = document.createElement("div");
      container.appendChild(item);
    }

    document.body.appendChild(container);
    jest.clearAllMocks();
  });

  it("calls gsap.set and gsap.to for mobile, tablet and desktop and handles revert", () => {
    const mmMock = gsap.matchMedia() as any;

    // Call animateSkills to trigger animations for all breakpoints
    const revertFn = animateSkills();

    // Verify GSAP plugin registration
    expect(gsap.registerPlugin).toHaveBeenCalled();

    // Verify matchMedia.add called for all breakpoints
    expect(mmMock.add).toHaveBeenCalledTimes(3);

    // --- MOBILE CALLBACK ---
    const mobileCb = (mmMock.add.mock.calls as [string, () => void][])
      .find(c => c[0] === "(max-width: 767px)")![1];
    mobileCb();
    // GSAP.set should clear transforms for mobile
    expect(gsap.set).toHaveBeenCalledWith(
      Array.from(container.children),
      { clearProps: "transform" }
    );

    // --- TABLET CALLBACK ---
    const tabletCb = (mmMock.add.mock.calls as [string, () => void][])
      .find(c => c[0] === "(min-width: 768px) and (max-width: 1439px)")![1];
    tabletCb();

    expect(gsap.set).toHaveBeenCalled();
    // GSAP.to triggers scroll-based animation with onUpdate
    expect(gsap.to).toHaveBeenCalledWith(
      Array.from(container.children),
      expect.objectContaining({
        ease: "none",
        scrollTrigger: expect.objectContaining({
          trigger: container,
          start: "top bottom",
          scrub: true,
          onUpdate: expect.any(Function),
        }),
      })
    );

    // --- TABLET onUpdate LOGIC ---
    const tabletOnUpdate = (gsap.to as jest.Mock).mock.calls[0][1].scrollTrigger.onUpdate;
    const fakeSelf = { progress: 0.5 };
    tabletOnUpdate(fakeSelf as any);
    // Verify GSAP.set applied updated x positions based on progress
    expect(gsap.set).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ x: expect.any(Number) })
    );

    // --- DESKTOP CALLBACK ---
    const desktopCb = (mmMock.add.mock.calls as [string, () => void][])
      .find(c => c[0] === "(min-width: 1440px)")![1];
    desktopCb();

    expect(gsap.set).toHaveBeenCalled();
    expect(gsap.to).toHaveBeenCalledWith(
      Array.from(container.children),
      expect.objectContaining({
        ease: "none",
        scrollTrigger: expect.objectContaining({
          trigger: container,
          start: "top bottom",
          scrub: true,
          onUpdate: expect.any(Function),
        }),
      })
    );

    // --- REVERT FUNCTION ---
    expect(typeof revertFn).toBe("function");
    if (revertFn) revertFn();
    // Verify GSAP context revert called for cleanup
    expect(mmMock.revert).toHaveBeenCalled();
  });

  it("does not throw if container is missing", () => {
    // Edge case: container not found in DOM
    document.body.innerHTML = "";
    expect(() => animateSkills()).not.toThrow();
  });
});

//---------
// jest.mock("gsap/ScrollTrigger", () => ({
//   ScrollTrigger: {},
// }));

// // Мокаем gsap полностью
// const mmInstance = {
//   add: jest.fn(),
//   revert: jest.fn(),
// };

// jest.mock("gsap", () => {
//   const set = jest.fn();
//   const to = jest.fn();
//   const utils = {
//     interpolate: jest.fn(
//       (start: number, end: number, progress: number) =>
//         start + (end - start) * progress
//     ),
//   };

//   return {
//     __esModule: true,
//     default: {
//       set,
//       to,
//       utils,
//       registerPlugin: jest.fn(),
//       matchMedia: jest.fn(() => mmInstance),
//     },
//   };
// });

// import gsap from "gsap";
// import { animateSkills } from "./skillsAnimation";

// describe("animateSkills", () => {
//   let container: HTMLDivElement;

//   beforeEach(() => {
//     document.body.innerHTML = "";

//     container = document.createElement("div");
//     container.className = "skills__accordions";

//     // создаём 4 элемента для аккордионов
//     for (let i = 0; i < 4; i++) {
//       const item = document.createElement("div");
//       container.appendChild(item);
//     }

//     document.body.appendChild(container);
//     jest.clearAllMocks();
//   });

//   it("calls gsap.set and gsap.to for mobile, tablet and desktop and handles revert", () => {
//     const mmMock = gsap.matchMedia() as any;

//     // Вызываем animateSkills
//     const revertFn = animateSkills();

//     // Проверяем регистрацию плагина
//     expect(gsap.registerPlugin).toHaveBeenCalled();

//     // Проверяем, что add вызван для всех медиа
//     expect(mmMock.add).toHaveBeenCalledTimes(3);

//     // MOBILE callback
//     const mobileCb = (mmMock.add.mock.calls as [string, () => void][])
//       .find(c => c[0] === "(max-width: 767px)")![1];
//     mobileCb();
//     expect(gsap.set).toHaveBeenCalledWith(
//       Array.from(container.children),
//       { clearProps: "transform" }
//     );

//     // TABLET callback
//     const tabletCb = (mmMock.add.mock.calls as [string, () => void][])
//       .find(c => c[0] === "(min-width: 768px) and (max-width: 1439px)")![1];
//     tabletCb();

//     expect(gsap.set).toHaveBeenCalled();
//     expect(gsap.to).toHaveBeenCalledWith(
//       Array.from(container.children),
//       expect.objectContaining({
//         ease: "none",
//         scrollTrigger: expect.objectContaining({
//           trigger: container,
//           start: "top bottom",
//           scrub: true,
//           onUpdate: expect.any(Function),
//         }),
//       })
//     );

//     // Проверка логики onUpdate (Tablet)
//     const tabletOnUpdate = (gsap.to as jest.Mock).mock.calls[0][1].scrollTrigger.onUpdate;
//     const fakeSelf = { progress: 0.5 };
//     tabletOnUpdate(fakeSelf as any);
//     expect(gsap.set).toHaveBeenCalledWith(
//       expect.any(HTMLElement),
//       expect.objectContaining({ x: expect.any(Number) })
//     );

//     // DESKTOP callback
//     const desktopCb = (mmMock.add.mock.calls as [string, () => void][])
//       .find(c => c[0] === "(min-width: 1440px)")![1];
//     desktopCb();

//     expect(gsap.set).toHaveBeenCalled();
//     expect(gsap.to).toHaveBeenCalledWith(
//       Array.from(container.children),
//       expect.objectContaining({
//         ease: "none",
//         scrollTrigger: expect.objectContaining({
//           trigger: container,
//           start: "top bottom",
//           scrub: true,
//           onUpdate: expect.any(Function),
//         }),
//       })
//     );

//     // Проверяем revert
//     expect(typeof revertFn).toBe("function");
//     if (revertFn) revertFn();
//     expect(mmMock.revert).toHaveBeenCalled();
//   });

//   it("does not throw if container is missing", () => {
//     document.body.innerHTML = "";
//     expect(() => animateSkills()).not.toThrow();
//   });
// });
