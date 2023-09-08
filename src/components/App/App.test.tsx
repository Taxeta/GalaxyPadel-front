import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";
import paths from "../../paths/paths";
import authHook, { AuthStateHook } from "react-firebase-hooks/auth";
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";

vi.mock("firebase/auth");

describe("Given a App component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'Galaxy Padel' title", () => {
      const appTitle = "Galaxy Padel";

      const user: Partial<User> = {
        displayName: "Arturo",
      };

      const hookMock: Partial<AuthStateHook> = [user as User];
      authHook.useAuthState = vi.fn().mockReturnValue(hookMock);

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const textHeader = screen.getByRole("heading", { name: appTitle });

      expect(textHeader).toBeInTheDocument();
    });
  });

  describe("When login button is clicked", () => {
    test("Then it should show 'Padel Professional Rackets' on heading", async () => {
      const buttonText = "Github logo Login via Github";
      const headingText = "Login to access your account";

      const route = paths.home;
      const authStateHookMock: Partial<AuthStateHook> = [null as null];

      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>,
      );

      const loginButton = screen.getByRole("button", { name: buttonText });
      await userEvent.click(loginButton);

      waitFor(() => {
        const heading = screen.getByRole("heading", { name: headingText });

        expect(heading).toBeInTheDocument();
      });
    });
  });
});
