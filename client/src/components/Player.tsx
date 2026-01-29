import { usePlayerContext } from "../context/PlayerContext";
import Controllers from "./Controllers";
import Slider from "./Slider";
import TrackInfo from "./TrackInfo";
import VolumeSlider from "./VolumeSlider";
import { useState, type ChangeEvent } from "react";



const Player = () => {
  const { isPlaying, currentTrack, audioRef, handleNext, handleEnded } = usePlayerContext();

  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);




  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);



    // Auto next track logic could go here
    if (progress === duration) {
      handleNext();
    }
  };




  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };


  return (
    <footer className="w-dvw h-[10vh] px-4 bg-[#271346] z-50 border-t-4 border-solid border-[#BD53D4] bottom-0 drop-shadow-[0_-2px_9px_#9E37C3] flex  ">
      <audio
        onLoadedMetadata={handleLoadedMetadata}
        ref={audioRef}
        src={currentTrack?.file_url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <TrackInfo />

      <div className=" flex flex-col items-center w-1/3 min-w-[120px] gap-3 py-3">
        <Controllers isPlaying={isPlaying} />
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
