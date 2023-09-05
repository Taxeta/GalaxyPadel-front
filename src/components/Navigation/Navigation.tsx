import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = (): React.ReactElement => {
  return (
    <nav className="main-container">
      <ul className="navigation-list">
        <li>
          <NavLink className="navigation-list" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="navigation-list" to="/">
            Create
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
