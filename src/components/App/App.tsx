import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RacketsPage from "../../pages/RacketsPage/RacketsPage";
import paths from "../../paths/paths";
import { Suspense } from "react";
import { ErrorPagePreload } from "../../pages/ErrorPage/ErrorPage";

const App = (): React.ReactElement => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path={paths.root} element={<Navigate to={paths.home} />} />

          <Route
            path={paths.home}
            element={
              <Suspense>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path={paths.rackets}
            element={
              <ProtectedRoute>
                <Suspense>
                  <RacketsPage />
                  <Navigate to={paths.rackets} />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path={paths.errorPage}
            element={
              <Suspense>
                <ErrorPagePreload />
              </Suspense>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
