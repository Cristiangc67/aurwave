import type { IconType } from "react-icons";
import { Link } from "react-router";
interface Props {
  text: string;
  icon: IconType;
  to: string;
}

const ButtonSidebar = ({ text, icon: Icon, to }: Props) => {
  return (
    <Link to={to} className="group hover:bg-[#401866] cursor-pointer rounded-2xl w-9/12 aspect-square flex flex-col items-center justify-center gap-1 p-1">
      <Icon className="w-7 h-7 group-hover:text-[#9E37C3] text-[#593678] group-hover:drop-shadow-[0_0_9px_#9E37C3]" />
      <p className="text-sm group-hover:text-[#9E37C3] text-[#593678] group-hover:drop-shadow-[0_0_9px_#9E37C3] text-center">
        {text}
      </p>
    </Link>
  );
};

export default ButtonSidebar;
