import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../store";
import RacketsList from "./RacketsList";
import { myMockId3, racketsMock } from "../../mocks/racketsMock";
import { BrowserRouter } from "react-router-dom";
import { User } from "firebase/auth";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import userEvent from "@testing-library/user-event";

describe("Given a RacketsList component", () => {
  describe("When it's rendered", () => {
    test("Then it should show an image with the alternative text 'Adidas Metalbone 3.2 racket'", () => {
      const store = setupStore({ racketsState: { rackets: racketsMock } });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <RacketsList />
          </Provider>
        </BrowserRouter>,
      );

      racketsMock.forEach((racket) => {
        const racketImage = screen.getByRole("heading", { name: racket.name });

        expect(racketImage).toBeInTheDocument();
      });
    });
  });
});

describe("Given a RacketsList component", () => {
  describe("When it's rendered and the user click's on the empty button", () => {
    test("Then it should show the button filled in", async () => {
      const store = setupStore({ racketsState: { rackets: myMockId3 } });

      const altTextImage = "Fill favorite icon";
      const expectedAltTextImage = "Empty favorite icon";

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const authIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(authIdTokenHookMock);

      render(
        <BrowserRouter>
          <Provider store={store}>
            <RacketsList />
          </Provider>
        </BrowserRouter>,
      );

      const favoriteIcon = await screen.findByRole("button", {
        name: altTextImage,
      });

      await userEvent.click(favoriteIcon);

      const unfavoriteIcon = await screen.findByRole("button", {
        name: expectedAltTextImage,
      });

      expect(unfavoriteIcon).toBeInTheDocument();
    });
  });
});
