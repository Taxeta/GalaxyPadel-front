import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe("Given a App component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'Galaxy Padel' title", () => {
      const appTitle = "Galaxy Padel";

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const textHeader = screen.getByRole("heading", { name: appTitle });

      expect(textHeader).toBeInTheDocument();
    });
  });
});
