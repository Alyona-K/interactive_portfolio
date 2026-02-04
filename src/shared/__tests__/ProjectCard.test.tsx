import { render, screen, fireEvent } from "@testing-library/react";
import ProjectCard from "@/shared/ui/ProjectCard";

// --- MOCK i18n HOOK ---
// Provide translation keys for predictable test outputs
jest.mock("react-i18next", () => ({
  useTranslation: (ns?: string) => ({
    t: (key: string) => `${ns}-${key}`,
  }),
}));

// --- TEST DATA ---
const baseProps = {
  id: "project-1",
  titleKey: "projects.myProject",
  altKey: "projects.myProjectAlt",
  image: {
    mobile: "/img/mobile.jpg",
    mobile2x: "/img/mobile@2x.jpg",
    tablet: "/img/tablet.jpg",
    tablet2x: "/img/tablet@2x.jpg",
    desktop: "/img/desktop.jpg",
    desktop2x: "/img/desktop@2x.jpg",
  },
};

describe("ProjectCard", () => {
  // --- TITLE RENDER ---
  it("renders project title using i18n key", () => {
    render(<ProjectCard {...baseProps} />);
    // Verifies title uses translation key with namespace
    expect(screen.getByText("projects-projects.myProject")).toBeInTheDocument();
  });

  // --- IMAGE ALT TEXT ---
  it("renders image with translated alt text", () => {
    render(<ProjectCard {...baseProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "projects-projects.myProjectAlt");
  });

  it("uses default alt when altKey is not provided", () => {
    render(<ProjectCard {...baseProps} altKey={undefined} />);
    const img = screen.getByRole("img");
    // Should fallback to default alt if altKey missing
    expect(img).toHaveAttribute("alt", "projects-defaultAlt");
  });

  // --- VIEW CURSOR INTERACTIONS ---
  it("shows view cursor on mouse enter", () => {
    render(<ProjectCard {...baseProps} />);
    const card = screen.getByRole("img").closest(".project-card");

    expect(card).toBeTruthy();

    // Simulate hover to show "view" cursor
    fireEvent.mouseEnter(card!);
    expect(screen.getByText("common-buttons.view")).toBeInTheDocument();
  });

  it("hides view cursor on mouse leave", () => {
    render(<ProjectCard {...baseProps} />);
    const card = screen.getByRole("img").closest(".project-card")!;

    fireEvent.mouseEnter(card);
    expect(screen.getByText("common-buttons.view")).toBeInTheDocument();

    // Cursor should disappear when mouse leaves
    fireEvent.mouseLeave(card);
    expect(screen.queryByText("common-buttons.view")).not.toBeInTheDocument();
  });

  // --- CLICK HANDLER ---
  it("calls onClick handler when card is clicked", () => {
    const onClick = jest.fn();
    render(<ProjectCard {...baseProps} onClick={onClick} />);

    const card = screen.getByRole("img").closest(".project-card")!;
    fireEvent.click(card);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not crash when clicked without onClick", () => {
    render(<ProjectCard {...baseProps} />);
    const card = screen.getByRole("img").closest(".project-card")!;
    // Ensure component is safe to click without handler
    fireEvent.click(card);
  });
});


//-------

// import { render, screen, fireEvent } from "@testing-library/react";
// import ProjectCard from "@/shared/ui/ProjectCard";

// // Мокаем react-i18next
// jest.mock("react-i18next", () => ({
//   useTranslation: (ns?: string) => ({
//     t: (key: string) => `${ns}-${key}`,
//   }),
// }));

// // ---- Test data ----
// const baseProps = {
//   id: "project-1",
//   titleKey: "projects.myProject",
//   altKey: "projects.myProjectAlt",
//   image: {
//     mobile: "/img/mobile.jpg",
//     mobile2x: "/img/mobile@2x.jpg",
//     tablet: "/img/tablet.jpg",
//     tablet2x: "/img/tablet@2x.jpg",
//     desktop: "/img/desktop.jpg",
//     desktop2x: "/img/desktop@2x.jpg",
//   },
// };

// describe("ProjectCard", () => {

//   it("renders project title using i18n key", () => {
//     render(<ProjectCard {...baseProps} />);

//     expect(screen.getByText("projects-projects.myProject")).toBeInTheDocument();
//   });

//   it("renders image with translated alt text", () => {
//     render(<ProjectCard {...baseProps} />);

//     const img = screen.getByRole("img");
//     expect(img).toHaveAttribute("alt", "projects-projects.myProjectAlt");
//   });

//   it("uses default alt when altKey is not provided", () => {
//     render(<ProjectCard {...baseProps} altKey={undefined} />);

//     const img = screen.getByRole("img");
//     expect(img).toHaveAttribute("alt", "projects-defaultAlt");
//   });

//   it("shows view cursor on mouse enter", () => {
//     render(<ProjectCard {...baseProps} />);

//     const card = screen.getByRole("img").closest(".project-card");

//     expect(card).toBeTruthy();

//     fireEvent.mouseEnter(card!);

//     expect(screen.getByText("common-buttons.view")).toBeInTheDocument();
//   });

//   it("hides view cursor on mouse leave", () => {
//     render(<ProjectCard {...baseProps} />);

//     const card = screen.getByRole("img").closest(".project-card")!;

//     fireEvent.mouseEnter(card);

//     expect(screen.getByText("common-buttons.view")).toBeInTheDocument();

//     fireEvent.mouseLeave(card);

//     expect(screen.queryByText("common-buttons.view")).not.toBeInTheDocument();
//   });

//   it("calls onClick handler when card is clicked", () => {
//     const onClick = jest.fn();

//     render(<ProjectCard {...baseProps} onClick={onClick} />);

//     const card = screen.getByRole("img").closest(".project-card")!;

//     fireEvent.click(card);

//     expect(onClick).toHaveBeenCalledTimes(1);
//   });

//   it("does not crash when clicked without onClick", () => {
//   render(<ProjectCard {...baseProps} />);
//   const card = screen.getByRole("img").closest(".project-card")!;
//   fireEvent.click(card);
// });
// });
