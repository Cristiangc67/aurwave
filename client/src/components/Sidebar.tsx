import logo from "../assets/aurwave.svg";
import { LuLibrary, LuGlobe, LuPlus } from "react-icons/lu";
import ButtonSidebar from "./ButtonSidebar";
const Sidebar = () => {
  return (
    <nav className="z-50 w-30 min-h-[90vh] max-h-dvh bg-[#271346] pt-10">
      <div className="bg-black w-fit h-fit rounded-2xl mx-auto">
        <img src={logo} alt="" className="w-20 h-20" />
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <ButtonSidebar to="/" text="Biblioteca" icon={LuLibrary} />
        <ButtonSidebar to="/" text="Buscar" icon={LuGlobe} />
        <ButtonSidebar to="/create-playlist" text="Crear Playlist" icon={LuPlus} />
      </div>
    </nav>
  );
};

export default Sidebar;
