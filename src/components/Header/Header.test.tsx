import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";

const user: Partial<User> = { displayName: "Arturo" };

const authStateHookMock: Partial<AuthStateHook> = [user as User];

auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

const renderFunction = () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
  );
};

describe("Given a Header component inside App component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'Galaxy Padel' title", () => {
      const appTitle = "Galaxy Padel";

      renderFunction();

      const textHeader = screen.getByRole("heading", { name: appTitle });

      expect(textHeader).toBeInTheDocument();
    });

    test("Then it should show a 'Galaxy Padel logo app' alternative text logo", () => {
      const alternativeLogoText = "Galaxy Padel logo app";

      renderFunction();

      const imageHeader = screen.getByAltText(alternativeLogoText);

      expect(imageHeader).toBeInTheDocument();
    });

    test("Then it should show a 'Exit icon' alternative text logo", () => {
      const alternativeLogoText = "Exit icon";

      renderFunction();

      const imageHeader = screen.getByAltText(alternativeLogoText);

      expect(imageHeader).toBeInTheDocument();
    });
  });
});

describe("Given a Header component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a exit image inside a button", () => {
      const buttonText = "exit";

      renderFunction();

      const button = screen.getByLabelText(buttonText);

      expect(button).toBeInTheDocument();
    });
  });
});
