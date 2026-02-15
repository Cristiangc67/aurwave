import { useEffect, useState } from "react";
import type { Song } from "../types/song";
import Loader from "../components/Loader";

import TrackItem from "../components/TrackItem";





const Home = () => {


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



  return (
    <div className="bg-transparent w-full p-10">
      {loading ? <Loader /> : <ul className="space-y-4">
        {data.map((song) => (
          <TrackItem key={song.id} song={song} />
        ))}
      </ul>}
    </div>
  );
};

export default Home;
