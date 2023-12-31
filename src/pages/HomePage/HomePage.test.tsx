import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";

describe("Given a HomePage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading with 'Login to access your account' text", () => {
      const expectedHeadingText = "Login to access your account";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </Provider>,
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
        <Provider store={store}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </Provider>,
      );

      const textOnButton = screen.getByRole("button", { name: buttonText });
      const logoAltText = screen.getByAltText(alternativeTextImage);

      expect(textOnButton).toBeInTheDocument();
      expect(logoAltText).toBeInTheDocument();
    });
  });
});
