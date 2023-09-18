import { NavLink } from "react-router-dom";
import "./Footer.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

const Footer = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  return (
    <footer className={user ? "footer" : "footer-offline"}>
      {user && (
        <ul className="footer__navigation">
          <li>
            <NavLink className="footer-navigation__rackets" to="/rackets">
              Rackets
            </NavLink>
          </li>
          <li>
            <NavLink className="footer-navigation__create" to="/create">
              Create
            </NavLink>
          </li>
        </ul>
      )}
      <div className="footer__data">
        <span className="company-name" aria-label="company">
          Galaxy Padel S.L.
        </span>
        <span aria-label="email">galaxypadel@gmail.com</span>
        <span aria-label="adress">Av/ Diagonal 167, Bcn</span>
        <span aria-label="phone">+34 665403563</span>
      </div>
    </footer>
  );
};

export default Footer;
