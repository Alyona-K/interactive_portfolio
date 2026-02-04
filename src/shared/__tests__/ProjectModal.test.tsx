import React, { forwardRef, HTMLAttributes, Ref } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectConfig } from "@/entities/project/project.types";
import ProjectModal from "@/shared/ui/ProjectModal";

// --- MOCK i18n HOOK ---
// Provide predictable translations and returnObjects behavior for lists
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (options?.returnObjects) {
        if (key === "projects.whatIBuilt") return ["Item 1", "Item 2"];
        if (key === "projects.challenges") return [{ challenge: "Hard thing", solution: "Smart fix" }];
      }
      return key;
    },
  }),
}));

// --- MOCK framer-motion ---
// Avoid actual animations, render plain divs for motion.div
jest.mock("framer-motion", () => ({
  motion: {
    div: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
      (props: HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) => {
        const { children, ...rest } = props;
        return <div ref={ref} {...rest}>{children}</div>;
      }
    ),
  },
  cubicBezier: () => {},
}));

// --- TEST DATA ---
const mockProject: ProjectConfig = {
  id: "project-1",
  titleKey: "projects.title",
  modalTitleKey: "projects.modalTitle",
  overviewKey: "projects.overview",
  whatIBuiltKey: "projects.whatIBuilt",
  challengesKey: "projects.challenges",
  stackKey: "projects.stack",
  altKey: "projects.alt",
  modalImage: "/img/modal.jpg",
  image: { 
    mobile: "/img/mobile.jpg",
    mobile2x: "/img/mobile@2x.jpg",
    tablet: "/img/tablet.jpg",
    tablet2x: "/img/tablet@2x.jpg",
    desktop: "/img/desktop.jpg",
    desktop2x: "/img/desktop@2x.jpg",
  },
  links: [
    { label: "GitHub", url: "https://github.com", type: "github" },
    { label: "Live", url: "https://example.com", type: "demo" },
  ],
};

describe("ProjectModal", () => {
  // --- CLEANUP BODY STYLES ---
  afterEach(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  // --- CONDITIONAL RENDERING ---
  it("does not render when isOpen is false", () => {
    const { container } = render(
      <ProjectModal project={mockProject} isOpen={false} onClose={jest.fn()} />
    );
    // Modal should not exist in DOM when closed
    expect(container.firstChild).toBeNull();
  });

  it("does not render when project is null", () => {
    const { container } = render(
      <ProjectModal project={null} isOpen={true} onClose={jest.fn()} />
    );
    // Modal should not render without a project
    expect(container.firstChild).toBeNull();
  });

  // --- MODAL CONTENT ---
  it("renders modal content when open", () => {
    render(
      <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
    );
    expect(screen.getByText("projects.modalTitle")).toBeInTheDocument();
    expect(screen.getByText("projects.overview")).toBeInTheDocument();
  });

  // --- BODY SCROLL LOCK ---
  it("locks body scroll when opened", () => {
    render(
      <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("unlocks body scroll when unmounted", () => {
    const { unmount } = render(
      <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
    );
    unmount();
    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.paddingRight).toBe("");
  });

  // --- BACKDROP AND ESCAPE HANDLING ---
  it("calls onClose when backdrop is clicked", () => {
    const onClose = jest.fn();
    render(
      <ProjectModal project={mockProject} isOpen={true} onClose={onClose} />
    );
    // Clicking outside modal content triggers close
    fireEvent.click(screen.getByRole("img").closest(".project-modal__backdrop")!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when clicking inside modal", () => {
    const onClose = jest.fn();
    render(
      <ProjectModal project={mockProject} isOpen={true} onClose={onClose} />
    );
    // Clicking modal content should not trigger close
    fireEvent.click(screen.getByText("projects.modalTitle"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes on Escape key press", () => {
    const onClose = jest.fn();
    render(
      <ProjectModal project={mockProject} isOpen={true} onClose={onClose} />
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // --- IMAGE ALT LOGIC ---
  it("renders image with altKey when provided", () => {
    render(
      <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "projects.alt");
  });

  it("falls back to titleKey as alt when altKey is missing", () => {
    const projectWithoutAlt = { ...mockProject, altKey: undefined };
    render(
      <ProjectModal project={projectWithoutAlt} isOpen={true} onClose={jest.fn()} />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "projects.title");
  });

  // --- LIST CONTENT ---
  it("renders whatIBuilt list items", () => {
    render(
      <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders challenges with challenge and solution", () => {
    render(
      <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
    );
    expect(screen.getByText("Hard thing")).toBeInTheDocument();
    expect(screen.getByText("Smart fix")).toBeInTheDocument();
  });

  // --- PROJECT LINKS ---
  it("renders all project links with correct hrefs", () => {
    render(
      <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
    );
    const github = screen.getByText("GitHub");
    const live = screen.getByText("Live");
    expect(github).toHaveAttribute("href", "https://github.com");
    expect(live).toHaveAttribute("href", "https://example.com");
  });
});


//------------

// import React, { forwardRef, HTMLAttributes, Ref } from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { ProjectConfig } from "@/entities/project/project.types";
// import ProjectModal from "@/shared/ui/ProjectModal";

// // ---- i18n mock ----
// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key: string, options?: any) => {
//       if (options?.returnObjects) {
//         if (key === "projects.whatIBuilt") {
//           return ["Item 1", "Item 2"];
//         }
//         if (key === "projects.challenges") {
//           return [
//             { challenge: "Hard thing", solution: "Smart fix" },
//           ];
//         }
//       }
//       return key;
//     },
//   }),
// }));

// // ---- framer-motion mock ----
// jest.mock("framer-motion", () => ({
//   motion: {
//     div: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
//       (props: HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) => {
//         const { children, ...rest } = props;
//         return (
//           <div ref={ref} {...rest}>
//             {children}
//           </div>
//         );
//       }
//     ),
//   },
//   cubicBezier: () => {},
// }));

// // ---- Test data ----
// const mockProject: ProjectConfig = {
//   id: "project-1",
//   titleKey: "projects.title",
//   modalTitleKey: "projects.modalTitle",
//   overviewKey: "projects.overview",
//   whatIBuiltKey: "projects.whatIBuilt",
//   challengesKey: "projects.challenges",
//   stackKey: "projects.stack",
//   altKey: "projects.alt",
//   modalImage: "/img/modal.jpg",
//   image: { 
//     mobile: "/img/mobile.jpg",
//     mobile2x: "/img/mobile@2x.jpg",
//     tablet: "/img/tablet.jpg",
//     tablet2x: "/img/tablet@2x.jpg",
//     desktop: "/img/desktop.jpg",
//     desktop2x: "/img/desktop@2x.jpg",
//   },
//   links: [
//     { label: "GitHub", url: "https://github.com", type: "github" },
//     { label: "Live", url: "https://example.com", type: "demo" },
//   ],
// };

// describe("ProjectModal", () => {
//   afterEach(() => {
//     document.body.style.overflow = "";
//     document.body.style.paddingRight = "";
//   });

//   it("does not render when isOpen is false", () => {
//     const { container } = render(
//       <ProjectModal project={mockProject} isOpen={false} onClose={jest.fn()} />
//     );

//     expect(container.firstChild).toBeNull();
//   });

//   it("does not render when project is null", () => {
//     const { container } = render(
//       <ProjectModal project={null} isOpen={true} onClose={jest.fn()} />
//     );

//     expect(container.firstChild).toBeNull();
//   });

//   it("renders modal content when open", () => {
//     render(
//       <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
//     );

//     expect(screen.getByText("projects.modalTitle")).toBeInTheDocument();
//     expect(screen.getByText("projects.overview")).toBeInTheDocument();
//   });

//   it("locks body scroll when opened", () => {
//     render(
//       <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
//     );

//     expect(document.body.style.overflow).toBe("hidden");
//   });

//   it("unlocks body scroll when unmounted", () => {
//     const { unmount } = render(
//       <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
//     );

//     unmount();

//     expect(document.body.style.overflow).toBe("");
//     expect(document.body.style.paddingRight).toBe("");
//   });

//   it("calls onClose when backdrop is clicked", () => {
//     const onClose = jest.fn();

//     render(
//       <ProjectModal project={mockProject} isOpen={true} onClose={onClose} />
//     );

//     fireEvent.click(screen.getByRole("img").closest(".project-modal__backdrop")!);

//     expect(onClose).toHaveBeenCalledTimes(1);
//   });

//   it("does not close when clicking inside modal", () => {
//     const onClose = jest.fn();

//     render(
//       <ProjectModal project={mockProject} isOpen={true} onClose={onClose} />
//     );

//     fireEvent.click(screen.getByText("projects.modalTitle"));

//     expect(onClose).not.toHaveBeenCalled();
//   });

//   it("closes on Escape key press", () => {
//     const onClose = jest.fn();

//     render(
//       <ProjectModal project={mockProject} isOpen={true} onClose={onClose} />
//     );

//     fireEvent.keyDown(window, { key: "Escape" });

//     expect(onClose).toHaveBeenCalledTimes(1);
//   });

//   it("renders image with altKey when provided", () => {
//     render(
//       <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
//     );

//     const img = screen.getByRole("img");
//     expect(img).toHaveAttribute("alt", "projects.alt");
//   });

//   it("falls back to titleKey as alt when altKey is missing", () => {
//     const projectWithoutAlt = { ...mockProject, altKey: undefined };

//     render(
//       <ProjectModal
//         project={projectWithoutAlt}
//         isOpen={true}
//         onClose={jest.fn()}
//       />
//     );

//     const img = screen.getByRole("img");
//     expect(img).toHaveAttribute("alt", "projects.title");
//   });

//   it("renders whatIBuilt list items", () => {
//     render(
//       <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
//     );

//     expect(screen.getByText("Item 1")).toBeInTheDocument();
//     expect(screen.getByText("Item 2")).toBeInTheDocument();
//   });

//   it("renders challenges with challenge and solution", () => {
//     render(
//       <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
//     );

//     expect(screen.getByText("Hard thing")).toBeInTheDocument();
//     expect(screen.getByText("Smart fix")).toBeInTheDocument();
//   });

//   it("renders all project links with correct hrefs", () => {
//     render(
//       <ProjectModal project={mockProject} isOpen={true} onClose={jest.fn()} />
//     );

//     const github = screen.getByText("GitHub");
//     const live = screen.getByText("Live");

//     expect(github).toHaveAttribute("href", "https://github.com");
//     expect(live).toHaveAttribute("href", "https://example.com");
//   });
// });
