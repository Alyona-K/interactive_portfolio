// --- MOCK TRANSLATIONS ---
// Mock react-i18next to return key strings for deterministic testing
jest.mock("react-i18next", () => ({
  useTranslation: (ns?: string) => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

// --- MOCK ANIMATIONS ---
// Mock about section animation to isolate render logic and provide cleanup
jest.mock("./aboutAnimation", () => ({
  animateAbout: jest.fn(() => jest.fn()),
}));

// --- MOCK UI COMPONENTS ---
// Mock DownloadDropdown to avoid rendering actual UI and test prop passing
jest.mock("@/shared/ui/DownloadDropdown", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

// --- MOCK STATIC ASSETS ---
// Mock images to prevent webpack/loader issues and focus on component logic
jest.mock("@/assets/images/about/profile-img.webp", () => "profile-mock", { virtual: true });
jest.mock("@/assets/images/about/profile-img@2x.webp", () => "profile-mock", { virtual: true });
jest.mock("@/assets/images/about/profile-img--tablet.webp", () => "profile-mock", { virtual: true });
jest.mock("@/assets/images/about/profile-img--tablet@2x.webp", () => "profile-mock", { virtual: true });
jest.mock("@/assets/images/about/profile-img--mobile.webp", () => "profile-mock", { virtual: true });
jest.mock("@/assets/images/about/profile-img--mobile@2x.webp", () => "profile-mock", { virtual: true });

import { render, screen } from "@testing-library/react";
import About from "./About";
import { animateAbout } from "./aboutAnimation";
import DownloadDropdown from "@/shared/ui/DownloadDropdown";

/* --------------------------------------------------
   ABOUT SECTION TESTS
   Verify rendering, animation trigger, and props passed to child components.
   Focus on behavior rather than internal implementation.
-------------------------------------------------- */
describe("About section", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders about section and calls animation", () => {
    render(<About />);
    
    // Verify headings and text placeholders render
    expect(screen.getByRole("heading", { name: /about section/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "title" })).toBeInTheDocument(); // t("title") returns key
    expect(screen.getAllByText(/text\.p\d/)).toHaveLength(4);

    // Verify animation hook is called on mount
    expect(animateAbout).toHaveBeenCalled();
  });

  it("passes correct props to DownloadDropdown", () => {
    render(<About />);

    // Verify DownloadDropdown receives correct className, label, and options
    expect(DownloadDropdown).toHaveBeenCalledWith(
      expect.objectContaining({
        className: "about__btn",
        label: "buttons.downloadCV",
        options: [
          { label: "lang.en", href: "/docs/cv-alyona-kruchkova-frontend-react-ts-en.pdf" },
          { label: "lang.es", href: "/docs/cv-alyona-kruchkova-frontend-react-ts-es.pdf" },
          { label: "lang.ru", href: "/docs/cv-alyona-kruchkova-frontend-react-ts-ru.pdf" },
        ],
      }),
      undefined // props second argument in mock function call is React internal
    );
  });
});

//------

// jest.mock("react-i18next", () => ({
//   useTranslation: (ns?: string) => ({
//     t: (key: string) => key, // возвращает ключ для простоты
//     i18n: { language: "en" },
//   }),
// }));

// jest.mock("./aboutAnimation", () => ({
//   animateAbout: jest.fn(() => jest.fn()), // возвращает функцию очистки
// }));

// jest.mock("@/shared/ui/DownloadDropdown", () => ({
//   __esModule: true,
//   default: jest.fn(() => null),
// }));

// // --- MOCK STATIC ASSETS ---
// jest.mock("@/assets/images/about/profile-img.webp", () => "profile-mock", {
//   virtual: true,
// });
// jest.mock("@/assets/images/about/profile-img@2x.webp", () => "profile-mock", {
//   virtual: true,
// });
// jest.mock("@/assets/images/about/profile-img--tablet.webp", () => "profile-mock", {
//   virtual: true,
// });
// jest.mock("@/assets/images/about/profile-img--tablet@2x.webp", () => "profile-mock", {
//   virtual: true,
// });
// jest.mock("@/assets/images/about/profile-img--mobile.webp", () => "profile-mock", {
//   virtual: true,
// });
// jest.mock("@/assets/images/about/profile-img--mobile@2x.webp", () => "profile-mock", {
//   virtual: true,
// });

// import { render, screen } from "@testing-library/react";
// import About from "./About";
// import { animateAbout } from "./aboutAnimation";
// import DownloadDropdown from "@/shared/ui/DownloadDropdown";

// describe("About section", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders about section and calls animation", () => {
//     render(<About />);
    
//     expect(screen.getByRole("heading", { name: /about section/i })).toBeInTheDocument();
//     expect(screen.getByRole("heading", { name: "title" })).toBeInTheDocument(); // t("title") вернул ключ
//     expect(screen.getAllByText(/text\.p\d/)).toHaveLength(4);
//     expect(animateAbout).toHaveBeenCalled();
//   });

// it("passes correct props to DownloadDropdown", () => {
//   render(<About />);
//   expect(DownloadDropdown).toHaveBeenCalledWith(
//     expect.objectContaining({
//       className: "about__btn",
//       label: "buttons.downloadCV",
//       options: [
//         { label: "lang.en", href: "/docs/cv-alyona-kruchkova-frontend-react-ts-en.pdf" },
//         { label: "lang.es", href: "/docs/cv-alyona-kruchkova-frontend-react-ts-es.pdf" },
//       ],
//     }),
//     undefined // <-- вот здесь точно undefined
//   );
// });
// });