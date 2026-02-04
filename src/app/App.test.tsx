// --- MOCK LAZY PAGES ---
// Mock lazy-loaded pages to isolate App integration tests and avoid real imports
jest.mock("@/pages/project-page", () => {
  const MockPage = ({ startHeroIntro, onHeroEnterComplete }: any) => (
    <div>
      Project Page Content
      <button onClick={onHeroEnterComplete}>Complete Hero</button>
      <span>startHeroIntro: {startHeroIntro ? "true" : "false"}</span>
    </div>
  );
  return { __esModule: true, default: MockPage };
});

jest.mock("@/pages/404", () => ({
  __esModule: true,
  default: () => <div>404 Content</div>,
}));

// --- MOCK SHARED COMPONENTS ---
// Mock shared UI and hooks to focus on App composition and state flow
jest.mock("@/features/header/Header", () => () => <div>Header Content</div>);
jest.mock("@/features/footer/Footer", () => () => <div>Footer Content</div>);
jest.mock("@/shared/i18n/LanguageSync", () => ({
  LanguageSync: () => <div>LanguageSync Component</div>,
}));

// Mock useLoader to always complete loader instantly for test determinism
jest.mock("@/shared/hooks/useLoader", () => ({
  useLoader: () => true,
}));

import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { ROUTES } from "@/shared/config/routes";

/* --------------------------------------------------
   APP INTEGRATION TESTS
   Verify high-level composition, routing, and conditional rendering
   without relying on actual lazy imports or async loaders.
-------------------------------------------------- */
describe("App Integration", () => {
  // Wrapper to render App with MemoryRouter for route testing
  const renderApp = async (initialRoute = ROUTES.PROJECTPAGE) => {
    let container: HTMLElement | null = null;

    await act(async () => {
      container = render(
        <MemoryRouter initialEntries={[initialRoute]}>
          <App />
        </MemoryRouter>,
      ).container;
    });

    return container!;
  };

  test("renders Header and LanguageSync", async () => {
    await renderApp();

    // Verify core layout components render
    expect(screen.getByText("Header Content")).toBeInTheDocument();
    expect(screen.getByText("LanguageSync Component")).toBeInTheDocument();
  });

  test("renders ProjectPage and startHeroIntro immediately", async () => {
    await renderApp();

    // Verify ProjectPage receives initial loader-complete state
    expect(await screen.findByText(/Project Page Content/i)).toBeInTheDocument();
    expect(screen.getByText(/startHeroIntro: true/i)).toBeInTheDocument();
  });

  test("renders Footer only after Hero intro completes", async () => {
    await renderApp();

    // Footer should not render before Hero intro completion
    expect(screen.queryByText("Footer Content")).not.toBeInTheDocument();

    // Trigger Hero intro completion callback
    const btn = screen.getByText("Complete Hero");
    await act(async () => {
      btn.click();
    });

    // Footer becomes visible after Hero intro completes
    expect(await screen.findByText("Footer Content")).toBeInTheDocument();
  });

  test("renders 404 page on unknown route", async () => {
    await renderApp("/unknown");

    // Verify fallback route rendering
    expect(await screen.findByText("404 Content")).toBeInTheDocument();
  });
});


//--------

// // --- MOCK LAZY PAGES ---
// jest.mock("@/pages/project-page", () => {
//   const MockPage = ({ startHeroIntro, onHeroEnterComplete }: any) => (
//     <div>
//       Project Page Content
//       <button onClick={onHeroEnterComplete}>Complete Hero</button>
//       <span>startHeroIntro: {startHeroIntro ? "true" : "false"}</span>
//     </div>
//   );
//   return { __esModule: true, default: MockPage };
// });

// jest.mock("@/pages/404", () => ({
//   __esModule: true,
//   default: () => <div>404 Content</div>,
// }));

// // --- MOCK SHARED COMPONENTS ---
// jest.mock("@/features/header/Header", () => () => <div>Header Content</div>);
// jest.mock("@/features/footer/Footer", () => () => <div>Footer Content</div>);
// jest.mock("@/shared/i18n/LanguageSync", () => ({
//   LanguageSync: () => <div>LanguageSync Component</div>,
// }));

// jest.mock("@/shared/hooks/useLoader", () => ({
//   useLoader: () => true, // сразу считаем Loader завершённым
// }));

// import { render, screen, act } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import App from "./App";
// import { ROUTES } from "@/shared/config/routes";

// describe("App Integration", () => {
//   const renderApp = async (initialRoute = ROUTES.PROJECTPAGE) => {
//     let container: HTMLElement | null = null;

//     await act(async () => {
//       container = render(
//         <MemoryRouter initialEntries={[initialRoute]}>
//           <App />
//         </MemoryRouter>,
//       ).container;
//     });

//     return container!;
//   };

//   test("renders Header and LanguageSync", async () => {
//     await renderApp();

//     expect(screen.getByText("Header Content")).toBeInTheDocument();
//     expect(screen.getByText("LanguageSync Component")).toBeInTheDocument();
//     // Loader больше не рендерится, поэтому проверку убираем
//   });

//   test("renders ProjectPage and startHeroIntro immediately", async () => {
//     await renderApp();

//     expect(
//       await screen.findByText(/Project Page Content/i),
//     ).toBeInTheDocument();
//     expect(screen.getByText(/startHeroIntro: true/i)).toBeInTheDocument();
//   });

//   test("renders Footer only after Hero intro completes", async () => {
//     await renderApp();

//     // Footer пока не виден
//     expect(screen.queryByText("Footer Content")).not.toBeInTheDocument();

//     // Завершаем Hero
//     const btn = screen.getByText("Complete Hero");
//     await act(async () => {
//       btn.click();
//     });

//     expect(await screen.findByText("Footer Content")).toBeInTheDocument();
//   });

//   test("renders 404 page on unknown route", async () => {
//     await renderApp("/unknown");

//     expect(await screen.findByText("404 Content")).toBeInTheDocument();
//   });
// });
