import { auth } from "../../firebase/firebase";
import axios from "axios";
import { useIdToken } from "react-firebase-hooks/auth";
import { useCallback } from "react";
import { Racket, ApiRackets } from "../../types";

const apiUrl = import.meta.env.VITE_API_RACKETS_URL;

const useRacketsApi = () => {
  const [user] = useIdToken(auth);

  const getRackets = useCallback(async (): Promise<Racket[]> => {
    const token = await user?.getIdToken();

    try {
      const { data: apiRackets } = await axios.get<{ rackets: ApiRackets[] }>(
        `${apiUrl}rackets`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const rackets = apiRackets.rackets.map<Racket>(
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
        }),
      );
      return rackets;
    } catch {
      throw new Error("Can't get any robot");
    }
  }, [user]);

  return { getRackets };
};

export default useRacketsApi;
