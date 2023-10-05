import { lazy, useEffect } from "react";
import RacketsList from "../../components/RacketsList/RacketsList";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadRacketsActionCreator } from "../../store/rackets/racketsSlice";
import "./RacketsPage.css";
import useRacketsApi from "../../hooks/useRacketsApi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Loading from "../../components/Loading/Loading";
import NoRackets from "../../components/NoRackets/NoRackets";

export const RacketsPagePreload = lazy(() => import("./RacketsPage"));

const RacketsPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getRackets } = useRacketsApi();
  const [user, loading] = useAuthState(auth);

  const isLoading = useAppSelector((state) => state.uiState.isLoading);
  const rackets = useAppSelector((state) => state.racketsState.rackets);

  const preloadImages = (image: string) => {
    const preloadImageLink = document.createElement("link");
    preloadImageLink.href = image;
    preloadImageLink.as = "image";
    document.head.appendChild(preloadImageLink);
  };

  const hasRackets = rackets.length > 0;

  useEffect(() => {
    document.title = "Rackets List";
    if (user) {
      (async () => {
        const rackets = await getRackets();
        dispatch(loadRacketsActionCreator(rackets!));

        preloadImages(rackets![0].image);
      })();
    }
  }, [dispatch, getRackets, user]);

  return (
    <div className="list-page">
      {isLoading && <Loading />}
      {hasRackets
        ? !loading && (
            <>
              <h1 className="list-page__title">Padel Professional Rackets</h1>
              <RacketsList />
            </>
          )
        : !isLoading && !loading && <NoRackets />}
    </div>
  );
};

export default RacketsPage;
