// --- MOCK TRANSLATION HOOK ---
// Provide mock for react-i18next to avoid real i18n during tests
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      resolvedLanguage: "en",
      changeLanguage: jest.fn(),
    },
  }),
}));

// --- MOCK BURGER MENU ---
// Render a minimal burger menu component when open
jest.mock("@/features/header/BurgerMenu", () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="burger-menu" /> : null,
}));

import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders navigation links", () => {
    // Verify all main nav links are present
    render(<Header />);
    expect(screen.getByText("NAV.ABOUT")).toBeInTheDocument();
    expect(screen.getByText("NAV.SKILLS")).toBeInTheDocument();
    expect(screen.getByText("NAV.PROJECTS")).toBeInTheDocument();
    expect(screen.getByText("NAV.FAQ")).toBeInTheDocument();
    expect(screen.getByText("NAV.CONTACT")).toBeInTheDocument();
  });

  it("renders language buttons", () => {
    // Ensure language switch buttons are rendered
    render(<Header />);
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ES" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "RU" })).toBeInTheDocument();
  });

  it("toggles burger menu", () => {
    // Clicking burger button opens/closes the menu
    render(<Header />);

    const burgerButton = screen.getByRole("button", {
      name: /open menu/i,
    });

    fireEvent.click(burgerButton);
    expect(screen.getByTestId("burger-menu")).toBeInTheDocument();

    fireEvent.click(burgerButton);
    expect(screen.queryByTestId("burger-menu")).not.toBeInTheDocument();
  });

  it("adds scrolled class on scroll", () => {
    // Header should receive 'scrolled' class when window scrollY > 0
    render(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(document.querySelector("header")).toHaveClass("scrolled");
  });
});

//--------------

// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key: string) => key,
//     i18n: {
//       resolvedLanguage: "en",
//       changeLanguage: jest.fn(),
//     },
//   }),
// }));

// jest.mock("@/features/header/BurgerMenu", () => ({
//   __esModule: true,
//   default: ({ isOpen }: { isOpen: boolean }) =>
//     isOpen ? <div data-testid="burger-menu" /> : null,
// }));

// import { render, screen, fireEvent } from "@testing-library/react";
// import Header from "./Header";

// describe("Header", () => {
//   it("renders navigation links", () => {
//     render(<Header />);

//     expect(screen.getByText("NAV.ABOUT")).toBeInTheDocument();
//     expect(screen.getByText("NAV.SKILLS")).toBeInTheDocument();
//     expect(screen.getByText("NAV.PROJECTS")).toBeInTheDocument();
//     expect(screen.getByText("NAV.FAQ")).toBeInTheDocument();
//     expect(screen.getByText("NAV.CONTACT")).toBeInTheDocument();
//   });

//   it("renders language buttons", () => {
//     render(<Header />);

//     expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: "ES" })).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: "RU" })).toBeInTheDocument();
//   });

//   it("toggles burger menu", () => {
//     render(<Header />);

//     const burgerButton = screen.getByRole("button", {
//       name: /open menu/i,
//     });

//     fireEvent.click(burgerButton);
//     expect(screen.getByTestId("burger-menu")).toBeInTheDocument();

//     fireEvent.click(burgerButton);
//     expect(screen.queryByTestId("burger-menu")).not.toBeInTheDocument();
//   });

//   it("adds scrolled class on scroll", () => {
//     render(<Header />);

//     fireEvent.scroll(window, { target: { scrollY: 100 } });

//     expect(document.querySelector("header")).toHaveClass("scrolled");
//   });
// });
