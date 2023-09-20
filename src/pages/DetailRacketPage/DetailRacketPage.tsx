import { lazy, useEffect } from "react";
import useRacketsApi from "../../hooks/useRacketsApi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadSelectedRacketActionCreator } from "../../store/rackets/racketsSlice";
import { useParams } from "react-router-dom";
import "./DetailRacketPage.css";

export const DetailRacketPagePreload = lazy(() => import("./DetailRacketPage"));

const DetailRacketPage = (): React.ReactElement => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { getRacketByIdApi } = useRacketsApi();
  const [user] = useAuthState(auth);
  const racket = useAppSelector((state) => state.racketsState.selectedRacket);

  useEffect(() => {
    if (user) {
      (async () => {
        const selectedRacket = await getRacketByIdApi(id!);

        if (selectedRacket) {
          dispatch(loadSelectedRacketActionCreator(selectedRacket));

          document.title = `Detail racket ${selectedRacket?.name}`;
        }
      })();
    }
  }, [user, dispatch, getRacketByIdApi, id]);

  return (
    <article className="detail-content">
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
        </ul>
      </div>
    </article>
  );
};

export default DetailRacketPage;
