import type { ChangeEvent } from "react";

interface props {
  progress: number;
  duration: number;
  handleSeek: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Slider = ({ progress, duration, handleSeek }: props) => {
  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className="flex items-center gap-2 w-full text-xs font-mono text-zinc-400">
      <span className="min-w-10 text-right">{formatTime(progress)}</span>
      <input
        type="range"
        min={0}
        max={duration}
        value={progress}
        onChange={handleSeek}
        style={{
          background: `linear-gradient(to right,
      #8A00C4  0%,
      #F200FF ${(progress / duration) * 100}%,
      #593678 ${(progress / duration) * 100}%,
      #593678 100%)`,
        }}
        className="flex-1 h-1 bg-zinc-600 rounded-lg appearance-none cursor-pointer accent-white drop-shadow-[0_0_9px_#9E37C3] hover:accent-[#BD53D4]"
      />
      <span className="min-w-10">{formatTime(duration)}</span>
    </div>
  );
};

export default Slider;
