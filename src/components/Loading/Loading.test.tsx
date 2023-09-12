import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Given a Loading component", () => {
  describe("When is rendered", () => {
    test("Then it should show a loader", () => {
      const expectAriaLabel = "loader";

      render(<Loading />);

      const loading = screen.getByLabelText(expectAriaLabel);

      expect(loading).toBeInTheDocument();
    });
  });
});
