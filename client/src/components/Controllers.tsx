import { IoMdSkipForward, IoMdSkipBackward } from "react-icons/io";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";

interface Props {
  handlePlayPause: VoidFunction;
  isPlaying: Boolean;
}

const Controllers = ({ handlePlayPause, isPlaying }: Props) => {
  return (
    <div className="flex gap-3 items-center">
      <IoMdSkipBackward className="w-7 h-7 fill-[#6b418f]" />
      <button className="cursor-pointer" onClick={handlePlayPause}>
        {isPlaying ? (
          <FaCirclePause className="w-10 h-10 drop-shadow-[0_0_9px_#9E37C3] fill-[#DE41E9]" />
        ) : (
          <FaCirclePlay className="w-10 h-10 drop-shadow-[0_0_9px_#9E37C3] fill-[#DE41E9]" />
        )}
      </button>
      <IoMdSkipForward className="w-7 h-7 fill-[#6b418f]" />
    </div>
  );
};

export default Controllers;
