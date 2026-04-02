import { useEffect, useState } from "react";
import type { Song } from "../types/song";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

import TrackItem from "../components/TrackItem";





const Home = () => {


  const [data, setData] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<Song[]>([]);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`);
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
      <SearchBar setSearchResult={setSearchResult} />
      {loading ? <Loader /> : <ul className="space-y-4">
        {searchResult.length > 0 ? searchResult.map((song) => (
          <TrackItem key={song.id} song={song} />
        )) : data.map((song) => (
          <TrackItem key={song.id} song={song} />
        ))}
      </ul>}
    </div>
  );
};

export default Home;
