import { Provider } from "react-redux";
import { store } from "../../store";
import RacketsForm from "./RacketsForm";
import { render, screen } from "@testing-library/react";

describe("Given a RacketsForm component", () => {
  const nameLabelText = "Name:";
  const sizeLabelText = "Size:";
  const weightLabelText = "Weight ( 300 - 400g ):";
  const materialLabelText = "Material:";
  const powerLabelText = "Power:";
  const controlLabelText = "Control:";
  const imageLabelText = "Image URL:";
  const descriptionLabelText = "Description:";

  describe("When it's rendered", () => {
    test("Then it should show a 'Name','Size', 'Weight ( 300 - 400g )', 'Material:', 'Power:', 'Control:', 'https://image.png', 'Description:',  fields", async () => {
      render(
        <Provider store={store}>
          <RacketsForm />
        </Provider>,
      );

      const nameLabel = screen.getByLabelText(
        nameLabelText,
      ) as HTMLInputElement;
      const sizeLabel = screen.getByLabelText(
        sizeLabelText,
      ) as HTMLInputElement;
      const weightLabel = screen.getByLabelText(
        weightLabelText,
      ) as HTMLInputElement;
      const materialLabel = screen.getByLabelText(
        materialLabelText,
      ) as HTMLInputElement;
      const powerLabel = screen.getByLabelText(
        powerLabelText,
      ) as HTMLInputElement;
      const controlLabel = screen.getByLabelText(
        controlLabelText,
      ) as HTMLInputElement;
      const imageLabel = screen.getByLabelText(
        imageLabelText,
      ) as HTMLInputElement;
      const descriptionLabel = screen.getByLabelText(
        descriptionLabelText,
      ) as HTMLInputElement;

      expect(nameLabel).toBeInTheDocument();
      expect(sizeLabel).toBeInTheDocument();
      expect(weightLabel).toBeInTheDocument();
      expect(materialLabel).toBeInTheDocument();
      expect(powerLabel).toBeInTheDocument();
      expect(controlLabel).toBeInTheDocument();
      expect(imageLabel).toBeInTheDocument();
      expect(descriptionLabel).toBeInTheDocument();
    });
  });
});
