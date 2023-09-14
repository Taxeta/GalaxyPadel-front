import { render, screen } from "@testing-library/react";
import FormPage from "./FormPage";
import React from "react";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { store } from "../../store";

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

      render(
        <Provider store={store}>
          <React.Suspense>
            <FormPage />
          </React.Suspense>
        </Provider>,
      );

      const title = screen.getByRole("heading", { name: pageTitle });

      expect(title).toBeInTheDocument();
    });
  });
});
