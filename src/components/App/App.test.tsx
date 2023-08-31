import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import App from "./App";

describe("Given an App component", () => {
  describe("When rendered", () => {
    test("Then it should show the text 'Galaxy Padel'", () => {
      const expectedText = /galaxy padel/i;

      render(
        <Provider store={store}>
          <App />
        </Provider>,
      );

      const text = screen.getByText(expectedText);

      expect(text).toBeInTheDocument();
    });
  });
});
