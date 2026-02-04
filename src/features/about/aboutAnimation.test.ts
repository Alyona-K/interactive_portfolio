// --- MOCK GSAP AND SCROLLTRIGGER ---
// Mock GSAP methods to isolate animation logic and avoid actual DOM animations
// Timeline methods return `this` to allow chaining in tests
jest.mock("gsap", () => {
  const timelineMock = {
    to: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
  };

  const gsapMock = {
    set: jest.fn(),
    to: jest.fn(),
    fromTo: jest.fn(),
    timeline: jest.fn(() => timelineMock),
    matchMedia: jest.fn(() => ({ add: jest.fn(), revert: jest.fn() })),
    registerPlugin: jest.fn(),
  };

  return {
    gsap: gsapMock,
    default: gsapMock,
  };
});

jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

import * as AboutAnim from "./aboutAnimation";
import { gsap } from "gsap";

/* --------------------------------------------------
   ANIMATEABOUT HOOK TESTS
   Verify setup, breakpoint behavior, and cleanup function
-------------------------------------------------- */
describe("animateAbout", () => {
  let rootEl: HTMLElement;
  let addMock: jest.Mock;
  let revertMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup root element with required child structure for animations
    rootEl = document.createElement("div");
    rootEl.innerHTML = `
      <div class="about__bg"></div>
      <img class="about__photo"/>
      <h2 class="about__title">Title</h2>
      <p class="about__text">Line1\nLine2</p>
      <div class="about__btn"></div>
      <div class="about__inner"></div>
    `;

    addMock = jest.fn();
    revertMock = jest.fn();

    (gsap.matchMedia as jest.Mock).mockReturnValue({ add: addMock, revert: revertMock });
  });

  it("returns undefined if rootEl is null", () => {
    expect(AboutAnim.animateAbout(null)).toBeUndefined();
  });

  it("calls setupBase and matchMedia.add for all breakpoints", () => {
    const cleanup = AboutAnim.animateAbout(rootEl);

    // Verify initial GSAP setup for background and photo
    expect(gsap.set).toHaveBeenCalledWith(
      rootEl.querySelector(".about__bg"),
      expect.objectContaining({ willChange: "height" })
    );
    expect(gsap.set).toHaveBeenCalledWith(
      rootEl.querySelector(".about__photo"),
      expect.objectContaining({ willChange: "transform, opacity" })
    );

    // Verify animation added for mobile, tablet, desktop breakpoints
    expect(addMock).toHaveBeenCalledTimes(3);

    // Cleanup function returned for revert on unmount
    expect(typeof cleanup).toBe("function");
  });
});

/* --------------------------------------------------
   UTILITY FUNCTION TESTS
   splitTitleToChars and splitTextToLines behavior verification
-------------------------------------------------- */
describe("splitTitleToChars", () => {
  it("splits text into span chars", () => {
    const title = document.createElement("h2");
    title.textContent = "Hi";

    AboutAnim["splitTitleToChars"](title);

    expect(title.innerHTML).toBe("<span>H</span><span>i</span>");
    expect(title.dataset.split).toBe("chars");
  });

  it("does nothing if already split", () => {
    const title = document.createElement("h2");
    title.dataset.split = "chars";
    title.textContent = "Hi";

    AboutAnim["splitTitleToChars"](title);

    expect(title.innerHTML).toBe("Hi");
  });
});

describe("splitTextToLines", () => {
  it("splits text content into span lines", () => {
    const p = document.createElement("p");
    p.textContent = "Line1\nLine2";

    AboutAnim["splitTextToLines"]([p] as unknown as NodeListOf<HTMLElement>);

    expect(p.innerHTML).toBe("<span>Line1</span> <span>Line2</span>");
    expect(p.dataset.split).toBe("lines");
  });

  it("does nothing if already split", () => {
    const p = document.createElement("p");
    p.dataset.split = "lines";
    p.textContent = "Text";

    AboutAnim["splitTextToLines"]([p] as unknown as NodeListOf<HTMLElement>);

    expect(p.innerHTML).toBe("Text");
  });
});

/* --------------------------------------------------
   SCENE FUNCTIONS TESTS
   mobileScene, tabletScene, desktopScene behavior
   Verify GSAP calls and text splitting
-------------------------------------------------- */
describe("scenes", () => {
  beforeEach(() => jest.clearAllMocks());

  let rootEl: HTMLElement;

  beforeEach(() => {
    rootEl = document.createElement("div");
    rootEl.innerHTML = `
      <img class="about__photo"/>
      <h2 class="about__title">Title</h2>
      <p class="about__text">Line1\nLine2</p>
      <div class="about__btn"></div>
      <div class="about__inner"></div>
    `;
  });

  it("mobileScene sets elements and calls gsap.fromTo/to", () => {
    const title = rootEl.querySelector<HTMLElement>(".about__title");
    AboutAnim["mobileScene"](rootEl);

    expect(gsap.set).toHaveBeenCalled();
    expect(gsap.fromTo).toHaveBeenCalled();
    expect(title!.dataset.split).toBe("chars");
  });

  it("tabletScene sets elements and calls gsap.fromTo/to", () => {
    const title = rootEl.querySelector<HTMLElement>(".about__title");
    AboutAnim["tabletScene"](rootEl);

    expect(gsap.set).toHaveBeenCalled();
    expect(gsap.fromTo).toHaveBeenCalled();
    expect(gsap.to).toHaveBeenCalled();
    expect(title!.dataset.split).toBe("chars");
  });

  it("desktopScene sets elements and calls gsap.fromTo/to", () => {
    const title = rootEl.querySelector<HTMLElement>(".about__title");
    AboutAnim["desktopScene"](rootEl);

    expect(gsap.fromTo).toHaveBeenCalled();
    expect(gsap.to).toHaveBeenCalled();
    expect(title!.dataset.split).toBe("chars");
  });

  it("scenes do nothing if required elements missing", () => {
    const emptyEl = document.createElement("div");

    AboutAnim["mobileScene"](emptyEl);
    AboutAnim["tabletScene"](emptyEl);
    AboutAnim["desktopScene"](emptyEl);

    // GSAP should not be called if elements are missing
    expect(gsap.fromTo).not.toHaveBeenCalled();
  });
});



//-------

// jest.mock("gsap", () => {
//   const timelineMock = {
//     to: jest.fn().mockReturnThis(),
//     fromTo: jest.fn().mockReturnThis(),
//   };

//   const gsapMock = {
//     set: jest.fn(),
//     to: jest.fn(),
//     fromTo: jest.fn(),
//     timeline: jest.fn(() => timelineMock),
//     matchMedia: jest.fn(() => ({ add: jest.fn(), revert: jest.fn() })),
//     registerPlugin: jest.fn(),
//   };

//   return {
//     gsap: gsapMock,
//     default: gsapMock,
//   };
// });

// jest.mock("gsap/ScrollTrigger", () => ({
//   ScrollTrigger: {},
// }));

// import * as AboutAnim from "./aboutAnimation";
// import { gsap } from "gsap";

// describe("animateAbout", () => {
//   let rootEl: HTMLElement;
//   let addMock: jest.Mock;
//   let revertMock: jest.Mock;

//   beforeEach(() => {
//     // чистим мок
//     jest.clearAllMocks();

//     rootEl = document.createElement("div");
//     rootEl.innerHTML = `
//       <div class="about__bg"></div>
//       <img class="about__photo"/>
//       <h2 class="about__title">Title</h2>
//       <p class="about__text">Line1\nLine2</p>
//       <div class="about__btn"></div>
//       <div class="about__inner"></div>
//     `;

//     addMock = jest.fn();
//     revertMock = jest.fn();
//     (gsap.matchMedia as jest.Mock).mockReturnValue({ add: addMock, revert: revertMock });
//   });

//   it("returns undefined if rootEl is null", () => {
//     expect(AboutAnim.animateAbout(null)).toBeUndefined();
//   });

//   it("calls setupBase and matchMedia.add for all breakpoints", () => {
//     const cleanup = AboutAnim.animateAbout(rootEl);

//     expect(gsap.set).toHaveBeenCalledWith(rootEl.querySelector(".about__bg"), expect.objectContaining({ willChange: "height" }));
//     expect(gsap.set).toHaveBeenCalledWith(rootEl.querySelector(".about__photo"), expect.objectContaining({ willChange: "transform, opacity" }));

//     expect(addMock).toHaveBeenCalledTimes(3); // mobile, tablet, desktop
//     expect(typeof cleanup).toBe("function");
//   });
// });

// describe("splitTitleToChars", () => {
//   it("splits text into span chars", () => {
//     const title = document.createElement("h2");
//     title.textContent = "Hi";
//     AboutAnim["splitTitleToChars"](title);
//     expect(title.innerHTML).toBe("<span>H</span><span>i</span>");
//     expect(title.dataset.split).toBe("chars");
//   });

//   it("does nothing if already split", () => {
//     const title = document.createElement("h2");
//     title.dataset.split = "chars";
//     title.textContent = "Hi";
//     AboutAnim["splitTitleToChars"](title);
//     expect(title.innerHTML).toBe("Hi");
//   });
// });

// describe("splitTextToLines", () => {
//   it("splits text content into span lines", () => {
//     const p = document.createElement("p");
//     p.textContent = "Line1\nLine2";
//     AboutAnim["splitTextToLines"](document.querySelectorAll("p") || []);
//     // пустой NodeList -> ничего не ломается

//     AboutAnim["splitTextToLines"]([p] as unknown as NodeListOf<HTMLElement>);
//     expect(p.innerHTML).toBe("<span>Line1</span> <span>Line2</span>");
//     expect(p.dataset.split).toBe("lines");
//   });

//   it("does nothing if already split", () => {
//     const p = document.createElement("p");
//     p.dataset.split = "lines";
//     p.textContent = "Text";
//     AboutAnim["splitTextToLines"]([p] as unknown as NodeListOf<HTMLElement>);
//     expect(p.innerHTML).toBe("Text");
//   });
// });

// describe("scenes", () => {
//   beforeEach(() => jest.clearAllMocks());

//   let rootEl: HTMLElement;

//   beforeEach(() => {
//     rootEl = document.createElement("div");
//     rootEl.innerHTML = `
//       <img class="about__photo"/>
//       <h2 class="about__title">Title</h2>
//       <p class="about__text">Line1\nLine2</p>
//       <div class="about__btn"></div>
//       <div class="about__inner"></div>
//     `;
//   });

//   it("mobileScene sets elements and calls gsap.fromTo/to", () => {
//     const title = rootEl.querySelector<HTMLElement>(".about__title");
//     AboutAnim["mobileScene"](rootEl);
//     expect(gsap.set).toHaveBeenCalled();
//     expect(gsap.fromTo).toHaveBeenCalled();
//     expect(title!.dataset.split).toBe("chars");
//   });

//   it("tabletScene sets elements and calls gsap.fromTo/to", () => {
//     const title = rootEl.querySelector<HTMLElement>(".about__title");
//     AboutAnim["tabletScene"](rootEl);
//     expect(gsap.set).toHaveBeenCalled();
//     expect(gsap.fromTo).toHaveBeenCalled();
//     expect(gsap.to).toHaveBeenCalled();
//     expect(title!.dataset.split).toBe("chars");
//   });

//   it("desktopScene sets elements and calls gsap.fromTo/to", () => {
//     const title = rootEl.querySelector<HTMLElement>(".about__title");
//     AboutAnim["desktopScene"](rootEl);
//     expect(gsap.fromTo).toHaveBeenCalled();
//     expect(gsap.to).toHaveBeenCalled();
//     expect(title!.dataset.split).toBe("chars");
//   });

//   it("scenes do nothing if required elements missing", () => {
//     const emptyEl = document.createElement("div");
//     AboutAnim["mobileScene"](emptyEl);
//     AboutAnim["tabletScene"](emptyEl);
//     AboutAnim["desktopScene"](emptyEl);
//     expect(gsap.fromTo).not.toHaveBeenCalled();
//   });
// });

//-------

//   const selectors = () => ({
//     photo: rootEl.querySelector(".about__photo")!,
//     title: rootEl.querySelector(".about__title")!,
//     text: rootEl.querySelector(".about__text")!,
//     btn: rootEl.querySelector(".about__btn")!,
//     content: rootEl.querySelector(".about__inner")!,
//   });


    // const { title } = selectors();