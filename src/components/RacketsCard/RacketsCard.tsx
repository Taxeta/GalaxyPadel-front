import { Racket } from "../../types";
import Button from "../Button/Button";
import "./RacketsCard.css";

interface RacketsCardProps {
  racket: Partial<Racket>;
}

const RacketCard = ({
  racket: { name, image, shape, weight },
}: RacketsCardProps): React.ReactElement => {
  return (
    <article className="racket">
      <img className="racket__image" src={`${image}`} alt={`${name} racket`} />
      <h2 className="racket__name">{name}</h2>

      <div className="racket__container">
        <ul className="racket__atributes">
          <li>
            <span aria-label="shape">{shape}</span>
          </li>
          <li>
            <span aria-label="weight">{weight}g</span>
          </li>
        </ul>
        <Button className="button button__fill">See details</Button>
      </div>
    </article>
  );
};

export default RacketCard;