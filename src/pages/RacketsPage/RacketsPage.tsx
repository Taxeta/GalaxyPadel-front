import RacketsList from "../../components/RacketsList/RacketsList";
import "./RacketsPage.css";

const RacketsPage = (): React.ReactElement => {
  return (
    <div className="list-page">
      <h2 className="list-page__title">Padel Professional Rackets</h2>
      <RacketsList />
    </div>
  );
};

export default RacketsPage;
