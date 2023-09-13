import Button from "../../components/Button/Button";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import imageLogin from "../../assets/imageLogin.png";
import "./HomePage.css";
import { auth, githubProvider } from "../../firebase/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import paths from "../../paths/paths";
import { lazy } from "react";
import { useAppSelector } from "../../store";
import { showToastFunction } from "../../components/Toast/Toast";

export const HomePagePreload = lazy(() => import("./HomePage"));

const HomePage = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.uiState.isLoading);

  if (user && !isLoading) {
    return <Navigate to={paths.rackets} />;
  }

  const login = async () => {
    await signInWithPopup(auth, githubProvider);
    showToastFunction(`Welcome to Galaxy Padel!`, "info");
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
