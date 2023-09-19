import { lazy } from "react";
import "./FormPage.css";
import RacketsForm from "../../components/RacketsForm/RacketsForm";
import useRacketsApi from "../../hooks/useRacketsApi";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { Racket } from "../../types";
import { addRacketActionCreator } from "../../store/rackets/racketsSlice";
import paths from "../../paths/paths";

export const FormPagePreload = lazy(() => import("./FormPage"));

const FormPage = () => {
  const { createRacketApi } = useRacketsApi();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const actionOnSubmit = async (
    newRacket: Omit<Racket, "id" | "user" | "favorite">,
  ) => {
    const racket = await createRacketApi(newRacket);

    dispatch(addRacketActionCreator(racket));

    navigate(paths.rackets);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="form-page">
      <h1 className="form-title">Create your racket</h1>
      <RacketsForm actionOnSubmit={actionOnSubmit} />
    </div>
  );
};

export default FormPage;
