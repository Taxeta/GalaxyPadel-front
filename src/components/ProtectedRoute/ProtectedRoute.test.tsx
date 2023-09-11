import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { render, screen } from "@testing-library/react";
import paths from "../../paths/paths";
import RacketsPage from "../../pages/RacketsPage/RacketsPage";
import { Provider } from "react-redux";
import { store } from "../../store";

describe("Given a RacketsPage with protected by ProtectedRoute component", () => {
  describe("When the user is logged", () => {
    test("Then it should show 'Padel Professional Rackets' in a heading", async () => {
      const connectedHeadingText = "Padel Professional Rackets";
      const user: Partial<User> = {
        displayName: "Arturo",
      };

      const hookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(hookMock);

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[paths.home]}>
            <ProtectedRoute>
              <RacketsPage />
            </ProtectedRoute>
          </MemoryRouter>
        </Provider>,
      );

      const protectedPageTitle = screen.getByRole("heading", {
        name: connectedHeadingText,
      });

      expect(protectedPageTitle).toBeInTheDocument();
    });
  });
});
