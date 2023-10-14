import { lazy, useEffect, useState } from "react";
import useRacketsApi from "../../hooks/useRacketsApi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  clearSelectedRacketActionCreator,
  loadSelectedRacketActionCreator,
  toggleVisibilityRacketActionCreator,
} from "../../store/rackets/racketsSlice";
import { useParams } from "react-router-dom";
import { FormControlLabel, Switch } from "@mui/material";
import "./DetailRacketPage.css";
import { NewApiRacket } from "../../types";
import Loading from "../../components/Loading/Loading";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
} from "../../store/ui/ui";

export const DetailRacketPagePreload = lazy(() => import("./DetailRacketPage"));

const DetailRacketPage = (): React.ReactElement => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { getRacketByIdApi, modifyVisibilityRacket } = useRacketsApi();
  const [user] = useAuthState(auth);
  const racket = useAppSelector((state) => state.racketsState.selectedRacket);
  const [isChecked, setIsChecked] = useState(racket?.visibility || false);
  const isLoading = useAppSelector((state) => state.uiState.isLoading);

  useEffect(() => {
    if (user && id && (!racket || racket.id != id)) {
      (async () => {
        dispatch(startLoadingActionCreator());
        dispatch(clearSelectedRacketActionCreator());
        const selectedRacket = await getRacketByIdApi(id);

        if (selectedRacket && !isLoading) {
          dispatch(loadSelectedRacketActionCreator(selectedRacket));
          setIsChecked(!selectedRacket.visibility);
          dispatch(stopLoadingActionCreator());
          document.title = `GalaxyPadel | Detail racket ${selectedRacket.name}`;
        }
      })();
    }
  }, [user, dispatch, getRacketByIdApi, id, isLoading, racket]);

  const toggleVisibilityRacket = async (
    racket: Partial<NewApiRacket>,
    visibility: boolean,
  ) => {
    const racketVisibility = await modifyVisibilityRacket(
      racket.id!,
      visibility,
    );

    dispatch(toggleVisibilityRacketActionCreator(racketVisibility));
  };

  const handleToggleVisibility = async () => {
    if (racket && racket.visibility !== undefined) {
      const newVisibility = !isChecked;
      setIsChecked(newVisibility);
      await toggleVisibilityRacket(racket!, newVisibility);
    }
  };

  return (
    <article className="detail-content">
      {isLoading && <Loading />}
      {!isLoading && racket && (
        <>
          <h1 className="detail__title">{racket?.name}</h1>
          <div className="detail__container">
            <img
              className="detail__image"
              src={racket?.image}
              alt={`${racket?.name} racket`}
              width="280"
              height="280"
            />

            <ul className="detail__list">
              <li>
                <span className="detail__list-bold" aria-label="shape">
                  Shape:
                </span>{" "}
                {racket?.shape}
              </li>
              <li>
                <span className="detail__list-bold" aria-label="weight">
                  Weight:
                </span>{" "}
                {racket?.weight} g
              </li>
              <li>
                <span className="detail__list-bold" aria-label="material">
                  Material:
                </span>{" "}
                {racket?.material}
              </li>
              <li>
                <span className="detail__list-bold" aria-label="power">
                  Power(1-10):
                </span>{" "}
                {racket?.power}
              </li>
              <li>
                <span className="detail__list-bold" aria-label="control">
                  Control (1-10):
                </span>{" "}
                {racket?.control}
              </li>
              <li>
                <span className="detail__list-bold" aria-label="description">
                  Description:
                </span>{" "}
                {racket?.description}
              </li>
              <FormControlLabel
                id="detail__switch"
                control={
                  <Switch
                    checked={!isChecked}
                    aria-label="switch"
                    onChange={handleToggleVisibility}
                  />
                }
                label={
                  <span id="detail__switch-span">
                    Make it visible to other users?
                  </span>
                }
              />
            </ul>
          </div>
        </>
      )}
    </article>
  );
};

export default DetailRacketPage;
