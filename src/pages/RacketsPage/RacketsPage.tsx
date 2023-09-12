import { lazy, useEffect } from "react";
import RacketsList from "../../components/RacketsList/RacketsList";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadRacketsActionCreator } from "../../store/rackets/racketsSlice";
import "./RacketsPage.css";
import useRacketsApi from "../../hooks/useRacketsApi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Loading from "../../components/Loading/Loading";
import FeedBack from "../../components/Feedback/Feedback";
import { showInfoToast } from "../../components/Feedback/Toast";

export const RacketsPagePreload = lazy(() => import("./RacketsPage"));

const RacketsPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getRackets } = useRacketsApi();
  const [user] = useAuthState(auth);
  const isLoading = useAppSelector((state) => state.uiState.isLoading);

  useEffect(() => {
    (async () => {
      if (user) {
        showInfoToast(`Welcome ${user?.displayName}!`);
        const rackets = await getRackets();
        dispatch(loadRacketsActionCreator(rackets!));
      }
    })();
  }, [dispatch, getRackets, user]);

  return (
    <div className="list-page">
      <FeedBack />
      <h1 className="list-page__title">Padel Professional Rackets</h1>
      {isLoading && <Loading />}
      <RacketsList />
    </div>
  );
};

export default RacketsPage;
