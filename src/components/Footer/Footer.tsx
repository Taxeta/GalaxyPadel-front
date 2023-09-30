import { NavLink, useLocation } from "react-router-dom";
import "./Footer.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import paths from "../../paths/paths";

const Footer = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const { pathname } = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={user ? "footer" : "footer-offline"}>
      {user && (
        <ul className="footer__navigation">
          <li>
            <NavLink
              className={
                pathname === paths.rackets
                  ? "footer-navigation__active"
                  : "footer-navigation__inactive"
              }
              to="/rackets"
              onClick={handleScrollToTop}
            >
              Rackets
            </NavLink>
          </li>
          <li>
            <NavLink
              className={
                pathname === paths.create
                  ? "footer-navigation__active"
                  : "footer-navigation__inactive"
              }
              to="/create"
              onClick={handleScrollToTop}
            >
              Create
            </NavLink>
          </li>
        </ul>
      )}
      <div className="footer__data">
        <span className="company-name">Galaxy Padel S.L.</span>
        <span>galaxypadel@gmail.com</span>
        <span>Av/ Diagonal 167, Bcn</span>
        <span>+34 665403563</span>
      </div>
    </footer>
  );
};

export default Footer;
