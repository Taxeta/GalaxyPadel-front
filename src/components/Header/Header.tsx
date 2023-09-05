import galaxyPadelLogo from "../../../public/galaxyPadelLogo.png";

const Header = (): React.ReactElement => {
  return (
    <header>
      <div>
        <img src={galaxyPadelLogo} alt="" />
        <h1>Galaxy Padel</h1>
      </div>
    </header>
  );
};

export default Header;
