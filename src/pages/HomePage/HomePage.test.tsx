import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

describe("Given a HomePage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading with 'Login to access your account' text", () => {
      const expectedHeadingText = "Login to access your account";

      render(<HomePage />);

      const textHeading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(textHeading).toBeInTheDocument();
    });

    test("Then it should show a button with 'Login via Github' text and alternative text image 'Github logo'", () => {
      const alternativeTextImage = "Github logo";
      const buttonText = `${alternativeTextImage} Login via Github`;

      render(<HomePage />);

      const textOnButton = screen.getByRole("button", { name: buttonText });
      const logoAltText = screen.getByAltText(alternativeTextImage);

      expect(textOnButton).toBeInTheDocument();
      expect(logoAltText).toBeInTheDocument();
    });
  });
});
