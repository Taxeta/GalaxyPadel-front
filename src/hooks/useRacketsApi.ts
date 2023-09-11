import { auth } from "../firebase/firebase";
import axios from "axios";
import { useIdToken } from "react-firebase-hooks/auth";
import { useCallback } from "react";
import { Racket, RacketsApi } from "../types";

const useRacketsApi = () => {
  const apiUrl = import.meta.env.VITE_API_RACKETS_URL;
  const [user] = useIdToken(auth);
  const getRackets = useCallback(async (): Promise<Racket[]> => {
    const token = await user?.getIdToken();

    try {
      const { data: apiRackets } = await axios.get<RacketsApi>(
        `${apiUrl}rackets`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const apiRacketsCards = apiRackets.rackets;

      const rackets = apiRacketsCards.map<Racket>(
        ({
          _id,
          name,
          image,
          control,
          power,
          material,
          favorite,
          shape,
          weight,
          description,
          user,
        }) => ({
          id: _id,
          name,
          image,
          control,
          power,
          material,
          favorite,
          shape,
          weight,
          description,
          user,
        }),
      );

      return rackets;
    } catch {
      throw new Error("Can't get any racket");
    }
  }, [user, apiUrl]);

  return { getRackets };
};

export default useRacketsApi;