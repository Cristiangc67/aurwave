import logo from "../assets/aurwave.svg";
import { MdLibraryMusic, MdSearch, MdAddBox } from "react-icons/md";
import ButtonSidebar from "./ButtonSidebar";
import UserLoginButton from "./UserLoginButton";
import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState("library")
  return (
    <aside className="w-20 lg:w-64 shrink-0 bg-surface-dark border-r border-white/5 flex flex-col justify-between py-6 z-20 bg-[#121212]">
      <div className="flex flex-col items-center w-full gap-5">
        <div className="px-6 mb-8 flex items-center gap-3">
          <img src={logo} alt="" className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white neon-glow shadow-lg shadow-purple-900/20" />
          <span className="hidden lg:block font-bold text-xl tracking-tight text-white">Aurwave</span>
        </div>

        <nav className="flex flex-col items-center justify-center gap-2 space-y-1 px-3 w-full">
          <ButtonSidebar setActive={setActive} to="/library" text="Biblioteca" icon={MdLibraryMusic} active={active === "library"} />
          <ButtonSidebar setActive={setActive} to="/" text="Buscar" icon={MdSearch} active={active === "search"} />
          <ButtonSidebar setActive={setActive} to="/create-playlist" text="Crear Playlist" icon={MdAddBox} active={active === "create-playlist"} />
        </nav>
      </div>
      <UserLoginButton />
    </aside>
  );
};

export default Sidebar;
