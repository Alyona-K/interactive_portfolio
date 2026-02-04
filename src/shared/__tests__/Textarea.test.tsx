import { render, screen, fireEvent } from "@testing-library/react";
import Textarea from "@shared/ui/Textarea";

describe("Textarea", () => {
  // --- RENDER WITHOUT LABEL ---
  test("renders without label", () => {
    render(<Textarea id="test-textarea" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();

    // Ensure no label is rendered
    expect(screen.queryByLabelText(/./)).toBeNull();
  });

  // --- RENDER WITH LABEL ---
  test("renders with label", () => {
    render(<Textarea id="test-textarea" label="Description" />);
    const label = screen.getByText("Description");
    const textarea = screen.getByLabelText("Description");

    expect(label).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
  });

  // --- CUSTOM CLASS NAMES ---
  test("applies custom class names", () => {
    render(
      <Textarea
        id="test-textarea"
        label="Notes"
        wrapperClassName="wrapper-custom"
        fieldClassName="field-custom"
        labelClassName="label-custom"
      />,
    );

    const wrapper = screen.getByRole("textbox").parentElement;
    const textarea = screen.getByRole("textbox");
    const label = screen.getByText("Notes");

    // Root wrapper should combine default and custom class
    expect(wrapper).toHaveClass("custom-textarea wrapper-custom");
    // Textarea field should combine default and custom class
    expect(textarea).toHaveClass("custom-textarea__field field-custom");
    // Label should combine default and custom class
    expect(label).toHaveClass("custom-textarea__label label-custom");
  });

  // --- VALUE, PLACEHOLDER, ONCHANGE HANDLING ---
  test("supports value, placeholder and onChange", () => {
    const handleChange = jest.fn();
    render(
      <Textarea
        id="test-textarea"
        value="initial"
        placeholder="Type here"
        onChange={handleChange}
      />,
    );

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    // Check controlled value and placeholder
    expect(textarea.value).toBe("initial");
    expect(textarea.placeholder).toBe("Type here");

    // Simulate user input and verify onChange called
    fireEvent.change(textarea, { target: { value: "updated" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
