import { lazy } from "react";
import "./FormPage.css";
import RacketsForm from "../../components/RacketsForm/RacketsForm";

export const FormPagePreload = lazy(() => import("./FormPage"));

const FormPage = (): React.ReactElement => {
  return (
    <div className="form-page">
      <h1 className="form-title">Create your racket</h1>
      <RacketsForm />
    </div>
  );
};

export default FormPage;
