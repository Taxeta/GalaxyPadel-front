import Button from "../../components/Button/Button";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import imageLogin from "../../assets/imageLogin.png";
import "./HomePage.css";
import { auth, githubProvider } from "../../firebase/firebase";

const HomePage = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  const login = async () => {
    await signInWithPopup(auth, githubProvider);
  };

  return (
    <div className="login-container">
      <div className="white-filter"></div>
      {user ? (
        <span className="login-user">{`Welcome ${user?.displayName}`}</span>
      ) : (
        <>
          <h2 className="login-text">Login to access your account</h2>
          <Button className="login-button" onClick={login}>
            <img className="login-image" src={imageLogin} alt="Github logo" />
            Login via Github
          </Button>
        </>
      )}
    </div>
  );
};

export default HomePage;
