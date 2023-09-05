import Header from "../Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";

const App = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
