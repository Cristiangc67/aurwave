import { usePlayerContext } from "../context/PlayerContext";
import Controllers from "./Controllers";
import Slider from "./Slider";
import TrackInfo from "./TrackInfo";
import VolumeSlider from "./VolumeSlider";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

interface props {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  //isPlaying: Boolean;
  //setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const Player = ({ audioRef, }: props) => {
   const { isPlaying,setIsPlaying,currentTrack  } = usePlayerContext();
  
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((e) => console.error("Error playing:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) {
      return;
    }

    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setProgress(current);
    setDuration(dur);

    // Auto next track logic could go here
    /* if (current === dur) {
       handleNext();
    } */
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  return (
    <footer className="w-dvw h-[10vh] px-4 bg-[#271346] z-50 border-t-4 border-solid border-[#BD53D4] bottom-0 drop-shadow-[0_-2px_9px_#9E37C3] flex  ">
      <audio
        ref={audioRef}
        src={currentTrack?.file_url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnd}
      />
      <TrackInfo />

      <div className=" flex flex-col items-center w-1/3 min-w-[120px] gap-3 py-3">
        <Controllers isPlaying={isPlaying} handlePlayPause={handlePlayPause} />
        <Slider
          handleSeek={handleSeek}
          duration={duration}
          progress={progress}
        />
      </div>
      <VolumeSlider volume={volume} setVolume={setVolume} audioRef={audioRef} />
    </footer>
  );
};

export default Player;
