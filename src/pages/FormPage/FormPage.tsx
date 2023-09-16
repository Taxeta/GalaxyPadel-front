import { lazy } from "react";
import "./FormPage.css";
import RacketsForm from "../../components/RacketsForm/RacketsForm";

export const FormPagePreload = lazy(() => import("./FormPage"));

const FormPage = () => {
  const actionOnSubmit = () => {};
  return (
    <div className="form-page">
      <h1 className="form-title">Create your racket</h1>
      <RacketsForm actionOnSubmit={actionOnSubmit} />
    </div>
  );
};

export default FormPage;
