import { usePlayerContext } from "../context/PlayerContext";

const TrackInfo = () => {
  const { currentTrack } = usePlayerContext();

  return (
    <div className="flex items-center gap-4 w-1/3 min-w-[120px]">
      {currentTrack && (
        <img
          src={currentTrack?.album?.cover_url}
          alt=""
          className="h-14 w-14 rounded shadow object-cover hidden sm:block"
        />
      )}
      <div className="flex flex-col justify-center overflow-hidden">
        <span className="text-sm font-medium hover:underline cursor-pointer truncate text-white">
          {currentTrack?.title}
        </span>
        <span className="text-xs text-zinc-400 hover:text-white hover:underline cursor-pointer transition">
          {currentTrack?.artist?.name}
        </span>
      </div>
    </div>
  );
};

export default TrackInfo;
