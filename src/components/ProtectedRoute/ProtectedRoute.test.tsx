import authHook, { AuthStateHook } from "react-firebase-hooks/auth";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";
import App from "../App/App";
import paths from "../../paths/paths";

describe("Given a RacketsPage with protected by ProtectedRoute component", () => {
  describe("When the user is logged", () => {
    test("Then it should show 'Galaxy Padel' in a heading", async () => {
      const connectedHeadingText = "Galaxy Padel";

      const hookMock: Partial<AuthStateHook> = [null];
      authHook.useAuthState = vi.fn().mockReturnValue(hookMock);

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[paths.home]}>
            <App />
          </MemoryRouter>
        </Provider>,
      );

      const protectedPageTitle = await screen.findByRole("heading", {
        name: connectedHeadingText,
      });

      expect(protectedPageTitle).toBeInTheDocument();
    });
  });
});
