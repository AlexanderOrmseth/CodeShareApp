import { render, fireEvent, screen } from "@testing-library/react";
import ScaleInput from "./ScaleInput";

describe("ScaleInput", () => {
  it("updates the scale when the input value changes", () => {
    const setScale = vi.fn();
    render(<ScaleInput scale={1} setScale={setScale} labelText="Test Label" />);

    const input = screen.getByLabelText("Test Label");

    fireEvent.change(input, { target: { value: 0.4 } });
    expect(setScale).toHaveBeenCalledWith(0.4);
  });

  it("displays the correct scale value", () => {
    const setScale = vi.fn();
    render(<ScaleInput scale={1} setScale={setScale} labelText="Test Label" />);
    expect(screen.getByText("1.0")).toBeInTheDocument();
  });
});
