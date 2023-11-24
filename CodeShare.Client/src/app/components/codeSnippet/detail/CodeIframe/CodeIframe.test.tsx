import { render, screen } from "@testing-library/react";
import CodeIframe from "./CodeIframe";

describe("CodeIframe", () => {
  const defaultProps = {
    html: "<h1>Hello World</h1>",
    height: 500,
    scale: 1
  };

  it("renders iframe with correct srcDoc", () => {
    render(<CodeIframe {...defaultProps} />);
    const iframe = screen.getByTitle("C# Code Fragment");
    expect(iframe).toBeInTheDocument();
    expect(iframe.getAttribute("srcDoc")).toEqual(defaultProps.html);
  });
});
