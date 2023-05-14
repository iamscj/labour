import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EachJob from "./components/EachJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/findjob/:field" element={<EachJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
