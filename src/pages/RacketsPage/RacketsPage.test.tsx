import { render, screen } from "@testing-library/react";
import RacketsPage from "./RacketsPage";

describe("Given a RacketsList component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading 'Padel Professional Rackets'", () => {
      const textTitle = "Padel Professional Rackets";

      render(<RacketsPage />);

      const headingTitle = screen.getByRole("heading", { name: textTitle });

      expect(headingTitle).toBeInTheDocument();
    });
  });
});
