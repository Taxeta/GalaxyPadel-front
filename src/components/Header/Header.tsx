import galaxyPadelLogo from "../../images/galaxyPadelLogo.png";
import exitLogout from "../../images/exitLogout.png";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import Button from "../Button/Button";

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
        <Button className="header__logout">
          <img className="header__logout" src={exitLogout} alt="Exit icon" />
        </Button>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
