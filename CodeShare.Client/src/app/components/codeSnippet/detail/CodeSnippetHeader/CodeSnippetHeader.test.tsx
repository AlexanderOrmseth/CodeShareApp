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
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe(defaultProps.title);
  });

  it("renders author correctly", () => {
    render(<CodeSnippetHeader headerDetails={defaultProps} />);
    const author = screen.getByTestId("createdBy");
    expect(author).toBeInTheDocument();
    expect(author.textContent).toContain(defaultProps.author);
  });

  it("renders unknown author when author is not provided", () => {
    const props = { ...defaultProps, author: undefined };
    render(<CodeSnippetHeader headerDetails={props} />);
    const author = screen.getByTestId("createdBy");
    expect(author).toBeInTheDocument();
    expect(author.textContent).toContain("Unknown");
  });

  it("renders created date correctly", () => {
    render(<CodeSnippetHeader headerDetails={defaultProps} />);
    const time = screen.getByTestId("time");
    expect(time).toBeInTheDocument();
    expect(time.textContent).toEqual(
      new Date(defaultProps.createdAt!).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    );
  });

  it("renders current date when created date is not provided", () => {
    const props = { ...defaultProps, createdAt: undefined };
    render(<CodeSnippetHeader headerDetails={props} />);

    const time = screen.getByTestId("time");
    expect(time).toBeInTheDocument();

    const currentFormattedTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    expect(time.textContent).toEqual(currentFormattedTime);
  });
});
