import "./Loading.css";

const Loading = (): React.ReactElement => {
  return (
    <div className="loader-position">
      <div className="loader-container">
        <span className="loader" aria-label="loader"></span>
      </div>
    </div>
  );
};

export default Loading;
