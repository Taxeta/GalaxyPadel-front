import { NavLink } from "react-router-dom";
import paths from "../../paths/paths";
import { lazy } from "react";
import "./ErrorPage.css";

export const ErrorPagePreload = lazy(() => import("./ErrorPage"));

const ErrorPage = (): React.ReactElement => {
  return (
    <div className="error">
      <span className="error__status">404</span>
      <span className="error__text">Oh No!</span>
      <h1 className="error__title">Page Not Found</h1>
      <NavLink className="button-link" to={paths.home}>
        Back to Home
      </NavLink>
    </div>
  );
};

export default ErrorPage;
