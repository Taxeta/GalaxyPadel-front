import { NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";
import paths from "../../paths/paths";

const Navigation = (): React.ReactElement => {
  const { pathname } = useLocation();

  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li>
          <NavLink
            className={
              pathname === paths.rackets
                ? "navigation-list__active"
                : "navigation-list__inactive"
            }
            to="/rackets"
          >
            Rackets
          </NavLink>
        </li>
        <li>
          <NavLink
            className={
              pathname === paths.create
                ? "navigation-list__active"
                : "navigation-list__inactive"
            }
            to="/create"
          >
            Create
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
