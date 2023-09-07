import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";

describe("Given a HomePage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading with 'Login to access your account' text", () => {
      const expectedHeadingText = "Login to access your account";

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const textHeading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(textHeading).toBeInTheDocument();
    });

    test("Then it should show a button with 'Login via Github' text and alternative text image 'Github logo'", () => {
      const authStateHookMock: Partial<AuthStateHook> = [undefined];

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const alternativeTextImage = "Github logo";
      const buttonText = `${alternativeTextImage} Login via Github`;

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const textOnButton = screen.getByRole("button", { name: buttonText });
      const logoAltText = screen.getByAltText(alternativeTextImage);

      expect(textOnButton).toBeInTheDocument();
      expect(logoAltText).toBeInTheDocument();
    });
  });
});

describe("Given a HomePage component", () => {
  describe("When it's rendered and user is logged", () => {
    test("Then it should show a feedback with text 'Welcome Arturo'", async () => {
      const user: Partial<User> = { displayName: "Arturo" };
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const initialText = "Welcome Arturo";

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const feedbackText = await screen.getByText(initialText);

      expect(feedbackText).toBeInTheDocument();
    });
  });
});
