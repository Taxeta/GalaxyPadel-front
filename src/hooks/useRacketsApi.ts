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

const useRacketsApi = () => {
  const apiUrl = import.meta.env.VITE_API_RACKETS_URL;
  const dispatch = useDispatch();
  const [user] = useIdToken(auth);

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
        throw new Error("Couldn't get the racket");
      }
    },
    [apiUrl, user],
  );

  const modifyRacketByIdApi = useCallback(
    async (id: string, favorite: boolean): Promise<NewApiRacket> => {
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
        const { racket } = modifyRacket;

        const racketChanged: NewApiRacket = {
          ...racket,
          id: racket._id,
        };
        delete racketChanged._id;

        return racketChanged;
      } catch {
        throw new Error("Couldn't modify the racket");
      }
    },
    [apiUrl, user],
  );

  return {
    getRackets,
    deleteRacketApi,
    createRacketApi,
    getRacketByIdApi,
    modifyRacketByIdApi,
  };
};

export default useRacketsApi;
