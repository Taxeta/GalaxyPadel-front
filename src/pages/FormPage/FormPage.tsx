import { lazy } from "react";
import "./FormPage.css";

export const FormPagePreload = lazy(() => import("./FormPage"));

const FormPage = (): React.ReactElement => {
  return (
    <div className="form">
      <h1 className="form-title">Create your racket</h1>
    </div>
  );
};

export default FormPage;
