import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = (): React.ReactElement => {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li>
          <NavLink className="navigation-list__rackets" to="/rackets">
            Rackets
          </NavLink>
        </li>
        <li>
          <NavLink className="navigation-list__create" to="/create">
            Create
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
