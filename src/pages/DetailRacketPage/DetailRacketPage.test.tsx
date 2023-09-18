import { myMockId, myMockId2 } from "../../mocks/racketsMock";
import { setupStore } from "../../store";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import DetailRacketPage from "./DetailRacketPage";
import paths from "../../paths/paths";

describe("Given a RacketDetailPage page", () => {
  const path = `${paths.rackets}/${myMockId.id}`;
  const store = setupStore({
    racketsState: { rackets: [], selectedRacket: myMockId2[0] },
  });

  describe("When it's rendered", () => {
    test("Then it should show a heading with the text 'Puma SolarATTACK Momo'", async () => {
      const expectedTitle = myMockId2[0].name;

      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route
              path={path}
              element={
                <Provider store={store}>
                  <DetailRacketPage />
                </Provider>
              }
            ></Route>
          </Routes>
        </MemoryRouter>,
      );

      const titleHeading = await screen.findByRole("heading", {
        name: expectedTitle,
      });

      expect(titleHeading).toBeInTheDocument();
    });
  });
});
