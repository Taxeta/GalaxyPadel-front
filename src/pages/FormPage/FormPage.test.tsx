import { render, screen } from "@testing-library/react";
import FormPage from "./FormPage";
import React from "react";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given a FormPage component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading with text 'Create your racket'", () => {
      const pageTitle = "Create your racket";
      const path = "/rackets";

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[path]}>
            <React.Suspense>
              <FormPage />
            </React.Suspense>
          </MemoryRouter>
        </Provider>,
      );

      const title = screen.getByRole("heading", { name: pageTitle });

      expect(title).toBeInTheDocument();
    });
  });
});
