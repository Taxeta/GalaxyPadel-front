import { lazy, useEffect, useState, useCallback } from "react";
import RacketsList from "../../components/RacketsList/RacketsList";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadRacketsActionCreator } from "../../store/rackets/racketsSlice";
import "./RacketsPage.css";
import useRacketsApi from "../../hooks/useRacketsApi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Loading from "../../components/Loading/Loading";
import NoRackets from "../../components/NoRackets/NoRackets";
import useDebounce from "../../hooks/useDebounce";
import { setLoadingMoreActionCreator } from "../../store/pagination/paginationSlice";

export const RacketsPagePreload = lazy(() => import("./RacketsPage"));

const RacketsPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getRackets } = useRacketsApi();
  const [user, loading] = useAuthState(auth);

  const [currentPage, setCurrentPage] = useState(1);
  const debouncedCurrentPage = useDebounce(currentPage, 200);

  const isLoading = useAppSelector((state) => state.uiState.isLoading);
  const rackets = useAppSelector((state) => state.racketsState.rackets);
  const isLoadingMore = useAppSelector((state) => state.pagination.loadingMore);
  const totalRackets = useAppSelector((state) => state.pagination.totalRackets);

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

  const loadRacketsPage = useCallback(
    async (page: number) => {
      try {
        const rackets = await getRackets(page, pageSize);
        if (rackets && rackets.length > 0) {
          dispatch(loadRacketsActionCreator(rackets));
          preloadImages(rackets[0].image);
        }
      } catch {
        throw new Error("Error loading rackets for page:");
      }
    },
    [dispatch, getRackets],
  );

  const newPageScroll = useCallback(() => {
    const scrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight;

    const allRacketsLoaded = totalRackets === rackets.length;

    if (scrolledToBottom && !isLoading && !isLoadingMore && allRacketsLoaded) {
      dispatch(setLoadingMoreActionCreator(true));
      setCurrentPage((previousPage) => previousPage + 1);
    }
  }, [dispatch, isLoading, isLoadingMore, rackets.length, totalRackets]);

  useEffect(() => {
    document.title = "GalaxyPadel | Rackets List";

    if (user && isLoadingMore) {
      loadRacketsPage(debouncedCurrentPage);
      dispatch(setLoadingMoreActionCreator(false));
    }
  }, [
    dispatch,
    getRackets,
    user,
    debouncedCurrentPage,
    pageSize,
    isLoadingMore,
    loadRacketsPage,
  ]);

  useEffect(() => {
    if (user) {
      loadRacketsPage(currentPage);
    }
  }, [currentPage, user, pageSize, loadRacketsPage]);

  useEffect(() => {
    window.addEventListener("scroll", newPageScroll);

    return () => {
      window.removeEventListener("scroll", newPageScroll);
    };
  }, [newPageScroll]);

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
