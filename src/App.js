import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import EachJob from "./components/EachJob";
import Post from "./components/Post";
import MapComponent from "./components/Search_map";
import Request from "./components/Request";
import { useTranslation } from "react-i18next";
import GetRequest from "./components/Get_request";

function App() {
  const [t, i18n] = useTranslation();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login t={t} i18n={i18n} />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Home t={t} />} />

        <Route path="/findjob/:field" element={<EachJob t={t} />} />

        <Route path="/post" element={<Post t={t} />} />

        <Route path="/search" element={<MapComponent />} />

        <Route path="/request" element={<Request t={t} />} />

        <Route path="/getrequest" element={<GetRequest t={t} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
