// --- MOCK GSAP AND SCROLLTRIGGER ---
// Mock GSAP to isolate animation logic and avoid actual DOM/scroll animations
// matchMedia mock allows testing breakpoint-dependent behavior
jest.mock("gsap", () => {
  const matchMediaMock = {
    add: jest.fn(),
  };

  return {
    __esModule: true,
    default: {
      registerPlugin: jest.fn(),
      // context executes callback immediately and provides revert for cleanup verification
      context: jest.fn((cb: () => void) => {
        cb();
        return { revert: jest.fn() };
      }),
      matchMedia: jest.fn(() => matchMediaMock),
      set: jest.fn(),
    },
  };
});

jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

import gsap from "gsap";
import { animateContactBg } from "./contactAnimation";

/* --------------------------------------------------
   ANIMATECONTACTBG TESTS
   Verify GSAP setup, breakpoint registration, context, and cleanup
-------------------------------------------------- */
describe("animateContactBg", () => {
  let section: HTMLElement;
  let bg: HTMLElement;

  beforeEach(() => {
    section = document.createElement("section");
    bg = document.createElement("div");
    document.body.appendChild(section);
    document.body.appendChild(bg);

    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("does nothing if section or bg is null", () => {
    // Ensure function safely handles null inputs without throwing
    expect(() => animateContactBg(null, null)).not.toThrow();
  });

  it("registers media queries via gsap.matchMedia", () => {
    // Verify animations are set up for mobile, tablet, and desktop breakpoints
    const cleanup = animateContactBg(section, bg);

    const mm = (gsap.matchMedia as jest.Mock).mock.results[0].value;

    expect(mm.add).toHaveBeenCalledWith("(max-width: 767px)", expect.any(Function));
    expect(mm.add).toHaveBeenCalledWith(
      "(min-width: 768px) and (max-width: 1279px)",
      expect.any(Function)
    );
    expect(mm.add).toHaveBeenCalledWith("(min-width: 1280px)", expect.any(Function));

    cleanup?.();
  });

  it("calls gsap.context with section scope", () => {
    // Verify animations are scoped to section via gsap.context for proper cleanup
    animateContactBg(section, bg);

    expect(gsap.context).toHaveBeenCalledWith(expect.any(Function), section);
  });

  it("returns cleanup function that reverts gsap context", () => {
    // Verify returned cleanup function calls context.revert to undo animations
    const cleanup = animateContactBg(section, bg);

    const ctx = (gsap.context as jest.Mock).mock.results[0].value;

    cleanup?.();

    expect(ctx.revert).toHaveBeenCalled();
  });
});


//-------

// jest.mock("gsap", () => {
//   const matchMediaMock = {
//     add: jest.fn(),
//   };

//   return {
//     __esModule: true,
//     default: {
//       registerPlugin: jest.fn(),
//       context: jest.fn((cb: () => void) => {
//         cb();
//         return { revert: jest.fn() };
//       }),
//       matchMedia: jest.fn(() => matchMediaMock),
//       set: jest.fn(),
//     },
//   };
// });

// jest.mock("gsap/ScrollTrigger", () => ({
//   ScrollTrigger: {},
// }));

// import gsap from "gsap";
// import { animateContactBg } from "./contactAnimation";

// describe("animateContactBg", () => {
//   let section: HTMLElement;
//   let bg: HTMLElement;

//   beforeEach(() => {
//     section = document.createElement("section");
//     bg = document.createElement("div");
//     document.body.appendChild(section);
//     document.body.appendChild(bg);

//     jest.clearAllMocks();
//   });

//   afterEach(() => {
//     document.body.innerHTML = "";
//   });

//   it("does nothing if section or bg is null", () => {
//     expect(() =>
//       animateContactBg(null, null)
//     ).not.toThrow();
//   });

//   it("registers media queries via gsap.matchMedia", () => {
//     const cleanup = animateContactBg(section, bg);

//     const mm = (gsap.matchMedia as jest.Mock).mock.results[0].value;

//     expect(mm.add).toHaveBeenCalledWith(
//       "(max-width: 767px)",
//       expect.any(Function)
//     );
//     expect(mm.add).toHaveBeenCalledWith(
//       "(min-width: 768px) and (max-width: 1279px)",
//       expect.any(Function)
//     );
//     expect(mm.add).toHaveBeenCalledWith(
//       "(min-width: 1280px)",
//       expect.any(Function)
//     );

//     cleanup?.();
//   });

//   it("calls gsap.context with section scope", () => {
//     animateContactBg(section, bg);

//     expect(gsap.context).toHaveBeenCalledWith(
//       expect.any(Function),
//       section
//     );
//   });

//   it("returns cleanup function that reverts gsap context", () => {
//     const cleanup = animateContactBg(section, bg);

//     const ctx = (gsap.context as jest.Mock).mock.results[0].value;

//     cleanup?.();

//     expect(ctx.revert).toHaveBeenCalled();
//   });
// });
