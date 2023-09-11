import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";
import paths from "../../paths/paths";
import authHook, { AuthStateHook } from "react-firebase-hooks/auth";
import userEvent from "@testing-library/user-event";
import { Auth, User, signInWithPopup, signOut } from "firebase/auth";
import { Provider } from "react-redux";
import { store } from "../../store";

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock("firebase/auth", async () => {
  const actual: Auth = await vi.importActual("firebase/auth");
  return {
    ...actual,
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
  };
});

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

authHook.useIdToken = vi.fn().mockReturnValue([user]);

describe("Given a App component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'Galaxy Padel' title", () => {
      const appTitle = "Galaxy Padel";

      const user: Partial<User> = {
        displayName: "Arturo",
      };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>,
      );

      const textHeader = screen.getByRole("heading", { name: appTitle });

      expect(textHeader).toBeInTheDocument();
    });
  });

  describe("When login button is clicked", () => {
    test("Then it should show call login function", async () => {
      const buttonText = "Github logo Login via Github";
      const route = paths.home;

      const authStateHookMock: Partial<AuthStateHook> = [null as null];
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const loginButton = screen.getByRole("button", { name: buttonText });
      await userEvent.click(loginButton);

      expect(signInWithPopup).toHaveBeenCalled();
    });
  });

  describe("When the user clicks on the logout Button", () => {
    test("Then it should call logout function", async () => {
      const buttonText = "Exit icon";
      const route = paths.rackets;

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const logoutButton = screen.getByRole("button", { name: buttonText });
      await userEvent.click(logoutButton);

      expect(signOut).toHaveBeenCalled();
    });
  });

  describe("When the user is not logged", () => {
    test("Then it should show 'Login to access your account'", () => {
      const route = paths.rackets;
      const text = "Login to access your account";
      const authStateHookMock: Partial<AuthStateHook> = [null as null];
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const headingText = screen.getByRole("heading", { name: text });

      expect(headingText).toBeInTheDocument();
    });
  });

  describe("When the user is logged", () => {
    test("Then it should show 'Login to access your account'", () => {
      const route = paths.home;
      const text = "Padel Professional Rackets";
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const headingText = screen.getByRole("heading", { name: text });

      expect(headingText).toBeInTheDocument();
    });
  });
});
