import { render, screen, fireEvent } from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import ServerError, { ProblemDetails } from "./ServerError";

describe("ServerError component", () => {
  it("renders correctly with error.message", () => {
    const error = new Error("Test error");
    render(
      <Router>
        <ServerError error={error} />
      </Router>
    );
    expect(screen.getByText("Test error")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("displays unknown error if component can't find a error message", () => {
    const error = { hello: "Hello World!" };
    render(
      <Router>
        <ServerError error={error} />
      </Router>
    );
    expect(
      screen.getByText("Unknown error, something went wrong")
    ).toBeInTheDocument();
  });

  it("displays error message from response data when it matches ProblemDetails", () => {
    const error = {
      response: {
        data: {
          title: "Error title",
          status: 404,
          detail: "Error message"
        } as ProblemDetails
      }
    };
    render(
      <Router>
        <ServerError error={error} />
      </Router>
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("redirects to the correct route when 'Go back' link is clicked", () => {
    const error = new Error("Test error");
    render(
      <MemoryRouter initialEntries={["/error"]}>
        <Routes>
          <Route path="/error" element={<ServerError error={error} />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // confirm error is displayed
    expect(screen.getByText("Test error")).toBeInTheDocument();
    expect(screen.queryByText("Home Page")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Go back"));

    // confirm we are redirected and error is no longer in the document
    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.queryByText("Test error")).not.toBeInTheDocument();
  });
});
