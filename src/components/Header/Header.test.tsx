import App from "../App/App";
import Header from "./Header";
import { render, screen } from "@testing-library/react";

describe("Given a Header component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'Galaxy Padel'", () => {
      const appTitle = "Galaxy Padel";

      render(<App />);

      const textHeader = screen.getByRole("heading", { name: appTitle });

      expect(textHeader).toBeInTheDocument();
    });

    test("Then it should show a 'Galaxy Padel logo app' alternative text logo", () => {
      const alternativeLogoText = "Galaxy Padel logo app";

      render(<Header />);

      const imageHeader = screen.getByAltText(alternativeLogoText);

      expect(imageHeader).toBeInTheDocument();
    });
  });
});
