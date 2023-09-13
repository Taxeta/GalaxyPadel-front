import { Link } from "react-router-dom";
import paths from "../../paths/paths";
import "./NoRackets.css";

const NoRackets = (): React.ReactElement => {
  return (
    <div className="no-rackets">
      <h1 className="no-rackets__title">
        There are no rackets to show you can create one here
      </h1>
      <Link to={paths.create} className="create-link">
        Create
      </Link>
    </div>
  );
};

export default NoRackets;
