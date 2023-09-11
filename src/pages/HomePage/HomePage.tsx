import Button from "../../components/Button/Button";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import imageLogin from "../../assets/imageLogin.png";
import "./HomePage.css";
import { auth, githubProvider } from "../../firebase/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import paths from "../../paths/paths";

const HomePage = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to={paths.rackets} />;
  }

  const login = async () => {
    await signInWithPopup(auth, githubProvider);
    navigate(paths.rackets);
  };

  return (
    <div className="login-container">
      <h1 className="login-text">Login to access your account</h1>
      <Button className="button button--outline" onClick={login}>
        <img className="login-image" src={imageLogin} alt="Github logo" />
        Login via Github
      </Button>
    </div>
  );
};

export default HomePage;
