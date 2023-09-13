import { useAppSelector } from "../../store";
import RacketCard from "../RacketsCard/RacketsCard";
import "./RacketsList.css";

const RacketsList = (): React.ReactElement => {
  const rackets = useAppSelector((state) => state.racketsState.rackets);

  return (
    <ul>
      {rackets?.map((racket, racketPosition) => (
        <li className="racket-content" key={racket.id}>
          <RacketCard racket={racket} racketPosition={racketPosition} />
        </li>
      ))}
    </ul>
  );
};

export default RacketsList;
