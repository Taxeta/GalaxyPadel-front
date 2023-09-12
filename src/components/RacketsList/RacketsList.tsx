import { useAppSelector } from "../../store";
import RacketCard from "../RacketsCard/RacketsCard";
import "./RacketsList.css";

const RacketsList = (): React.ReactElement => {
  const rackets = useAppSelector((state) => state.racketsState.rackets);

  return (
    <ul>
      {rackets?.map((racket) => (
        <li className="racket-content" key={racket.id}>
          <RacketCard racket={racket} />
        </li>
      ))}
    </ul>
  );
};

export default RacketsList;
