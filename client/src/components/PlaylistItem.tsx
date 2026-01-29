import { LuPlay } from "react-icons/lu";
import { usePlayerContext } from "../context/PlayerContext";
import type { Song } from "../types/song";
import { Link } from "react-router";

interface Props {
    id: number
    title: string
    owner: string
    playlist: Song[]

}



const PlaylistItem = ({ id, title, owner, playlist }: Props) => {
    const { playFromPlaylist, audioRef } = usePlayerContext()

    const pickPlaylist = () => {
        playFromPlaylist(playlist[0], playlist)
        setTimeout(() => {
            audioRef.current?.play();
        }, 100);
    };
    return (
        <div className="relative w-fit h-fit group">
            <Link to={`/playlist/${id}`} className=" text-start   border-lg border-[rgb(53,35,97)]/30 hover:bg-[#1a1130]/50 p-4 rounded-lg transition-colors cursor-pointer  flex flex-col">
                <div className="flex relative items-center aspect-square w-52 h-52 overflow-hidden rounded-lg">
                    <img className="object-cover w-full " src="https://picsum.photos/200" alt="" />

                </div>
                <div className="flex flex-col w-fit hover:underline">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className=" text-gray-400">{owner}</p>
                </div>

            </Link>
            <button onClick={() => pickPlaylist()} className="group-hover:opacity-100 opacity-0 transition-opacity absolute bottom-0 right-0 transform -translate-x-1/2 -translate-y-3 bg-[#d13ddb] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"><LuPlay className="fill-black stroke-black " size={24} /></button>

        </div>
    )
}

export default PlaylistItem