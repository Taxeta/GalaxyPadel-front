import { Racket } from "../../types";
import Button from "../Button/Button";
import deleteIcon from "../../assets/deleteIcon.svg";
import favoriteEmptyIcon from "../../assets/favoriteEmptyIcon.svg";
import favoriteFillIcon from "../../assets/favoriteFillIcon.svg";
import "./RacketsCard.css";
import { useAppDispatch } from "../../store";
import {
  deleteRacketActionCreator,
  toggleRacketActionCreator,
} from "../../store/rackets/racketsSlice";
import useRacketsApi from "../../hooks/useRacketsApi";
import { Link } from "react-router-dom";

interface RacketsCardProps {
  racket: Partial<Racket>;
  racketPosition: number;
}

const RacketCard = ({
  racket: { id, name, image, shape, weight, favorite },
  racketPosition,
}: RacketsCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { deleteRacketApi } = useRacketsApi();

  const deleteRacket = async () => {
    await deleteRacketApi(id!);

    dispatch(deleteRacketActionCreator(id!));
  };

  const toggleRacket = () => {
    dispatch(toggleRacketActionCreator(id!));
  };

  return (
    <article className="racket">
      <div className="icons-container">
        <div className="button-delete-container">
          <Button className="button-delete__icon" onClick={deleteRacket}>
            <img
              className="delete-icon"
              src={deleteIcon}
              alt={`${name} delete icon`}
              width="48"
              height="48"
            />
          </Button>
        </div>
      </div>
      <div className="button-favorite-container">
        <Button className="button-favorite__icon" onClick={toggleRacket}>
          {favorite ? (
            <img
              className="favorite-icon"
              src={favoriteFillIcon}
              alt={`${name} favorite icon`}
              width="48"
              height="48"
            />
          ) : (
            <img
              className="favorite-icon"
              src={favoriteEmptyIcon}
              alt={`${name} unfavorite icon`}
              width="48"
              height="48"
            />
          )}
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
