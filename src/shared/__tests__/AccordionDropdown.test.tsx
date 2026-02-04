// --- MOCKS ---
// Portal mock to render children directly
jest.mock("@/shared/ui/Portal", () => ({
  Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock i18next translation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: any) => {
      if (opts?.returnObjects) return ["Item 1", "Item 2"];
      return key;
    },
  }),
}));

// Mock framer-motion to simplify tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

import { render, screen, fireEvent } from "@testing-library/react";
import { AccordionDropdown } from "@/shared/ui/AccordionDropdown";

describe("AccordionDropdown", () => {
  const items = [
    { id: "1", titleKey: "Title 1", contentKey: "content1" },
    { id: "2", titleKey: "Title 2", contentKey: "content2" },
  ];

  test("renders root items", () => {
    render(<AccordionDropdown items={items} level={1} />);
    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Title 2")).toBeInTheDocument();
  });

  // --- TEST SINGLE OPEN MODE ---
  test("toggles root items open/close (single mode)", () => {
    render(<AccordionDropdown items={items} level={1} multiple={false} />);

    const btn1 = screen.getByTestId("1-toggle");
    const btn2 = screen.getByTestId("2-toggle");

    // open first item
    fireEvent.click(btn1);
    expect(btn1).toHaveClass("open");
    expect(screen.getByTestId("1-content")).toBeInTheDocument();

    // open second → first closes
    fireEvent.click(btn2);
    expect(btn2).toHaveClass("open");
    expect(btn1).not.toHaveClass("open");
    expect(screen.queryByTestId("1-content")).toBeNull();

    // check nested content is rendered correctly
    const listItems = screen.getAllByRole("listitem").map(li => li.textContent);
    expect(listItems).toEqual(["Item 1", "Item 2"]);
  });

  test("toggles nested item (level > 1)", () => {
    const nestedItems = [
      {
        id: "1",
        titleKey: "Title 1",
        contentKey: "content1",
        children: [
          {
            id: "1-1",
            titleKey: "Nested 1",
            contentKey: "nestedContent1",
          },
        ],
      },
    ];

    render(<AccordionDropdown items={nestedItems} level={2} multiple={false} />);

    const btn = screen.getByText("Title 1");
    fireEvent.click(btn);

    // check nested list content
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Nested 1")).toBeInTheDocument();
  });

  // --- TEST MULTIPLE OPEN MODE ---
  test("respects multiple open", () => {
    render(<AccordionDropdown items={items} level={1} multiple />);

    fireEvent.click(screen.getByTestId("1-toggle"));
    fireEvent.click(screen.getByTestId("2-toggle"));

    // both items should be open
    expect(screen.getByTestId("1-content")).toBeInTheDocument();
    expect(screen.getByTestId("2-content")).toBeInTheDocument();
  });

  test("calls onToggle for root with external control", () => {
    const onToggleMock = jest.fn();

    render(<AccordionDropdown items={items} level={1} onToggle={onToggleMock} />);

    fireEvent.click(screen.getByTestId("1-toggle"));
    fireEvent.click(screen.getByTestId("2-toggle"));

    expect(onToggleMock).toHaveBeenCalledTimes(2);
  });
});





//------

// // --- Мокаем Portal, чтобы просто рендерить детей ---
// jest.mock("@/shared/ui/Portal", () => ({
//   Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
// }));

// // --- Мокаем react-i18next ---
// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key: string, opts?: any) => {
//       if (opts?.returnObjects) return ["Item 1", "Item 2"];
//       return key;
//     },
//   }),
// }));

// jest.mock("framer-motion", () => ({
//   motion: {
//     div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//   },
//   AnimatePresence: ({ children }: any) => <>{children}</>,
// }));

// import { render, screen, fireEvent } from "@testing-library/react";
// import { AccordionDropdown } from "@/shared/ui/AccordionDropdown";

// describe("AccordionDropdown", () => {
//   const items = [
//     { id: "1", titleKey: "Title 1", contentKey: "content1" },
//     { id: "2", titleKey: "Title 2", contentKey: "content2" },
//   ];

//   test("renders root items", () => {
//     render(<AccordionDropdown items={items} level={1} />);

//     // Проверяем, что кнопки с ключами есть
//     expect(screen.getByText("Title 1")).toBeInTheDocument();
//     expect(screen.getByText("Title 2")).toBeInTheDocument();
//   });

//   test("toggles root items open/close (single mode)", () => {
//     render(<AccordionDropdown items={items} level={1} multiple={false} />);

//     const btn1 = screen.getByTestId("1-toggle");
//     const btn2 = screen.getByTestId("2-toggle");

//     // открываем первый
//     fireEvent.click(btn1);
//     expect(btn1).toHaveClass("open");
//     expect(screen.getByTestId("1-content")).toBeInTheDocument();

//     // открываем второй, первый должен закрыться
//     fireEvent.click(btn2);
//     expect(btn2).toHaveClass("open");
//     expect(btn1).not.toHaveClass("open");
//     expect(screen.queryByTestId("1-content")).toBeNull();

//     // проверяем содержимое второго
//     const listItems = screen.getAllByRole("listitem").map(li => li.textContent);
//     expect(listItems).toEqual(["Item 1", "Item 2"]);
//   });

//   test("toggles nested item (level > 1)", () => {
//     const nestedItems = [
//       {
//         id: "1",
//         titleKey: "Title 1",
//         contentKey: "content1",
//         children: [
//           {
//             id: "1-1",
//             titleKey: "Nested 1",
//             contentKey: "nestedContent1",
//           },
//         ],
//       },
//     ];

//     render(<AccordionDropdown items={nestedItems} level={2} multiple={false} />);

//     const btn = screen.getByText("Title 1");
//     fireEvent.click(btn);

//     // Nested уровень не имеет data-testid, ищем по тексту
//     expect(screen.getByText("Item 1")).toBeInTheDocument();
//     expect(screen.getByText("Item 2")).toBeInTheDocument();

//     // Проверяем, что вложенная кнопка тоже есть
//     expect(screen.getByText("Nested 1")).toBeInTheDocument();
//   });

//   test("respects multiple open", () => {
//     render(<AccordionDropdown items={items} level={1} multiple />);

//     fireEvent.click(screen.getByTestId("1-toggle"));
//     fireEvent.click(screen.getByTestId("2-toggle"));

//     // Оба открыты
//     expect(screen.getByTestId("1-content")).toBeInTheDocument();
//     expect(screen.getByTestId("2-content")).toBeInTheDocument();
//   });

//   test("calls onToggle for root with external control", () => {
//     const onToggleMock = jest.fn();

//     render(<AccordionDropdown items={items} level={1} onToggle={onToggleMock} />);

//     fireEvent.click(screen.getByTestId("1-toggle"));
//     fireEvent.click(screen.getByTestId("2-toggle"));

//     expect(onToggleMock).toHaveBeenCalledTimes(2);
//   });
// });
