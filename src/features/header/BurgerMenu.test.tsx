jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // просто возвращаем ключ
    i18n: {
      resolvedLanguage: "en",
    },
  }),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import BurgerMenu from "./BurgerMenu";

describe("BurgerMenu", () => {
  it("renders links when open", () => {
    // Verify that navigation links are displayed when menu is open
    render(<BurgerMenu isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText("NAV.ABOUT")).toBeInTheDocument();
    expect(screen.getByText("NAV.SKILLS")).toBeInTheDocument();
  });

  it("does not render open class when closed", () => {
    // Ensure burger menu does not have open state class when closed
    const { container } = render(
      <BurgerMenu isOpen={false} onClose={jest.fn()} />
    );
    expect(container.firstChild).not.toHaveClass("burger--open");
  });

  it("calls onClose when clicking a link", () => {
    // Clicking any menu link should trigger the onClose callback
    const onClose = jest.fn();
    render(<BurgerMenu isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByText("NAV.ABOUT"));
    expect(onClose).toHaveBeenCalled();
  });

  it("renders language buttons", () => {
    // Verify that all language switch buttons are present
    render(<BurgerMenu isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ES" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "RU" })).toBeInTheDocument();
  });
});

