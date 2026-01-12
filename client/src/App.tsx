import "./App.css";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import CreatePlaylist from "./pages/CreatePlaylist";
import { useRef } from "react";

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);


  return (
    <BrowserRouter>
      <div className="flex">
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
        </Routes>
      </div>
      <Player
        audioRef={audioRef}
      />
    </BrowserRouter>
  );
}

export default App;
