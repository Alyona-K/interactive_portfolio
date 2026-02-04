// --- MOCK GSAP ---
// Provide minimal gsap.context mock to avoid real DOM animations
jest.mock("gsap", () => ({
  gsap: {
    context: (cb: () => void) => {
      cb();
      return { revert: jest.fn() };
    },
  },
}));

// --- MOCK ANIMATIONS ---
// Mock hero and header animation functions to control side effects
jest.mock("./heroAnimation", () => ({
  animateHeroIntro: jest.fn(),
  animateHeroScroll: jest.fn(),
}));

jest.mock("@/features/header/headerAnimation", () => ({
  animateHeaderIntro: jest.fn(),
}));

import { render } from "@testing-library/react";
import Hero from "./Hero";

import {
  animateHeroIntro,
  animateHeroScroll,
} from "./heroAnimation";
import { animateHeaderIntro } from "@/features/header/headerAnimation";

describe("Hero", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not run intro animation when startIntro is false", () => {
    // Ensure animations are skipped if startIntro is false
    render(<Hero startIntro={false} />);

    expect(animateHeroIntro).not.toHaveBeenCalled();
    expect(animateHeaderIntro).not.toHaveBeenCalled();
    expect(animateHeroScroll).not.toHaveBeenCalled();
  });

  it("runs intro animation when startIntro becomes true", () => {
    // Intro animation should trigger on initial render with startIntro true
    render(<Hero startIntro={true} />);
    expect(animateHeroIntro).toHaveBeenCalledTimes(1);
  });

  it("does not run intro animation more than once", () => {
    // Prevent multiple calls when component rerenders
    const { rerender } = render(<Hero startIntro={true} />);

    rerender(<Hero startIntro={true} />);
    rerender(<Hero startIntro={true} />);

    expect(animateHeroIntro).toHaveBeenCalledTimes(1);
  });

  it("calls header and scroll animations after intro completes", () => {
    // Trigger onComplete callback manually to test sequential animations
    (animateHeroIntro as jest.Mock).mockImplementation((onComplete) => {
      onComplete();
    });

    render(<Hero startIntro={true} />);

    expect(animateHeaderIntro).toHaveBeenCalledTimes(1);
    expect(animateHeroScroll).toHaveBeenCalledTimes(1);
  });

  it("calls onAnimationComplete callback after intro animation", () => {
    // Verify external callback is called after intro animation completes
    const onAnimationComplete = jest.fn();

    (animateHeroIntro as jest.Mock).mockImplementation((onComplete) => {
      onComplete();
    });

    render(
      <Hero
        startIntro={true}
        onAnimationComplete={onAnimationComplete}
      />
    );

    expect(onAnimationComplete).toHaveBeenCalledTimes(1);
  });
});

//--------

// // --- MOCK GSAP ---
// jest.mock("gsap", () => ({
//   gsap: {
//     context: (cb: () => void) => {
//       cb();
//       return { revert: jest.fn() };
//     },
//   },
// }));

// // --- MOCK ANIMATIONS ---
// jest.mock("./heroAnimation", () => ({
//   animateHeroIntro: jest.fn(),
//   animateHeroScroll: jest.fn(),
// }));

// jest.mock("@/features/header/headerAnimation", () => ({
//   animateHeaderIntro: jest.fn(),
// }));

// import { render } from "@testing-library/react";
// import Hero from "./Hero";

// import {
//   animateHeroIntro,
//   animateHeroScroll,
// } from "./heroAnimation";
// import { animateHeaderIntro } from "@/features/header/headerAnimation";

// describe("Hero", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("does not run intro animation when startIntro is false", () => {
//     render(<Hero startIntro={false} />);

//     expect(animateHeroIntro).not.toHaveBeenCalled();
//     expect(animateHeaderIntro).not.toHaveBeenCalled();
//     expect(animateHeroScroll).not.toHaveBeenCalled();
//   });

//   it("runs intro animation when startIntro becomes true", () => {
//     render(<Hero startIntro={true} />);

//     expect(animateHeroIntro).toHaveBeenCalledTimes(1);
//   });

//   it("does not run intro animation more than once", () => {
//     const { rerender } = render(<Hero startIntro={true} />);

//     rerender(<Hero startIntro={true} />);
//     rerender(<Hero startIntro={true} />);

//     expect(animateHeroIntro).toHaveBeenCalledTimes(1);
//   });

//   it("calls header and scroll animations after intro completes", () => {
//     (animateHeroIntro as jest.Mock).mockImplementation((onComplete) => {
//       onComplete();
//     });

//     render(<Hero startIntro={true} />);

//     expect(animateHeaderIntro).toHaveBeenCalledTimes(1);
//     expect(animateHeroScroll).toHaveBeenCalledTimes(1);
//   });

//   it("calls onAnimationComplete callback after intro animation", () => {
//     const onAnimationComplete = jest.fn();

//     (animateHeroIntro as jest.Mock).mockImplementation((onComplete) => {
//       onComplete();
//     });

//     render(
//       <Hero
//         startIntro={true}
//         onAnimationComplete={onAnimationComplete}
//       />
//     );

//     expect(onAnimationComplete).toHaveBeenCalledTimes(1);
//   });
// });
