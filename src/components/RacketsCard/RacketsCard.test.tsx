import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore, store } from "../../store";
import RacketCard from "./RacketsCard";
import { racketsMock } from "../../mocks/racketsMock";
import { BrowserRouter } from "react-router-dom";

describe("Given a RacketCard component", () => {
  describe("When it's rendered", () => {
    test("Then it should show an image with the alternative text 'Adidas Metalbone 3.2 racket'", () => {
      const alternativeText = "Adidas Metalbone 3.2 racket";
      const racketPosition = 1;
      const store = setupStore({ racketsState: { rackets: racketsMock } });

      render(
        <Provider store={store}>
          <RacketCard racketPosition={racketPosition} racket={racketsMock[0]} />
        </Provider>,
      );

      const racketImage = screen.getByAltText(alternativeText);

      expect(racketImage).toBeInTheDocument();
    });

    test("Then it should show the heading text 'Adidas Metalbone 3.2'", () => {
      const headingText = "Adidas Metalbone 3.2";
      const racketPosition = 1;
      const store = setupStore({ racketsState: { rackets: racketsMock } });

      render(
        <Provider store={store}>
          <RacketCard racketPosition={racketPosition} racket={racketsMock[0]} />
        </Provider>,
      );

      const racketName = screen.getByRole("heading", { name: headingText });

      expect(racketName).toBeInTheDocument();
    });

    test("It should show a button with the text 'See details'", () => {
      const buttonText = "See details";
      const racketPosition = 1;
      const store = setupStore({ racketsState: { rackets: racketsMock } });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <RacketCard
              racketPosition={racketPosition}
              racket={racketsMock[0]}
            />
          </Provider>
        </BrowserRouter>,
      );

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });
});

describe("Given a RacketCard component", () => {
  describe("When it's rendered", () => {
    test("Then it should show an image with the alternative text 'Head Speed Motion racket'", () => {
      const headingText = "Adidas Metalbone 3.2";
      const racketPosition = 3;
      const racket = racketsMock[0];

      render(
        <Provider store={store}>
          <RacketCard racketPosition={racketPosition} racket={racket} />
        </Provider>,
      );

      const racketName = screen.getByRole("heading", { name: headingText });

      expect(racketName).toBeInTheDocument();
    });
  });
});
