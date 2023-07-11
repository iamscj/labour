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

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login isUserAuthenticated={isUserAuthenticated} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/" element={<Home />} />
        </Route>
        <Route
          path="/findjob/:field"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/findjob/:field" element={<EachJob />} />
        </Route>
        <Route
          path="/post"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/post" element={<Post />} />
        </Route>
        <Route
          path="/search"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/search" element={<MapComponent />} />
        </Route>
        <Route
          path="/request"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/request" element={<Request />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
