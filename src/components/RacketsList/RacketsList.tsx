import { useAppSelector } from "../../store";

const RacketsList = (): React.ReactElement => {
  const rackets = useAppSelector((state) => state.racketsState.rackets);

  return (
    <ul>
      {rackets.map((racket) => (
        <li key={racket.id}></li>
      ))}
    </ul>
  );
};

export default RacketsList;
