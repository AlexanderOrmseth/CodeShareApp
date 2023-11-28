import { render, screen } from "@testing-library/react";
import FormTextArea from "./FormTextArea";

describe("FormTextArea", () => {
  const mockRegister = {
    onChange: vi.fn(),
    onBlur: vi.fn(),
    name: "mock",
    ref: vi.fn()
  };

  it("renders the label correctly", () => {
    render(<FormTextArea label="Test Label" register={mockRegister} />);

    const label = screen.getByRole("textbox", { name: /Test Label/i });
    expect(label).toBeInTheDocument();
  });

  it("renders the required field correctly", () => {
    render(
      <FormTextArea
        label="Test Label"
        register={mockRegister}
        required={true}
      />
    );

    const requiredField = screen.getByRole("textbox", { name: /required/i });
    expect(requiredField).toBeInTheDocument();
  });

  it("renders the optional field correctly", () => {
    render(
      <FormTextArea
        label="Test Label"
        register={mockRegister}
        required={false}
      />
    );

    const optionalField = screen.getByRole("textbox", { name: /optional/i });
    expect(optionalField).toBeInTheDocument();
  });

  it("renders the error message when error prop is provided", () => {
    render(
      <FormTextArea
        label="Test Label"
        register={mockRegister}
        error={{ type: "test", message: "Test error" }}
      />
    );

    const errorMessage = screen.getByText("Test error");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.textContent).toBe("Test error");
  });
});
