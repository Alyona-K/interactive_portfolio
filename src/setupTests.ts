import "@testing-library/jest-dom";

// --- MOCK VITE ENV ---
// Provide test-specific environment variables to mimic Vite runtime environment
(globalThis as any).importMeta = {
  env: {
    VITE_API_URL: "http://localhost:3001",
    VITE_BASENAME: "/",
    VITE_APP_NAME: "InteractivePortfolio-Test",
    VITE_EMAILJS_SERVICE_ID: "test_service",
    VITE_EMAILJS_TEMPLATE_ID: "test_template",
    VITE_EMAILJS_PUBLIC_KEY: "test_public",
  },
};

// --- NODE POLYFILLS ---
// Polyfill Node TextEncoder/TextDecoder for test environment
import { TextEncoder, TextDecoder } from "util";
(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;

// --- SVG MOCK ---
// Mock imported SVG sprite to avoid rendering actual SVGs in tests
jest.mock("@/assets/images/sprite.svg", () => ({
  __esModule: true,
  default: "SvgMock",
  ReactComponent: () => null,
}), { virtual: true });

// --- INTERSECTION OBSERVER MOCK ---
// Mock IntersectionObserver to control intersection events in tests
const observe = jest.fn();
const disconnect = jest.fn();
const unobserve = jest.fn();
const takeRecords = jest.fn();

class IntersectionObserverMock {
  private callback: IntersectionObserverCallback;
  public root: Element | null;
  public rootMargin: string;
  public thresholds: number[];
  public options: IntersectionObserverInit;
  public observe = observe;
  public disconnect = disconnect;
  public unobserve = unobserve;
  public takeRecords = takeRecords;

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.callback = callback;
    this.options = options;
    this.rootMargin = options.rootMargin || "";
    this.root = options.root instanceof Element ? options.root : null;
    this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold ?? 0];
  }

  // Trigger intersection callback manually for test assertions
  trigger(isIntersecting = true) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }
}

// Override global IntersectionObserver with mock
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

export { observe, disconnect, unobserve, takeRecords, IntersectionObserverMock };

// TS typings for compiler
interface Window {
  IntersectionObserver: typeof IntersectionObserverMock;
}
declare var globalThis: Window;


//--------

// import "@testing-library/jest-dom";

// // --- MOCK VITE ENV ---
// (globalThis as any).importMeta = {
//   env: {
//     VITE_API_URL: "http://localhost:3001",
//     VITE_BASENAME: "/",
//     VITE_APP_NAME: "InteractivePortfolio-Test",
//     VITE_EMAILJS_SERVICE_ID: "test_service",
//     VITE_EMAILJS_TEMPLATE_ID: "test_template",
//     VITE_EMAILJS_PUBLIC_KEY: "test_public",
//   },
// };

// // --- NODE POLYFILLS ---
// import { TextEncoder, TextDecoder } from "util";
// (globalThis as any).TextEncoder = TextEncoder;
// (globalThis as any).TextDecoder = TextDecoder;

// // --- SVG MOCK ---
// jest.mock("@/assets/images/sprite.svg", () => ({
//   __esModule: true,
//   default: "SvgMock",
//   ReactComponent: () => null,
// }), { virtual: true });

// // IntersectionObserver MOCK
// const observe = jest.fn();
// const disconnect = jest.fn();
// const unobserve = jest.fn();
// const takeRecords = jest.fn();

// class IntersectionObserverMock {
//   private callback: IntersectionObserverCallback;
//   public root: Element | null;
//   public rootMargin: string;
//   public thresholds: number[];
//   public options: IntersectionObserverInit; // <-- вот оно
//   public observe = observe;
//   public disconnect = disconnect;
//   public unobserve = unobserve;
//   public takeRecords = takeRecords;

//   constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
//     this.callback = callback;
//     this.options = options; 
//     this.rootMargin = options.rootMargin || "";
//     this.root = options.root instanceof Element ? options.root : null;
//     this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold ?? 0];
//   }

//   trigger(isIntersecting = true) {
//     this.callback(
//       [{ isIntersecting } as IntersectionObserverEntry],
//       this as unknown as IntersectionObserver
//     );
//   }
// }

// Object.defineProperty(window, "IntersectionObserver", {
//   writable: true,
//   configurable: true,
//   value: IntersectionObserverMock,
// });

// export { observe, disconnect, unobserve, takeRecords, IntersectionObserverMock };

// // TS typings для компилятора
// interface Window {
//   IntersectionObserver: typeof IntersectionObserverMock;
// }
// declare var globalThis: Window;
