import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";

const App = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element />
          <Route path="/home" element />
        </Routes>
      </main>
    </div>
  );
};

export default App;
