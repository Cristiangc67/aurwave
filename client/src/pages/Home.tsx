import { useEffect, useState } from "react";
import type { Song } from "../types/song";
import { usePlayerContext } from "../context/PlayerContext";





const Home = () => {
  const { playSingleTrack, audioRef } = usePlayerContext();

  const [data, setData] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/songs");
      if (!res.ok) throw new Error("Error fetching songs");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const pickSong = (track: Song) => {
    playSingleTrack(track)
    setTimeout(() => {
      audioRef.current?.play();
    }, 100);
  };

  return (
    <div className="bg-[#1A1130] w-full p-10">
      {loading && <p className="text-white">Loading...</p>}
      <ul className="space-y-4">
        {data.map((song) => (
          <li
            key={song.id}
            onClick={() => pickSong(song)}
            className="flex items-center gap-4 bg-[#241845] p-4 rounded-lg"
          >
            <img
              src={song.album.cover_url}
              alt={song.album.title}
              className="w-14 h-14 rounded object-cover"
            />

            <div className="flex-1">
              <p className="text-white font-semibold">{song.title}</p>
              <p className="text-sm text-gray-400">
                {song.artist.name} • {song.album.title}
              </p>
            </div>

            <span className="text-gray-400 text-sm">
              {Math.floor(song.duration / 60)}:
              {(song.duration % 60).toString().padStart(2, "0")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
