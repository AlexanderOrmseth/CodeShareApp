import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CopyButton from "./CopyButton";

describe("CopyButton", () => {
  beforeAll(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: vi.fn(() => Promise.resolve())
      }
    });
  });

  it("renders CopyButton and copies data on click", async () => {
    const dataToCopy = "const string = 'hi'";
    const buttonText = "Copy";

    render(
      <CopyButton data={dataToCopy} buttonText={buttonText} Icon={undefined} />
    );

    const copyButton = screen.getByRole("button", { name: /Copy/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeInTheDocument();
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(dataToCopy);
  });
});
