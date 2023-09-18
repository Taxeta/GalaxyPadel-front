import { Racket } from "../../types";
import Button from "../Button/Button";
import deleteIcon from "../../assets/deleteIcon.svg";
import "./RacketsCard.css";
import { useAppDispatch } from "../../store";
import { deleteRacketActionCreator } from "../../store/rackets/racketsSlice";
import useRacketsApi from "../../hooks/useRacketsApi";
import { Link } from "react-router-dom";

interface RacketsCardProps {
  racket: Partial<Racket>;
  racketPosition: number;
}

const RacketCard = ({
  racket: { id, name, image, shape, weight },
  racketPosition,
}: RacketsCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { deleteRacketApi } = useRacketsApi();

  const deleteRacket = async () => {
    await deleteRacketApi(id!);

    dispatch(deleteRacketActionCreator(id!));
  };
  return (
    <article className="racket">
      <div className="button-altcontainer">
        <div className="button-container">
          <Button className="button-icon" onClick={deleteRacket}>
            <img
              className="delete-icon"
              src={deleteIcon}
              alt={`${name} delete icon`}
              width="48"
              height="48"
            />
          </Button>
        </div>

        <img
          className="racket__image"
          src={image}
          alt={`${name} racket`}
          width="280"
          height="280"
          loading={racketPosition > 2 ? "lazy" : "eager"}
        />
      </div>
      <h2 className="racket__name">{name}</h2>
      <div className="racket__container">
        <ul className="racket__atributes">
          <li>{shape}</li>
          <li>{weight} g</li>
        </ul>
        <Link to={`/rackets/${id}`} className="button-fill">
          See details
        </Link>
      </div>
    </article>
  );
};

export default RacketCard;
