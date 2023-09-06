import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = (): React.ReactElement => {
  return (
    <nav className="main-container">
      <div className="navigation-line">
        <ul className="navigation-list">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/">Create</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
