import Button from "../../components/Button/Button";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import imageLogin from "../../assets/imageLogin.png";
import "./HomePage.css";
import { auth, githubProvider } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import paths from "../../paths/paths";

const HomePage = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const login = async () => {
    await signInWithPopup(auth, githubProvider);
    navigate(paths.rackets);
  };

  return (
    <div className="login-container">
      {user ? (
        <span className="login-user">{`Welcome ${user.displayName}`}</span>
      ) : (
        <>
          <h2 className="login-text">Login to access your account</h2>
          <Button className="button button--outline" onClick={login}>
            <img className="login-image" src={imageLogin} alt="Github logo" />
            Login via Github
          </Button>
        </>
      )}
    </div>
  );
};

export default HomePage;
