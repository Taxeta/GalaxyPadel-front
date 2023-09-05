import galaxyPadelLogo from "../../Assets/galaxyPadelLogo.png";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <div className="header-container">
        <img
          className="header-logo"
          src={galaxyPadelLogo}
          alt="Galaxy Padel logo app"
        />
        <h1 className="header-title">Galaxy Padel</h1>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
