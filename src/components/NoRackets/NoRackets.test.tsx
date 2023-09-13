import { render, screen } from "@testing-library/react";
import NoRackets from "./NoRackets";
import { BrowserRouter } from "react-router-dom";

describe("Given a NoRackets component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading 'There are no rackets to show you can create one here'", () => {
      const headingText =
        "There are no rackets to show you can create one here";

      render(
        <BrowserRouter>
          <NoRackets />
        </BrowserRouter>,
      );

      const textTitle = screen.getByRole("heading", { name: headingText });

      expect(textTitle).toBeInTheDocument();
    });

    test("Then it should show a button with text 'create'", () => {
      const buttonText = "Create";

      render(
        <BrowserRouter>
          <NoRackets />
        </BrowserRouter>,
      );

      const link = screen.getByRole("link", { name: buttonText });

      expect(link).toBeInTheDocument();
    });
  });
});
