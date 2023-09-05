import galaxyPadelLogo from "../../Assets/galaxyPadelLogo.png";
import exitLogout from "../../Assets/exitLogout.png";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__container-logo">
          <img
            className="header__logo"
            src={galaxyPadelLogo}
            alt="Galaxy Padel logo app"
          />
          <h1 className="header__title">Galaxy Padel</h1>
        </div>
        <button>
          <img className="header__logout" src={exitLogout} alt="Exit icon" />
        </button>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
