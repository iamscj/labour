import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import EachJob from "./components/EachJob";
import Post from "./components/Post";
import MapComponent from "./components/Search_map";
import Request from "./components/Request";
import { useTranslation } from "react-i18next";
import GetRequest from "./components/Get_request";

const PrivateRoute = async () => {

  return ? (
    <>
     
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  
  const [t, i18n] = useTranslation();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login  t={t} i18n={i18n} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={<PrivateRoute  />}
        >
          <Route path="/" element={<Home t={t} />} />
        </Route>
        <Route
          path="/findjob/:field"
          element={<PrivateRoute  />}
        >
          <Route path="/findjob/:field" element={<EachJob />} />
        </Route>
        <Route
          path="/post"
          element={<PrivateRoute  />}
        >
          <Route path="/post" element={<Post />} />
        </Route>
        <Route
          path="/search"
          element={<PrivateRoute  />}
        >
          <Route path="/search" element={<MapComponent />} />
        </Route>
        <Route
          path="/request"
          element={<PrivateRoute  />}
        >
          <Route path="/request" element={<Request />} />
        </Route>

        <Route
          path="/getrequest"
          element={<PrivateRoute  />}
        >
          <Route path="/getrequest" element={<GetRequest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
