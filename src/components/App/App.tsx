import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RacketsPage from "../../pages/RacketsPage/RacketsPage";
import paths from "../../paths/paths";

const App = (): React.ReactElement => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path={paths.root} element={<Navigate to={paths.home} />} />
          <Route path={paths.home} element={<HomePage />} />
          <Route
            path={paths.rackets}
            element={
              <ProtectedRoute>
                <RacketsPage />
                <Navigate to={paths.rackets} />
              </ProtectedRoute>
            }
          />
          <Route path={paths.root} element={<Navigate to={paths.home} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
