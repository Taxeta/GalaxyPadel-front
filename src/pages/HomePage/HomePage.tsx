import Button from "../../components/Button/Button";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import imageLogin from "../../assets/imageLogin.png";
import "./HomePage.css";
import auth, { githubProvider } from "../../firebase/firebase";

const HomePage = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  const login = async () => {
    await signInWithPopup(auth, githubProvider);
  };

  return (
    <section className="login-container">
      <h2 className="login-text">Login to access your account</h2>
      {user ? (
        <span className="login-user">{`Welcome ${user?.displayName}`}</span>
      ) : (
        <Button className="login-button" onClick={login}>
          <img src={imageLogin} alt="Github logo" />
          Login via Github
        </Button>
      )}
    </section>
  );
};

export default HomePage;
