import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RacketsPage from "../../pages/RacketsPage/RacketsPage";
import paths from "../../paths/paths";
import { Suspense } from "react";

const App = (): React.ReactElement => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route
            path={paths.root}
            element={
              <Suspense>
                <Navigate to={paths.home} />
              </Suspense>
            }
          />
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
        </Routes>
      </main>
    </>
  );
};

export default App;
