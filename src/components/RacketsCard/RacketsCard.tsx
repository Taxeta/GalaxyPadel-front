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
  isLazy: boolean;
}

const RacketCard = ({
  racket: { id, name, image, shape, weight, favorite },
  isLazy,
}: RacketsCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { deleteRacketApi, modifyRacketByIdApi } = useRacketsApi();

  const deleteRacket = async () => {
    await deleteRacketApi(id!);

    dispatch(deleteRacketActionCreator(id!));
  };

  const toggleRacket = async () => {
    const modifyRacket = await modifyRacketByIdApi(id!, favorite!);

    dispatch(toggleRacketActionCreator(modifyRacket));
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
          <img
            className={"favorite-icon"}
            src={favorite ? favoriteFillIcon : favoriteEmptyIcon}
            alt={favorite ? `Fill favorite icon` : `Empty favorite icon`}
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
        {...(isLazy && { loading: "lazy" })}
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
