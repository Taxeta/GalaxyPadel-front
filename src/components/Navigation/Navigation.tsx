import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = (): React.ReactElement => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li>
          <NavLink className="navigation__rackets" to="/rackets">
            Rackets
          </NavLink>
        </li>
        <li>
          <NavLink className="navigation__create" to="/create">
            Create
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
