import type { IconType } from "react-icons";
import { Link } from "react-router";
interface Props {
  text: string;
  icon: IconType;
  to: string;
  active: boolean;
  setActive: (active: string) => void;
}

const ButtonSidebar = ({ text, icon: Icon, to, active, setActive }: Props) => {
  return (
    <Link to={to} onClick={() => setActive(to.slice(1))} className={`group transition-all duration-100 ease-in-out  cursor-pointer rounded-lg h-fit flex items-center justify-start gap-4 p-3  w-full ${active ? "bg-white/5 border-s-2  border-s-[#a855f7]" : "hover:bg-white/5"}`}>
      <Icon size={25} className={`w-8  text-[#593678] ${active ? "text-[#a855f7]" : "text-neutral-400 group-hover:text-neutral-100"}`} />
      <span className={`hidden lg:block font-semibold text-lg text-[#593678]  text-center ${active ? "text-[#a855f7]" : "text-neutral-400 group-hover:text-neutral-100"}`}>
        {text}
      </span>
    </Link>
  );
};

export default ButtonSidebar;
