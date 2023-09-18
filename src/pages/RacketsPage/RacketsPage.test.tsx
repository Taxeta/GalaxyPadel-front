import { render, screen } from "@testing-library/react";
import RacketsPage from "./RacketsPage";
import { Provider } from "react-redux";
import { setupStore, store } from "../../store";
import { User } from "firebase/auth";
import { racketsMock } from "../../mocks/racketsMock";
import React from "react";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

describe("Given a RacketsList component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading 'Padel Professional Rackets'", async () => {
      const textTitle = "Padel Professional Rackets";
      const store = setupStore({ racketsState: { rackets: racketsMock } });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <React.Suspense>
              <RacketsPage />
            </React.Suspense>
          </Provider>
        </BrowserRouter>,
      );

      const headingTitle = await screen.findByRole("heading", {
        name: textTitle,
      });

      expect(headingTitle).toBeInTheDocument();
    });
  });

  describe("When the delete icon button on the card with id 'Adidas Metalbone 3.2 id' is clicked", () => {
    test("Then it shouldn't show 'Adidas Metalbone 3.2' card", async () => {
      const textHeader = "Adidas Metalbone 3.2";
      const buttonText = "Adidas Metalbone 3.2 delete icon";

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue([user]);
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <Provider store={store}>
            <RacketsPage />
          </Provider>
        </BrowserRouter>,
      );

      const headingText = await screen.findByRole("heading", {
        name: textHeader,
      });
      const deleteButton = await screen.findAllByRole("button", {
        name: buttonText,
      });
      await userEvent.click(deleteButton[0]);

      expect(headingText).not.toBeInTheDocument();
    });
  });
});
