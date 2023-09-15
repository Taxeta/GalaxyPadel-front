import { Provider } from "react-redux";
import { store } from "../../store";
import RacketsForm from "./RacketsForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Given a RacketsForm component", () => {
  const nameLabelText = "Name:";
  const shapeLabelText = "Shape:";
  const weightLabelText = "Weight ( 300 - 400g ):";
  const materialLabelText = "Material:";
  const powerLabelText = "Power:";
  const controlLabelText = "Control:";
  const imageLabelText = "Image URL:";
  const descriptionLabelText = "Description:";

  const name = "Black Piton";
  const size = "Tear shape";
  const weight = 350;
  const material = "Soft EVA";
  const image = "https://image.png";
  const description = "Racket to prove if description is ok";

  describe("When it's rendered", () => {
    test("Then it should show a 'Name','Shape', 'Weight ( 300 - 400g )', 'Material:', 'Power:', 'Control:', 'https://image.png', 'Description:',  fields", async () => {
      render(
        <Provider store={store}>
          <RacketsForm />
        </Provider>,
      );

      const nameLabel = screen.getByLabelText(
        nameLabelText,
      ) as HTMLInputElement;
      const shapeLabel = screen.getByLabelText(
        shapeLabelText,
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
      expect(shapeLabel).toBeInTheDocument();
      expect(weightLabel).toBeInTheDocument();
      expect(materialLabel).toBeInTheDocument();
      expect(powerLabel).toBeInTheDocument();
      expect(controlLabel).toBeInTheDocument();
      expect(imageLabel).toBeInTheDocument();
      expect(descriptionLabel).toBeInTheDocument();
    });
  });

  describe("When it's rendered", () => {
    test("Then it should show a 'Black Piton','Tear shape', '350', 'Soft EVA', 'Power:', 'Control:', 'Image URL:', 'Racket to prove if description is ok',  fields", async () => {
      render(
        <Provider store={store}>
          <RacketsForm />
        </Provider>,
      );

      const nameLabel = screen.getByLabelText(nameLabelText);
      const shapeLabel = screen.getByLabelText(shapeLabelText);
      const weightLabel = screen.getByLabelText(weightLabelText);
      const materialLabel = screen.getByLabelText(materialLabelText);
      const imageLabel = screen.getByLabelText(imageLabelText);
      const descriptionLabel = screen.getByLabelText(descriptionLabelText);

      await userEvent.type(nameLabel, name);
      await userEvent.selectOptions(shapeLabel, size);
      await userEvent.type(weightLabel, weight.toString());
      await userEvent.selectOptions(materialLabel, material);
      await userEvent.type(imageLabel, image);
      await userEvent.type(descriptionLabel, description);

      expect(nameLabel).toHaveValue(name);
      expect(shapeLabel).toHaveValue(size);
      expect(weightLabel).toHaveValue(weight);
      expect(materialLabel).toHaveValue(material);
      expect(imageLabel).toHaveValue(image);
      expect(descriptionLabel).toHaveValue(description);
    });
  });
});
