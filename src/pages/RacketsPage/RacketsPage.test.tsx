import { render, screen } from "@testing-library/react";
import RacketsPage from "./RacketsPage";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter } from "react-router-dom";

describe("Given a RacketsList component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading 'Padel Professional Rackets'", () => {
      const textTitle = "Padel Professional Rackets";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <RacketsPage />
          </BrowserRouter>
        </Provider>,
      );

      const headingTitle = screen.getByRole("heading", { name: textTitle });

      expect(headingTitle).toBeInTheDocument();
    });
  });
});
