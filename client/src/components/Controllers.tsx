import { IoMdSkipForward, IoMdSkipBackward } from "react-icons/io";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { usePlayerContext } from "../context/PlayerContext";

interface Props {
  isPlaying: Boolean;
}

const Controllers = ({ isPlaying }: Props) => {
  const { handlePrevious, handleNext, togglePlay } = usePlayerContext();
  return (
    <div className="flex gap-3 items-center">
      <button className="cursor-pointer" onClick={handlePrevious}><IoMdSkipBackward className="w-7 h-7 fill-[#6b418f]" /></button>
      <button className="cursor-pointer" onClick={togglePlay}>
        {isPlaying ? (
          <FaCirclePause className="w-10 h-10 drop-shadow-[0_0_9px_#9E37C3] fill-[#DE41E9]" />
        ) : (
          <FaCirclePlay className="w-10 h-10 drop-shadow-[0_0_9px_#9E37C3] fill-[#DE41E9]" />
        )}
      </button>
      <button className="cursor-pointer" onClick={handleNext}><IoMdSkipForward className="w-7 h-7 fill-[#6b418f]" /></button>
    </div>
  );
};

export default Controllers;
