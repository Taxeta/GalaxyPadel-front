import { useEffect } from "react";
import RacketsList from "../../components/RacketsList/RacketsList";
import { racketsMock } from "../../mocks/racketsMock";
import { useAppDispatch } from "../../store";
import { loadRacketsActionCreator } from "../../store/Rackets/racketsSlice";
import "./RacketsPage.css";

const RacketsPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadRacketsActionCreator(racketsMock));
  }, [dispatch]);

  return (
    <div className="list-page">
      <h2 className="list-page__title">Padel Professional Rackets</h2>
      <RacketsList />
    </div>
  );
};

export default RacketsPage;
