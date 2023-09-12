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
import { showToast } from "../components/Feedback/Toast";

const useRacketsApi = () => {
  const apiUrl = import.meta.env.VITE_API_RACKETS_URL;
  const dispatch = useDispatch();
  const [user] = useIdToken(auth);

  const getRackets = useCallback(async () => {
    dispatch(startLoadingActionCreator());
    try {
      if (user) {
        showToast("Cards Loaded!", true);
        const token = await user.getIdToken();
        const { data: apiRackets } = await axios.get<RacketsApi>(
          `${apiUrl}rackets`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const apiRacketsCards = apiRackets.rackets;

        const rackets = apiRacketsCards.map<Racket>(({ _id, ...rackets }) => ({
          id: _id,
          ...rackets,
        }));

        dispatch(stopLoadingActionCreator());
        return rackets;
      }
    } catch {
      showToast("Couldn't show rackets", false);
      dispatch(stopLoadingActionCreator());
      throw new Error("Can't get any racket");
    }
  }, [user, apiUrl, dispatch]);

  return { getRackets };
};

export default useRacketsApi;
