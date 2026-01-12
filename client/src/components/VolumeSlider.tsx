import type { ChangeEvent } from "react";
import { LuVolumeX, LuVolume2, LuVolume1 } from "react-icons/lu";

interface props {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const VolumeSlider = ({ volume, setVolume, audioRef }: props) => {
  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    if (!audioRef.current) {
      return;
    }
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  return (
    <div className="flex items-center justify-end w-1/3 gap-2 sm:gap-4">
      <div className="flex items-center gap-2 w-24 group">
        <button
          onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
          className="text-zinc-400 hover:text-white"
        >
          {volume === 0 ? (
            <LuVolumeX size={18} />
          ) : volume < 0.5 ? (
            <LuVolume1 size={18} />
          ) : (
            <LuVolume2 size={18} />
          )}
        </button>
        <input
          onChange={handleVolume}
          type="range"
          min={0}
          max={1}
          value={volume}
          step={0.01}
          style={{
            background: `linear-gradient(to right,
      #8A00C4  0%,
      #F200FF ${volume * 100}%,
      #593678 ${volume * 100}%,
      #593678 100%)`,
          }}
          className="w-full h-1 bg-zinc-600 rounded-lg appearance-none cursor-pointer accent-white group-hover:accent-[#BD53D4]"
        />
      </div>
    </div>
  );
};

export default VolumeSlider;
