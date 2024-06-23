import "./App.css";
import "../styles/style.css";
// import Navbar from "../components/Navbar";
import Payment from "../components/Payment";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Result from "../pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
