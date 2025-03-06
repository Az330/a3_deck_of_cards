import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Deck of Cards title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Deck of Cards/i);
  expect(linkElement).toBeInTheDocument();
});
