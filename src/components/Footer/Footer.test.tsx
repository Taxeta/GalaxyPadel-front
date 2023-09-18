import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";

describe("Given a Footer component", () => {
  const user: Partial<User> = { displayName: "Arturo" };

  const authStateHookMock: Partial<AuthStateHook> = [user as User];

  auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
  describe("When it's rendered", () => {
    test("Then it should show the links 'Rackets' and 'Create'", () => {
      const homeLink = "Rackets";
      const createLink = "Create";

      render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>,
      );

      const navLinkHome = screen.getByRole("link", { name: homeLink });
      const navLinkCreate = screen.getByRole("link", { name: createLink });

      expect(navLinkHome).toBeInTheDocument();
      expect(navLinkCreate).toBeInTheDocument();
    });
  });

  describe("When it's rendered", () => {
    test("Then it should show the links 'Rackets' and 'Create'", () => {
      const footerText1 = "company";
      const footerText2 = "email";

      render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>,
      );

      const companyName = screen.getByLabelText(footerText1);
      const companyEmail = screen.getByLabelText(footerText2);

      expect(companyName).toBeInTheDocument();
      expect(companyEmail).toBeInTheDocument();
    });
  });
});
