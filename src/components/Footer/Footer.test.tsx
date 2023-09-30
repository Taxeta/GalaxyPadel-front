import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import userEvent from "@testing-library/user-event";

const mockScrollTop = vi.fn();

beforeEach(() => {
  window.scrollTo = mockScrollTop;
});

afterEach(() => {
  mockScrollTop.mockReset();
});

describe("Given a Footer component", () => {
  const user: Partial<User> = { displayName: "Arturo" };

  const authStateHookMock: Partial<AuthStateHook> = [user as User];

  auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
  describe("When it's rendered", () => {
    test("Then it should show the links 'Rackets' and 'Create'", async () => {
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

      await userEvent.click(navLinkHome);

      expect(mockScrollTop).toHaveBeenCalledTimes(1);
    });
  });

  describe("When it's rendered", () => {
    test("Then it should show the links 'Rackets' and 'Create'", () => {
      const footerTextName = "Galaxy Padel S.L.";
      const footerTextEmail = "galaxypadel@gmail.com";
      const footerTextAdress = "Av/ Diagonal 167, Bcn";
      const footerTextPhone = "+34 665403563";

      render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>,
      );

      const companyName = screen.getByText(footerTextName);
      const companyEmail = screen.getByText(footerTextEmail);
      const companyAdress = screen.getByText(footerTextAdress);
      const companyPhone = screen.getByText(footerTextPhone);

      expect(companyName).toBeInTheDocument();
      expect(companyEmail).toBeInTheDocument();
      expect(companyAdress).toBeInTheDocument();
      expect(companyPhone).toBeInTheDocument();
    });
  });
});
