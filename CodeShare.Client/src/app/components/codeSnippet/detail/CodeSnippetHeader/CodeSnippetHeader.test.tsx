import { render, screen } from "@testing-library/react";
import CodeSnippetHeader, {
  CodeSnippetHeaderDetails
} from "./CodeSnippetHeader";

describe("CodeSnippetHeader", () => {
  const defaultProps: CodeSnippetHeaderDetails = {
    id: "8c6a6ee9-1771-42a1-f322-08dbecc7d768",
    title: "My test title",
    author: "Alexander",
    createdAt: "2019-02-01T00:00:00.000Z"
  };

  it("renders title correctly", () => {
    render(<CodeSnippetHeader headerDetails={defaultProps} />);
    const title = screen.getByRole("heading", { name: defaultProps.title });
    expect(title).toBeInTheDocument();
  });

  it("renders author correctly", () => {
    render(<CodeSnippetHeader headerDetails={defaultProps} />);
    const author = screen.getByText(defaultProps.author!);
    expect(author).toBeInTheDocument();
  });

  it("renders unknown author when author is not provided", () => {
    const props = { ...defaultProps, author: undefined };
    render(<CodeSnippetHeader headerDetails={props} />);
    const author = screen.getByText("Unknown");
    expect(author).toBeInTheDocument();
  });

  it("renders created date correctly", () => {
    render(<CodeSnippetHeader headerDetails={defaultProps} />);
    const time = screen.getByTestId("time");
    expect(time.textContent).toEqual(
      new Date(defaultProps.createdAt!).toLocaleString()
    );
  });

  it("renders current date when created date is not provided", () => {
    const props = { ...defaultProps, createdAt: undefined };
    render(<CodeSnippetHeader headerDetails={props} />);

    const time = screen.getByTestId("time");
    expect(time).toBeInTheDocument();
    expect(isNaN(Date.parse(time.textContent!))).toBeFalsy();
  });
});
