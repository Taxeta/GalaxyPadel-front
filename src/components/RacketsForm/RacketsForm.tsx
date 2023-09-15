import { useState } from "react";
import { Racket } from "../../types";
import Button from "../Button/Button";
import { DataList } from "./DataList";
import "./RacketsForm.css";

const RacketsForm = (): React.ReactElement => {
  const [newRacket, setNewRacket] = useState<
    Omit<Racket, "id" | "user" | "favorite">
  >({
    name: "",
    shape: "",
    weight: 0,
    material: "",
    power: 1,
    control: 1,
    image: "",
    description: "",
  });

  const changeNewRacket = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setNewRacket({ ...newRacket, [event.target.id]: event.target.value });
  };

  return (
    <form className="form">
      <div className="form-slot">
        <label className="form__label" htmlFor="name">
          Name:
        </label>
        <input
          className="form__input"
          id="name"
          type="text"
          maxLength={45}
          onChange={changeNewRacket}
          required
        />
      </div>
      <div className="form-slot">
        <label className="form__label" htmlFor="shape">
          Shape:
        </label>
        <select
          name="shape"
          id="shape"
          className="form__input"
          onChange={changeNewRacket}
          required
        >
          <option value="">--Shape Racket--</option>
          <option value="Tear shape">Tear shape</option>
          <option value="Round shape">Round shape</option>
          <option value="Diamond shape">Diamond shape</option>
        </select>
      </div>
      <div className="form-slot">
        <label className="form__label" htmlFor="weight">
          Weight ( 300 - 400g ):
        </label>
        <input
          className="form__input"
          id="weight"
          type="number"
          min="300"
          max="400"
          value={newRacket.weight === 0 ? "" : newRacket.weight}
          onChange={changeNewRacket}
          required
        />
      </div>
      <div className="form-slot">
        <label className="form__label" htmlFor="material">
          Material:
        </label>
        <select
          name="material"
          id="material"
          className="form__input"
          onChange={changeNewRacket}
          required
        >
          <option value="">--Select Material--</option>
          <option value="Soft EVA">Soft EVA</option>
          <option value="Mid EVA">Mid EVA</option>
          <option value="Multi EVA">Multi EVA</option>
        </select>
      </div>
      <div className="form-slot-range">
        <label className="form__label" htmlFor="power">
          Power:
        </label>
        <input
          className="form__range"
          type="range"
          id="power"
          min="1"
          max="10"
          list="datalist"
          onChange={changeNewRacket}
        />
        <DataList />
      </div>
      <div className="form-slot-range">
        <label className="form__label" htmlFor="control">
          Control:
        </label>
        <input
          className="form__range"
          type="range"
          id="control"
          min="1"
          max="10"
          list="datalist"
          onChange={changeNewRacket}
        />
        <DataList />
      </div>
      <div className="form-slot">
        <label className="form__label" htmlFor="image">
          Image URL:
        </label>
        <input
          className="form__input"
          id="image"
          type="url"
          onChange={changeNewRacket}
          required
        />
      </div>
      <div className="form-slot">
        <label className="form__label" htmlFor="description">
          Description:
        </label>
        <textarea
          className="form__textarea"
          name="description"
          id="description"
          rows={8}
          cols={20}
          onChange={changeNewRacket}
          required
        />
      </div>
      <div className="form-button">
        <Button className="big-button-solid">Create</Button>
      </div>
    </form>
  );
};

export default RacketsForm;
