import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Given a Button component", () => {
  describe("When it's rendered", () => {
    const buttonText = "";

    test("Then it should call the onClick function when clicked", async () => {
      const onClickMock = vi.fn();

      render(<Button onClick={onClickMock} />);

      const button = screen.getByRole("button", { name: buttonText });

      await button.click();

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });
});
