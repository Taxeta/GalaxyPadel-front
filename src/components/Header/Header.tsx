import galaxyPadelLogo from "../../Assets/galaxyPadelLogo.png";
import exitLogout from "../../Assets/exitLogout.png";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import Button from "../Button/Button";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img
            className="header-logo"
            src={galaxyPadelLogo}
            alt="Galaxy Padel logo app"
          />
          <h1 className="header-title">Galaxy Padel</h1>
        </div>
        <Button className="logout">
          <img className="logout" src={exitLogout} alt="Exit icon" />
        </Button>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
