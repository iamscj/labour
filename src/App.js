import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EachJob from "./components/EachJob";
import Post from "./components/Post";
import MapComponent from "./components/Search_map";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/findjob/:field" element={<EachJob />} />
        <Route path="/post" element={<Post />} />
        <Route path="/search" element={<MapComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
