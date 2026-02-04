import { render, screen, fireEvent, act } from "@testing-library/react";
import DownloadDropdown from "@/shared/ui/DownloadDropdown";

// --- USE FAKE TIMERS FOR ANIMATION TESTS ---
// Animations rely on setTimeout; fake timers allow precise control
jest.useFakeTimers();

const options = [
  { label: "CV EN", href: "/cv-en.pdf" },
  { label: "CV ES", href: "/cv-es.pdf" },
];

describe("DownloadDropdown", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  // --- RENDER BUTTON LABEL ---  
  it("renders button with label", () => {
    render(<DownloadDropdown label="Download CV" options={options} />);
    expect(screen.getByText("Download CV")).toBeInTheDocument();
  });

  // --- MENU IS CLOSED BY DEFAULT ---  
  it("does not show menu by default", () => {
    render(<DownloadDropdown label="Download CV" options={options} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  // --- OPEN MENU ON BUTTON CLICK ---  
  it("opens menu on button click", () => {
    render(<DownloadDropdown label="Download CV" options={options} />);
    fireEvent.click(screen.getByText("Download CV"));
    const menu = screen.getByRole("list");
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveClass("open");
  });

  // --- VERIFY MENU OPTIONS AND LINKS ---  
  it("renders all options with correct hrefs", () => {
    render(<DownloadDropdown label="Download CV" options={options} />);
    fireEvent.click(screen.getByText("Download CV"));
    const link1 = screen.getByText("CV EN");
    const link2 = screen.getByText("CV ES");
    expect(link1).toHaveAttribute("href", "/cv-en.pdf");
    expect(link2).toHaveAttribute("href", "/cv-es.pdf");
  });

  // --- CLOSE MENU WITH ANIMATION ON SECOND CLICK ---  
  it("closes menu on second button click with animation", () => {
    render(<DownloadDropdown label="Download CV" options={options} />);
    const button = screen.getByText("Download CV");
    fireEvent.click(button);
    fireEvent.click(button);

    // Menu should start closing animation
    const menu = screen.getByRole("list");
    expect(menu).toHaveClass("closing");

    // Fast-forward animation duration
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  // --- CLOSE MENU WHEN CLICKING OUTSIDE ---  
  it("closes menu when clicking outside", () => {
    render(
      <>
        <DownloadDropdown label="Download CV" options={options} />
        <div data-testid="outside">Outside</div>
      </>
    );

    fireEvent.click(screen.getByText("Download CV"));
    const menu = screen.getByRole("list");
    expect(menu).toBeInTheDocument();

    // Simulate click outside to trigger menu close
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(menu).toHaveClass("closing");

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  // --- CUSTOM CLASSNAME APPLIED TO ROOT ---  
  it("applies custom className to root div", () => {
    render(
      <DownloadDropdown
        label="Download CV"
        options={options}
        className="my-dropdown"
      />
    );
    const root = screen.getByText("Download CV").closest("div");
    expect(root).toHaveClass("download-dropdown");
    expect(root).toHaveClass("my-dropdown");
  });

  // --- HANDLES EMPTY OPTIONS ARRAY ---  
  it("handles empty options array", () => {
    render(<DownloadDropdown label="Download CV" options={[]} />);
    fireEvent.click(screen.getByText("Download CV"));
    const menu = screen.getByRole("list");
    expect(menu).toBeInTheDocument();
    expect(menu.children.length).toBe(0);
  });
});


//----------

// import { render, screen, fireEvent, act } from "@testing-library/react";
// import DownloadDropdown from "@/shared/ui/DownloadDropdown";

// // Fake timers нужны для setTimeout
// jest.useFakeTimers();

// const options = [
//   { label: "CV EN", href: "/cv-en.pdf" },
//   { label: "CV ES", href: "/cv-es.pdf" },
// ];

// describe("DownloadDropdown", () => {
//   afterEach(() => {
//     jest.clearAllTimers();
//   });

//   it("renders button with label", () => {
//     render(<DownloadDropdown label="Download CV" options={options} />);
//     expect(screen.getByText("Download CV")).toBeInTheDocument();
//   });

//   it("does not show menu by default", () => {
//     render(<DownloadDropdown label="Download CV" options={options} />);
//     expect(screen.queryByRole("list")).not.toBeInTheDocument();
//   });

//   it("opens menu on button click", () => {
//     render(<DownloadDropdown label="Download CV" options={options} />);
//     fireEvent.click(screen.getByText("Download CV"));
//     const menu = screen.getByRole("list");
//     expect(menu).toBeInTheDocument();
//     expect(menu).toHaveClass("open");
//   });

//   it("renders all options with correct hrefs", () => {
//     render(<DownloadDropdown label="Download CV" options={options} />);
//     fireEvent.click(screen.getByText("Download CV"));
//     const link1 = screen.getByText("CV EN");
//     const link2 = screen.getByText("CV ES");
//     expect(link1).toHaveAttribute("href", "/cv-en.pdf");
//     expect(link2).toHaveAttribute("href", "/cv-es.pdf");
//   });

//   it("closes menu on second button click with animation", () => {
//     render(<DownloadDropdown label="Download CV" options={options} />);
//     const button = screen.getByText("Download CV");
//     fireEvent.click(button);
//     fireEvent.click(button);

//     const menu = screen.getByRole("list");
//     expect(menu).toHaveClass("closing");
//     act(() => {
//       jest.advanceTimersByTime(300);
//     });
//     expect(screen.queryByRole("list")).not.toBeInTheDocument();
//   });

//   it("closes menu when clicking outside", () => {
//     render(
//       <>
//         <DownloadDropdown label="Download CV" options={options} />
//         <div data-testid="outside">Outside</div>
//       </>
//     );

//     fireEvent.click(screen.getByText("Download CV"));
//     const menu = screen.getByRole("list");
//     expect(menu).toBeInTheDocument();

//     fireEvent.mouseDown(screen.getByTestId("outside"));
//     expect(menu).toHaveClass("closing");

//     act(() => {
//       jest.advanceTimersByTime(300);
//     });
//     expect(screen.queryByRole("list")).not.toBeInTheDocument();
//   });

//   it("applies custom className to root div", () => {
//     render(
//       <DownloadDropdown
//         label="Download CV"
//         options={options}
//         className="my-dropdown"
//       />
//     );
//     const root = screen.getByText("Download CV").closest("div");
//     expect(root).toHaveClass("download-dropdown");
//     expect(root).toHaveClass("my-dropdown");
//   });

//   it("handles empty options array", () => {
//     render(<DownloadDropdown label="Download CV" options={[]} />);
//     fireEvent.click(screen.getByText("Download CV"));
//     const menu = screen.getByRole("list");
//     expect(menu).toBeInTheDocument();
//     expect(menu.children.length).toBe(0);
//   });
// });
