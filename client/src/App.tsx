import "./App.css";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePlaylist from "./pages/CreatePlaylist";
import Profile from "./pages/Profile";
import { useRef } from "react";

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);


  return (
    <BrowserRouter>
      <div className="flex relative">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={<Home audioRef={audioRef} />}
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
        </Routes>
      </div>
      <Player
        audioRef={audioRef}
      />
    </BrowserRouter>
  );
}

export default App;
