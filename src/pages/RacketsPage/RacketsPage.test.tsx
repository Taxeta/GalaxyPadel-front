import { render, screen } from "@testing-library/react";
import RacketsPage from "./RacketsPage";
import { Provider } from "react-redux";
import { setupStore } from "../../store";
import { Auth } from "firebase/auth";
import { racketsMock } from "../../mocks/racketsMock";
import React from "react";

vi.mock("react", async () => {
  const actual: Auth = await vi.importActual("react");
  return {
    ...actual,
    useEffect: vi.fn(),
  };
});

describe("Given a RacketsList component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading 'Padel Professional Rackets'", async () => {
      const textTitle = "Padel Professional Rackets";
      const store = setupStore({ racketsState: { rackets: racketsMock } });

      render(
        <Provider store={store}>
          <React.Suspense>
            <RacketsPage />
          </React.Suspense>
        </Provider>,
      );

      const headingTitle = await screen.findByRole("heading", {
        name: textTitle,
      });

      expect(headingTitle).toBeInTheDocument();
    });
  });
});
