import { render, screen, fireEvent } from "@testing-library/react";

import LoadingButton from "./LoadingButton";

it("renders LoadingButton correctly", () => {
  render(
    <LoadingButton
      loading={false}
      buttonText="Click me"
      loadingText="Loading..."
    />
  );

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

it("shows loader and loading text when loading is true", () => {
  render(
    <LoadingButton
      loading={true}
      buttonText="Click me"
      loadingText="Loading..."
    />
  );

  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Loading...");
});

it("fires onClick handler when clicked and not loading", () => {
  const onClickMock = vi.fn();

  render(
    <LoadingButton
      loading={false}
      buttonText="Click me"
      loadingText="Loading..."
      onClick={onClickMock}
    />
  );

  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(onClickMock).toHaveBeenCalled();
});

it("does not fire onClick handler when clicked and loading", () => {
  const onClickMock = vi.fn();

  render(
    <LoadingButton
      loading={true}
      buttonText="Click me"
      loadingText="Loading..."
      onClick={onClickMock}
    />
  );

  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Loading...");

  fireEvent.click(button);
  expect(onClickMock).not.toHaveBeenCalled();
});
