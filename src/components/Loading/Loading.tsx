import "./Loading.css";

const Loading = (): React.ReactElement => {
  return (
    <div className="loader-container">
      <span className="loader" aria-label="loading"></span>
    </div>
  );
};

export default Loading;
