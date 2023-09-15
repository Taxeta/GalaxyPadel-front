import Button from "../Button/Button";
import { DataList } from "./DataList";
import "./RacketsForm.css";

const RacketsForm = (): React.ReactElement => {
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
          required
        />
      </div>
      <div className="form-slot">
        <label className="form__label" htmlFor="size">
          Size:
        </label>
        <select name="size" id="size" className="form__input" required>
          <option value="">--Size Racket--</option>
          <option value="softeva">Tear shape</option>
          <option value="mideva">Round shape</option>
          <option value="multieva">Diamond shape</option>
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
          pattern="^[300-400]+"
          required
        />
      </div>
      <div className="form-slot">
        <label className="form__label" htmlFor="material">
          Material:
        </label>
        <select name="material" id="material" className="form__input" required>
          <option value="">--Select Material--</option>
          <option value="softeva">Soft EVA</option>
          <option value="mideva">Mid EVA</option>
          <option value="multieva">Multi EVA</option>
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
        />
        <DataList />
      </div>
      <div className="form-slot">
        <label className="form__label" htmlFor="image">
          Image URL:
        </label>
        <input className="form__input" id="image" type="url" required />
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
