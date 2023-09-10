import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import RacketCard from "./RacketsCard";
import { racketsMock } from "../../mocks/racketsMock";
import { BrowserRouter } from "react-router-dom";

describe("Given a RacketCard component", () => {
  describe("When it's rendered", () => {
    test("Then it should show an image with the alternative text 'Adidas Metalbone 3.2 racket'", () => {
      const alternativeText = "Adidas Metalbone 3.2 racket";

      render(
        <Provider store={store}>
          <RacketCard racket={racketsMock[0]} />
        </Provider>,
      );

      const racketImage = screen.getByAltText(alternativeText);

      expect(racketImage).toBeInTheDocument();
    });

    test("Then it should show the heading text 'Adidas Metalbone 3.2'", () => {
      const headingText = "Adidas Metalbone 3.2";

      render(
        <Provider store={store}>
          <RacketCard racket={racketsMock[0]} />
        </Provider>,
      );

      const racketName = screen.getByRole("heading", { name: headingText });

      expect(racketName).toBeInTheDocument();
    });

    test("It should show a button with the text 'See details'", () => {
      const buttonText = "See details";

      render(
        <BrowserRouter>
          <RacketCard racket={racketsMock[0]} />
        </BrowserRouter>,
      );

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });

    test("It should show a list with properties like 'Diamond shape' or '355 g'", () => {
      const expectedShape = "shape";
      const expectedWeight = "weight";

      render(
        <Provider store={store}>
          <RacketCard racket={racketsMock[0]} />
        </Provider>,
      );

      const shapeText = screen.getByLabelText(expectedShape);
      const weightText = screen.getByLabelText(expectedWeight);

      expect(shapeText).toBeInTheDocument();
      expect(weightText).toBeInTheDocument();
    });
  });
});
