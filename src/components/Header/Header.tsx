import galaxyPadelLogo from "../../assets/galaxyPadelLogo.png";
import exitLogout from "../../assets/exitLogout.svg";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import Button from "../Button/Button";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <header className="header">
        <img
          className="header__logo"
          src={galaxyPadelLogo}
          alt="Galaxy Padel logo app"
        />
        <h1 className="header__title">Galaxy Padel</h1>
        {user && (
          <Button className="header__logout" onClick={logout} aria-label="exit">
            <img className="header__logout" src={exitLogout} alt="Exit icon" />
          </Button>
        )}
      </header>
      {user && <Navigation />}
    </>
  );
};

export default Header;
