import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

const App = (): React.ReactElement => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/mainpage" />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
