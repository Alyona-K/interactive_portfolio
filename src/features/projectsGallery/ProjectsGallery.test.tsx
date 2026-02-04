// --- MOCK USETRANSLATION ---
// Return translation key directly for predictable test output
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// --- MOCK PROJECT UI COMPONENTS ---
// Mock ProjectCard to allow click interactions
jest.mock("@/shared/ui/ProjectCard", () => (props: any) => (
  <button data-testid={`card-${props.id}`} onClick={props.onClick}>
    {props.titleKey}
  </button>
));

// Mock ProjectModal to control visibility and content
jest.mock("@/shared/ui/ProjectModal", () => (props: any) =>
  props.isOpen ? (
    <div data-testid="modal">
      {props.project ? props.project.titleKey : "No project"}
      <button onClick={props.onClose}>Close</button>
    </div>
  ) : null
);

// --- MOCK PROJECTS ANIMATION ---
// Return cleanup function for useEffect side effects
jest.mock("./projectsAnimation", () => ({
  animateProjectsGallery: jest.fn(() => jest.fn()),
}));

// --- MOCK SCROLLTRIGGER ---
jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ProjectsGallery from "@/features/projectsGallery/ProjectsGallery";
import { projects } from "@/entities/project/projects.data";
import * as animateModule from "@/features/projectsGallery/projectsAnimation";

// --- MOCK WINDOW MATCHMEDIA ---
// Prevent errors in useEffect media query usage
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("ProjectsGallery component", () => {
  // Spy on animation function to assert side effects
  const animateSpy = jest.spyOn(animateModule, "animateProjectsGallery");

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("renders section, title and all project cards", () => {
    render(<ProjectsGallery />);

    // Verify section title is rendered
    expect(screen.getByText("projects.section.title")).toBeInTheDocument();

    // Verify all project cards are rendered
    projects.forEach((project) => {
      expect(screen.getByTestId(`card-${project.id}`)).toBeInTheDocument();
    });

    // Verify animation hook runs once on mount
    expect(animateSpy).toHaveBeenCalledTimes(1);
  });

  test("opens modal with correct project on card click", () => {
    render(<ProjectsGallery />);

    const firstProject = projects[0];
    const cardButton = screen.getByTestId(`card-${firstProject.id}`);

    // Clicking card opens modal
    fireEvent.click(cardButton);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();

    // Modal content matches clicked project
    expect(modal).toHaveTextContent(firstProject.titleKey);
  });

  test("closes modal when onClose is called", () => {
    render(<ProjectsGallery />);

    const firstProject = projects[0];
    fireEvent.click(screen.getByTestId(`card-${firstProject.id}`));

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Modal should be removed from DOM
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  test("handles edge case: click on non-existing project id", () => {
    render(<ProjectsGallery />);

    // Clicking existing card triggers modal for that project
    const instance = screen.getByTestId(`card-${projects[0].id}`);
    fireEvent.click(instance);

    expect(screen.getByTestId("modal")).toHaveTextContent(projects[0].titleKey);
  });

  test("cleanup function is returned from animateProjectsGallery", () => {
    const cleanupMock = jest.fn();
    animateSpy.mockReturnValue(cleanupMock);

    const { unmount } = render(<ProjectsGallery />);
    unmount();

    // Verify cleanup function is called on unmount
    expect(cleanupMock).toHaveBeenCalled();
  });
});


//-----

// // Mock useTranslation
// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key: string) => key, // возвращаем ключ для теста
//   }),
// }));

// // Mock ProjectCard и ProjectModal
// jest.mock("@/shared/ui/ProjectCard", () => (props: any) => (
//   <button data-testid={`card-${props.id}`} onClick={props.onClick}>
//     {props.titleKey}
//   </button>
// ));

// jest.mock("@/shared/ui/ProjectModal", () => (props: any) =>
//   props.isOpen ? (
//     <div data-testid="modal">
//       {props.project ? props.project.titleKey : "No project"}
//       <button onClick={props.onClose}>Close</button>
//     </div>
//   ) : null
// );

// // Мок для gsap.matchMedia
// jest.mock("./projectsAnimation", () => ({
//   animateProjectsGallery: jest.fn(() => {
//     return jest.fn(); // возвращаем cleanup function
//   }),
// }));

// jest.mock("gsap/ScrollTrigger", () => ({
//   ScrollTrigger: {},
// }));


// import { render, screen, fireEvent, cleanup } from "@testing-library/react";
// import ProjectsGallery from "@/features/projectsGallery/ProjectsGallery";
// import { projects } from "@/entities/project/projects.data";
// import * as animateModule from "@/features/projectsGallery/projectsAnimation";

// beforeAll(() => {
//   Object.defineProperty(window, "matchMedia", {
//     writable: true,
//     value: jest.fn().mockImplementation((query) => ({
//       matches: false,
//       media: query,
//       onchange: null,
//       addListener: jest.fn(), // deprecated
//       removeListener: jest.fn(), // deprecated
//       addEventListener: jest.fn(),
//       removeEventListener: jest.fn(),
//       dispatchEvent: jest.fn(),
//     })),
//   });
// });

// describe("ProjectsGallery component", () => {
//   const animateSpy = jest.spyOn(animateModule, "animateProjectsGallery");

//   afterEach(() => {
//     jest.clearAllMocks();
//     cleanup();
//   });

//   test("renders section, title and all project cards", () => {
//     render(<ProjectsGallery />);

//     // Заголовок
//     expect(screen.getByText("projects.section.title")).toBeInTheDocument();

//     // Все карточки рендерятся
//     projects.forEach((project) => {
//       expect(screen.getByTestId(`card-${project.id}`)).toBeInTheDocument();
//     });

//     // useEffect → анимация вызывается один раз
//     expect(animateSpy).toHaveBeenCalledTimes(1);
//   });

//   test("opens modal with correct project on card click", () => {
//     render(<ProjectsGallery />);

//     const firstProject = projects[0];

//     const cardButton = screen.getByTestId(`card-${firstProject.id}`);
//     fireEvent.click(cardButton);

//     const modal = screen.getByTestId("modal");
//     expect(modal).toBeInTheDocument();

//     // Проверяем, что modal содержит titleKey выбранного проекта
//     expect(modal).toHaveTextContent(firstProject.titleKey);
//   });

//   test("closes modal when onClose is called", () => {
//     render(<ProjectsGallery />);

//     const firstProject = projects[0];

//     // открываем модалку
//     fireEvent.click(screen.getByTestId(`card-${firstProject.id}`));
//     const closeButton = screen.getByText("Close");

//     fireEvent.click(closeButton);

//     // Modal должна быть закрыта
//     expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
//   });

//   test("handles edge case: click on non-existing project id", () => {
//     render(<ProjectsGallery />);

//     // симулируем handleCardClick с несуществующим id
//     const instance = screen.getByTestId(`card-${projects[0].id}`);
//     fireEvent.click(instance);

//     // modal открывается с существующим проектом
//     expect(screen.getByTestId("modal")).toHaveTextContent(projects[0].titleKey);
//   });

//   test("cleanup function is returned from animateProjectsGallery", () => {
//     const cleanupMock = jest.fn();
//     animateSpy.mockReturnValue(cleanupMock);

//     const { unmount } = render(<ProjectsGallery />);
//     unmount();

//     expect(cleanupMock).toHaveBeenCalled();
//   });
// });