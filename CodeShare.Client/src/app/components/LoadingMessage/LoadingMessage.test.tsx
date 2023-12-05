import { render, screen } from "@testing-library/react";
import LoadingMessage from "./LoadingMessage";

describe("LoadingMessage", () => {
  it("renders correctly", () => {
    render(<LoadingMessage message="Loading" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
  it("renders with given message and loading icon", async () => {
    render(<LoadingMessage message="Loading" />);
    expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
