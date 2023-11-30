import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import CodeSnippetForm from "./CodeSnippetForm";

describe("CodeSnippetForm", () => {
  it("renders form correctly", () => {
    render(
      <CodeSnippetForm
        createPreviewFn={vi.fn()}
        previewIsPending={false}
        submitFn={vi.fn()}
      />
    );

    expect(screen.getByText(/Create code snippet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Code/i)).toBeInTheDocument();
  });

  it("disables buttons when inputs are empty", () => {
    render(
      <CodeSnippetForm
        createPreviewFn={vi.fn()}
        previewIsPending={false}
        submitFn={vi.fn()}
      />
    );

    const previewButton = screen.getByRole("button", {
      name: /preview code snippet/i
    });
    const uploadButton = screen.getByRole("button", {
      name: /upload and share/i
    });
    expect(previewButton).toBeDisabled();
    expect(uploadButton).toBeDisabled();
  });

  it("enables buttons when code input has more than 10 characters and is able to call submit with correct values", async () => {
    const submitFn = vi.fn();
    const createPreviewFn = vi.fn();

    render(
      <CodeSnippetForm
        createPreviewFn={createPreviewFn}
        previewIsPending={false}
        submitFn={submitFn}
      />
    );

    const codeInput = screen.getByLabelText(/Code/i);
    fireEvent.input(codeInput, { target: { value: "1234567890" } });

    const previewButton = screen.getByRole("button", {
      name: /preview code snippet/i
    });
    const uploadButton = screen.getByRole("button", {
      name: /upload and share/i
    });

    // Wait for the validation to update
    await waitFor(() => {
      expect(previewButton).toBeEnabled();
      expect(uploadButton).toBeEnabled();
      fireEvent.submit(uploadButton);
    });

    expect(submitFn).toHaveBeenCalledOnce();
    expect(submitFn).toHaveBeenCalledWith({
      title: "",
      author: "",
      code: "1234567890"
    });
  });
});
