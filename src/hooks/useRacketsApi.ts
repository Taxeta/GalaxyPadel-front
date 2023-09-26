import axios from "axios";
import { useCallback } from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { showToastFunction } from "../components/Toast/Toast";
import { auth } from "../firebase/firebase";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
} from "../store/ui/ui";
import { ApiRackets, NewApiRacket, Racket, RacketsApi } from "../types";
import { useNavigate } from "react-router-dom";
import paths from "../paths/paths";

const useRacketsApi = () => {
  const apiUrl = import.meta.env.VITE_API_RACKETS_URL;
  const dispatch = useDispatch();
  const [user] = useIdToken(auth);
  const navigate = useNavigate();

  const getRackets = useCallback(async () => {
    dispatch(startLoadingActionCreator());
    try {
      if (user) {
        const token = await user.getIdToken();

        const { data: apiRackets } = await axios.get<RacketsApi>(
          `${apiUrl}rackets`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const apiRacketsCards = apiRackets.rackets;

        const rackets = apiRacketsCards.map<Racket>(({ _id, ...rackets }) => ({
          ...rackets,
          id: _id,
        }));

        dispatch(stopLoadingActionCreator());
        return rackets;
      }
    } catch {
      dispatch(stopLoadingActionCreator());
      throw new Error("Can't get any racket");
    }
  }, [user, apiUrl, dispatch]);

  const deleteRacketApi = useCallback(
    async (_id: string) => {
      dispatch(startLoadingActionCreator());
      try {
        if (user) {
          const token = await user.getIdToken();

          const { data } = await axios.delete(`${apiUrl}rackets/${_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const message = data;
          dispatch(stopLoadingActionCreator());
          showToastFunction("Successfully deleted", "success");
          return message;
        }
      } catch {
        dispatch(stopLoadingActionCreator());
        showToastFunction("Couldn't delete the racket", "error");
        throw new Error("Couldn't delete the racket");
      }
    },
    [apiUrl, user, dispatch],
  );

  const createRacketApi = useCallback(
    async (newRacket: Omit<Racket, "id" | "user" | "favorite">) => {
      try {
        if (user) {
          const token = await user.getIdToken();

          const { data: createApiRacket } = await axios.post(
            `${apiUrl}rackets`,
            newRacket,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          const racket = {
            ...createApiRacket.racket,
            id: createApiRacket.racket._id,
          };
          delete racket._id;
          dispatch(stopLoadingActionCreator());
          showToastFunction("Successfully created", "success");
          return racket;
        }
      } catch {
        dispatch(stopLoadingActionCreator());
        showToastFunction("Couldn't create the racket", "error");
        throw new Error("Couldn't create the racket");
      }
    },
    [apiUrl, user, dispatch],
  );

  const getRacketByIdApi = useCallback(
    async (id: string) => {
      try {
        if (user) {
          const token = await user.getIdToken();

          const { data: racketDetail } = await axios.get(
            `${apiUrl}rackets/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          const racket = {
            ...racketDetail.racket,
            id: racketDetail.racket._id,
          };
          delete racket._id;

          return racket;
        }
      } catch {
        dispatch(stopLoadingActionCreator());
        showToastFunction("This detail racket doesn't exist", "error");
        navigate(paths.rackets);
        throw new Error("Couldn't get the racket");
      }
    },
    [apiUrl, user, dispatch, navigate],
  );

  const modifyRacketByIdApi = useCallback(
    async (id: string, favorite: boolean): Promise<NewApiRacket> => {
      dispatch(startLoadingActionCreator());
      try {
        if (!user) {
          throw Error();
        }

        const token = await user.getIdToken();

        const { data: modifyRacket } = await axios.patch<{
          racket: ApiRackets;
        }>(
          `${apiUrl}rackets/${id}`,
          { favorite },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const racketChanged: NewApiRacket = {
          ...modifyRacket.racket,
          id: modifyRacket.racket._id,
        };
        delete racketChanged._id;
        dispatch(stopLoadingActionCreator());

        return racketChanged;
      } catch {
        dispatch(stopLoadingActionCreator());

        showToastFunction("Could not favorite", "error");
        throw new Error("Couldn't modify the racket");
      }
    },
    [apiUrl, user, dispatch],
  );

  const modifyVisibilityRacket = useCallback(
    async (id: string, visibility: boolean): Promise<NewApiRacket> => {
      dispatch(startLoadingActionCreator());
      try {
        if (!user) {
          throw Error();
        }

        const token = await user.getIdToken();

        const { data: modifyRacket } = await axios.patch<{
          racket: ApiRackets;
        }>(
          `${apiUrl}rackets/${id}`,
          { visibility },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const racketChanged: NewApiRacket = {
          ...modifyRacket.racket,
          id: modifyRacket.racket._id,
        };
        delete racketChanged._id;
        dispatch(stopLoadingActionCreator());

        return racketChanged;
      } catch {
        dispatch(stopLoadingActionCreator());

        showToastFunction("Couldn't racket visible", "error");
        throw new Error("Couldn't change visibility of the racket");
      }
    },
    [apiUrl, user, dispatch],
  );

  return {
    getRackets,
    deleteRacketApi,
    createRacketApi,
    getRacketByIdApi,
    modifyRacketByIdApi,
    modifyVisibilityRacket,
  };
};

export default useRacketsApi;
