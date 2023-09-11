import { useEffect } from "react";
import RacketsList from "../../components/RacketsList/RacketsList";
import { useAppDispatch } from "../../store";
import { loadRacketsActionCreator } from "../../store/Rackets/racketsSlice";
import "./RacketsPage.css";
import useRacketsApi from "../../hooks/useRacketsApi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

const RacketsPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getRackets } = useRacketsApi();
  const [user] = useAuthState(auth);

  useEffect(() => {
    (async () => {
      if (user) {
        const rackets = await getRackets();

        dispatch(loadRacketsActionCreator(rackets));
      }
    })();
  }, [dispatch, getRackets, user]);

  return (
    <div className="list-page">
      <h2 className="list-page__title">Padel Professional Rackets</h2>
      <RacketsList />
    </div>
  );
};

export default RacketsPage;
