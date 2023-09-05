import Button from "../../components/Button/Button";
import githubLogin from "../../assets/githubLogin.png";

const HomePage = () => {
  return (
    <section className="login-page">
      <h2 className="login-text">Login to access your account</h2>

      <Button className="login-button">
        <img src={githubLogin} alt="" />
        Login via Github
      </Button>
    </section>
  );
};

export default HomePage;
