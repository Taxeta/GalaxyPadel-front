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
    async (id: string) => {
      try {
        if (user) {
          const token = await user.getIdToken();

          const { data } = await axios.delete(`${apiUrl}rackets/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const message = data;

          return message;
        }
      } catch {
        throw new Error("Couldn't delete the racket");
      }
    },
    [apiUrl, user],
  );

  return { getRackets, deleteRacketApi };
};

export default useRacketsApi;
