import { auth } from "../firebase/firebase";
import axios from "axios";
import { useIdToken } from "react-firebase-hooks/auth";
import { useCallback } from "react";
import { Racket, RacketsApi } from "../types";
import { useDispatch } from "react-redux";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
} from "../store/ui/ui";
import { showToastFunction } from "../components/Toast/Toast";

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
      showToastFunction("Couldn't show rackets", "error");
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

  return { getRackets, deleteRacketApi, createRacketApi };
};

export default useRacketsApi;
