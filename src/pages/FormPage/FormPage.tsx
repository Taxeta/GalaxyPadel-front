import { lazy, useEffect } from "react";
import "./FormPage.css";
import RacketsForm from "../../components/RacketsForm/RacketsForm";
import useRacketsApi from "../../hooks/useRacketsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { Racket } from "../../types";
import { addRacketActionCreator } from "../../store/rackets/racketsSlice";
import paths from "../../paths/paths";
import {
  setTotalPagesActionCreator,
  setTotalRacketsActionCreator,
} from "../../store/pagination/paginationSlice";

export const FormPagePreload = lazy(() => import("./FormPage"));

const FormPage = () => {
  const { createRacketApi } = useRacketsApi();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalRackets = useAppSelector((state) => state.pagination.totalRackets);
  const pageSize = useAppSelector((state) => state.pagination.pageSize);

  useEffect(() => {
    document.title = "GalaxyPadel | Rackets form";
  }, []);

  const actionOnSubmit = async (
    newRacket: Omit<Racket, "id" | "user" | "favorite">,
  ) => {
    const racket = await createRacketApi(newRacket);

    const newTotalRackets = totalRackets + 1;

    const newTotalPages = Math.ceil(newTotalRackets / pageSize);

    dispatch(setTotalPagesActionCreator(newTotalRackets));
    dispatch(setTotalRacketsActionCreator(newTotalPages));

    dispatch(addRacketActionCreator(racket));

    navigate(paths.rackets);
  };

  return (
    <div className="form-page">
      <h1 className="form-title">Create your racket</h1>
      <RacketsForm actionOnSubmit={actionOnSubmit} />
    </div>
  );
};

export default FormPage;
