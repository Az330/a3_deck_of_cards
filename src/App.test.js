/*
 * I, Abdulaziz Haybe, 000916530, certify that this material is my original work.
 * No other person's work has been used without due acknowledgement.
 */

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Deck of Cards title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Deck of Cards/i);
  expect(linkElement).toBeInTheDocument();
});
