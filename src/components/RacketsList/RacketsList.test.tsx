import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../store";
import RacketsList from "./RacketsList";
import { racketsMock } from "../../mocks/racketsMock";
import { BrowserRouter } from "react-router-dom";

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
