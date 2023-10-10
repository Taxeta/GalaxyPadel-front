import { lazy, useEffect, useState } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);

  const isLoading = useAppSelector((state) => state.uiState.isLoading);
  const rackets = useAppSelector((state) => state.racketsState.rackets);

  const pageSize = 10;
  const firstItemPage = (currentPage - 1) * pageSize;
  const visibleRackets = rackets.slice(0, firstItemPage + pageSize);
  const hasRackets = visibleRackets.length > 0;

  const preloadImages = (image: string) => {
    const preloadImageLink = document.createElement("link");
    preloadImageLink.href = image;
    preloadImageLink.as = "image";
    document.head.appendChild(preloadImageLink);
  };

  const newPageScroll = () => {
    const scrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight;

    if (scrolledToBottom) {
      setCurrentPage((previousPage) => previousPage + 1);
    }
  };

  useEffect(() => {
    document.title = "Rackets List";

    if (user) {
      (async () => {
        const rackets = await getRackets(currentPage, pageSize);
        if (rackets && rackets.length > 0) {
          dispatch(loadRacketsActionCreator(rackets));

          preloadImages(rackets[0].image);
        }
      })();
    }

    window.addEventListener("scroll", newPageScroll);

    return () => window.removeEventListener("scroll", newPageScroll);
  }, [dispatch, getRackets, user, currentPage, pageSize]);

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
