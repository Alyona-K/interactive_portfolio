// --- MOCK GSAP ---
// Provide full GSAP mock with chainable timeline and matchMedia to avoid real DOM animations
jest.mock("gsap", () => {
  const timelineMock = {
    to: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
  };

  return {
    gsap: {
      set: jest.fn(),
      to: jest.fn(),
      timeline: jest.fn(() => timelineMock),
      matchMedia: jest.fn(() => ({
        add: jest.fn(),
      })),
      registerPlugin: jest.fn(),
    },
    default: {
      set: jest.fn(),
      to: jest.fn(),
      timeline: jest.fn(() => timelineMock),
      matchMedia: jest.fn(() => ({
        add: jest.fn(),
      })),
      registerPlugin: jest.fn(),
    },
  };
});

// --- MOCK SCROLLTRIGGER ---
// Avoid real ScrollTrigger registration
jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

import {
  animateHeroIntro,
  animateHeroScroll,
  revealTitle,
} from "./heroAnimation";
import { gsap } from "gsap";

describe("hero animations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("animateHeroIntro", () => {
    it("sets base hero styles", () => {
      // Ensure initial visibility and logo scaling are applied
      animateHeroIntro();

      expect(gsap.set).toHaveBeenCalledWith(".hero", { autoAlpha: 1 });
      expect(gsap.set).toHaveBeenCalledWith(
        ".hero__logo",
        expect.objectContaining({
          autoAlpha: 0,
          scale: 1.8,
        }),
      );
    });

    it("registers responsive matchMedia queries", () => {
      // Verify responsive breakpoints are configured
      animateHeroIntro();

      const mm = (gsap.matchMedia as jest.Mock).mock.results[0].value;

      expect(mm.add).toHaveBeenCalledWith(
        "(max-width: 767px)",
        expect.any(Function),
      );
      expect(mm.add).toHaveBeenCalledWith(
        "(min-width: 768px) and (max-width: 1279px)",
        expect.any(Function),
      );
      expect(mm.add).toHaveBeenCalledWith(
        "(min-width: 1280px)",
        expect.any(Function),
      );
    });
  });

  describe("animateHeroScroll", () => {
    it("creates scroll-triggered animation", () => {
      // Verify scroll-triggered scaling and fade-out for hero content
      animateHeroScroll();

      expect(gsap.to).toHaveBeenCalledWith(
        ".hero__content",
        expect.objectContaining({
          scale: 0.6,
          autoAlpha: 0,
          scrollTrigger: expect.objectContaining({
            trigger: ".hero",
            scrub: true,
          }),
        }),
      );
    });
  });
});

// --- TEST revealTitle (DOM contract) ---
// Verify animation only runs when DOM element exists
describe("revealTitle (DOM contract)", () => {
  beforeEach(() => {
    document.body.innerHTML = `<p class="hero__title"></p>`;
    jest.clearAllMocks();
  });

  it("sets title visible and adds animation to timeline", () => {
    const tl = { to: jest.fn() } as any;

    revealTitle(tl);

    expect(gsap.set).toHaveBeenCalledWith(expect.any(HTMLElement), {
      autoAlpha: 1,
    });
    expect(tl.to).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        duration: 1.2,
        onUpdate: expect.any(Function),
      }),
    );
  });

  it("does nothing if title is missing", () => {
    // Skip animation if target element is not in DOM
    document.body.innerHTML = ``;

    const tl = { to: jest.fn() } as any;

    revealTitle(tl);

    expect(gsap.set).not.toHaveBeenCalled();
    expect(tl.to).not.toHaveBeenCalled();
  });
});

//----------

// jest.mock("gsap", () => {
//   const timelineMock = {
//     to: jest.fn().mockReturnThis(),
//     fromTo: jest.fn().mockReturnThis(),
//   };

//   return {
//     gsap: {
//       set: jest.fn(),
//       to: jest.fn(),
//       timeline: jest.fn(() => timelineMock),
//       matchMedia: jest.fn(() => ({
//         add: jest.fn(),
//       })),
//       registerPlugin: jest.fn(),
//     },
//     default: {
//       set: jest.fn(),
//       to: jest.fn(),
//       timeline: jest.fn(() => timelineMock),
//       matchMedia: jest.fn(() => ({
//         add: jest.fn(),
//       })),
//       registerPlugin: jest.fn(),
//     },
//   };
// });

// jest.mock("gsap/ScrollTrigger", () => ({
//   ScrollTrigger: {},
// }));

// import {
//   animateHeroIntro,
//   animateHeroScroll,
//   revealTitle,
// } from "./heroAnimation";
// import { gsap } from "gsap";

// describe("hero animations", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("animateHeroIntro", () => {
//     it("sets base hero styles", () => {
//       animateHeroIntro();

//       expect(gsap.set).toHaveBeenCalledWith(".hero", { autoAlpha: 1 });
//       expect(gsap.set).toHaveBeenCalledWith(
//         ".hero__logo",
//         expect.objectContaining({
//           autoAlpha: 0,
//           scale: 1.8,
//         }),
//       );
//     });

//     it("registers responsive matchMedia queries", () => {
//       animateHeroIntro();

//       const mm = (gsap.matchMedia as jest.Mock).mock.results[0].value;

//       expect(mm.add).toHaveBeenCalledWith(
//         "(max-width: 767px)",
//         expect.any(Function),
//       );

//       expect(mm.add).toHaveBeenCalledWith(
//         "(min-width: 768px) and (max-width: 1279px)",
//         expect.any(Function),
//       );

//       expect(mm.add).toHaveBeenCalledWith(
//         "(min-width: 1280px)",
//         expect.any(Function),
//       );
//     });
//   });

//   describe("animateHeroScroll", () => {
//     it("creates scroll-triggered animation", () => {
//       animateHeroScroll();

//       expect(gsap.to).toHaveBeenCalledWith(
//         ".hero__content",
//         expect.objectContaining({
//           scale: 0.6,
//           autoAlpha: 0,
//           scrollTrigger: expect.objectContaining({
//             trigger: ".hero",
//             scrub: true,
//           }),
//         }),
//       );
//     });
//   });
// });

// // Тест revealTitle (DOM-контракт)

// describe("revealTitle (DOM contract)", () => {
//   beforeEach(() => {
//     document.body.innerHTML = `
//       <p class="hero__title"></p>
//     `;
//     jest.clearAllMocks();
//   });

//   it("sets title visible and adds animation to timeline", () => {
//     const tl = {
//       to: jest.fn(),
//     } as any;

//     revealTitle(tl);

//     expect(gsap.set).toHaveBeenCalledWith(expect.any(HTMLElement), {
//       autoAlpha: 1,
//     });

//     expect(tl.to).toHaveBeenCalledWith(
//       expect.any(Object),
//       expect.objectContaining({
//         duration: 1.2,
//         onUpdate: expect.any(Function),
//       }),
//     );
//   });

//   it("does nothing if title is missing", () => {
//   document.body.innerHTML = ``;

//   const tl = { to: jest.fn() } as any;

//   revealTitle(tl);

//   expect(gsap.set).not.toHaveBeenCalled();
//   expect(tl.to).not.toHaveBeenCalled();
// });
// });
