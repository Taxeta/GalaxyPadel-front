import App from "../App/App";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Given a Header component inside App component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'Galaxy Padel'", () => {
      const appTitle = "Galaxy Padel";

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const textHeader = screen.getByRole("heading", { name: appTitle });

      expect(textHeader).toBeInTheDocument();
    });

    test("Then it should show a 'Galaxy Padel logo app' alternative text logo", () => {
      const alternativeLogoText = "Galaxy Padel logo app";

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const imageHeader = screen.getByAltText(alternativeLogoText);

      expect(imageHeader).toBeInTheDocument();
    });
  });
});
