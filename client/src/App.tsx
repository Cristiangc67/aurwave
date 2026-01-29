import "./App.css";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePlaylist from "./pages/CreatePlaylist";
import Profile from "./pages/Profile";

import Library from "./pages/Library";
import PlaylistDetail from "./pages/PlaylistDetail";

function App() {



  return (
    <BrowserRouter>
      <div className="flex relative">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/create-playlist"
            element={<CreatePlaylist />}
          />
          <Route
            path="/auth/login"
            element={<Login />}
          />
          <Route
            path="/auth/register"
            element={<Register />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/library"
            element={<Library />}
          />
          <Route
            path="/playlist/:id"
            element={<PlaylistDetail />}
          />
        </Routes>
      </div>
      <Player

      />
    </BrowserRouter>
  );
}

export default App;
