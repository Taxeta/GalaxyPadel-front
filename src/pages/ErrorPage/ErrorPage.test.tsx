import { BrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { render, screen } from "@testing-library/react";

const renderPage = () => {
  render(
    <BrowserRouter>
      <ErrorPage />
    </BrowserRouter>,
  );
};
describe("Given an ErrorPage component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a text '404', 'Oh No!' and 'Page Not Found' text", () => {
      const codeText = "code";
      const spanText = "text";
      const errorText = "Page Not Found";

      renderPage();

      const errorCode = screen.getByLabelText(codeText);
      const errorSpanText = screen.getByLabelText(spanText);
      const statusText = screen.getByRole("heading", { name: errorText });

      expect(errorCode).toBeInTheDocument();
      expect(errorSpanText).toBeInTheDocument();
      expect(statusText).toBeInTheDocument();
    });
  });

  test("Then it should show a link with text 'Back to Home'", () => {
    const linkText = "Back to Home";

    renderPage();

    const theLinkText = screen.getByRole("link", { name: linkText });

    expect(theLinkText).toBeInTheDocument();
  });
});
