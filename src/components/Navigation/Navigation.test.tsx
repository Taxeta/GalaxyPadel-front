import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { BrowserRouter } from "react-router-dom";

describe("Given a Navigation component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the links 'Home' and 'Create'", () => {
      const homeLink = "Rackets";
      const createLink = "Create";

      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>,
      );

      const navLinkHome = screen.getByRole("link", { name: homeLink });
      const navLinkCreate = screen.getByRole("link", { name: createLink });

      expect(navLinkHome).toBeInTheDocument();
      expect(navLinkCreate).toBeInTheDocument();
    });
  });
});
