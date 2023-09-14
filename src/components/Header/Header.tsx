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
        <div className="header__container">
          <img
            className="header__logo"
            src={galaxyPadelLogo}
            alt="Galaxy Padel logo app"
            width="45"
            height="45"
          />
          <h1 className="header__title">Galaxy Padel</h1>
        </div>
        {user && (
          <Button className="header__logout" onClick={logout}>
            <img
              className="header__logout"
              src={exitLogout}
              alt="Exit icon"
              width="48"
              height="48"
            />
          </Button>
        )}
      </header>
      {user && <Navigation />}
    </>
  );
};

export default Header;
