import galaxyPadelLogo from "../../assets/galaxyPadelLogo.png";
import exitLogout from "../../assets/exitLogout.png";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import Button from "../Button/Button";
import auth from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <>
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
            <Button className="header__logout" onClick={logout}>
              <img
                className="header__logout"
                src={exitLogout}
                alt="Exit icon"
              />
            </Button>
          </div>
          <Navigation />
        </header>
      </>
    );
  } else {
    return (
      <>
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
          </div>
        </header>
      </>
    );
  }
};
export default Header;
