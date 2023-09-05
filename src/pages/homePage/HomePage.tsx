import Button from "../../components/Button/Button";
import imageLogin from "../../images/imageLogin.png";
import "./HomePage.css";

const HomePage = (): React.ReactElement => {
  return (
    <section className="login-container">
      <h2 className="login-text">Login to access your account</h2>
      <Button className="login-button">
        <img src={imageLogin} alt="Github logo" />
        Login via Github
      </Button>
    </section>
  );
};

export default HomePage;
