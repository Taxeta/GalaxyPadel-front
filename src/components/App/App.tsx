import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = (): React.ReactElement => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/rackets"
            element={
              <ProtectedRoute>
                <Navigate to="/rackets" />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
