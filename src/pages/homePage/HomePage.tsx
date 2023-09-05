import Button from "../../components/Button/Button";
import githubLogin from "../../assets/githubLogin.png";
import "./HomePage.css";

const HomePage = () => {
  return (
    <section className="login-container">
      <h2 className="login-text">Login to access your account</h2>

      <Button className="login-button">
        <img src={githubLogin} alt="Github logo" />
        Login via Github
      </Button>
    </section>
  );
};

export default HomePage;
