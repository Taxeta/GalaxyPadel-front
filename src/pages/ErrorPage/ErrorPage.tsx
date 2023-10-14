import { Link } from "react-router-dom";
import paths from "../../paths/paths";
import { lazy, useEffect } from "react";
import "./ErrorPage.css";

export const ErrorPagePreload = lazy(() => import("./ErrorPage"));

const ErrorPage = (): React.ReactElement => {
  useEffect(() => {
    document.title = "GalaxyPadel | Error Page";
  }, []);

  return (
    <div className="error">
      <span className="error__status" aria-label="code">
        404
      </span>
      <span className="error__text" aria-label="text">
        Oh No!
      </span>
      <h1 className="error__title">Page Not Found</h1>
      <Link className="button-link" to={paths.home}>
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
