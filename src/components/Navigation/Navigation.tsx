import { NavLink } from "react-router-dom";

const Navigation = (): React.ReactElement => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/home">Create</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
