import { LuPlay } from "react-icons/lu";
import { usePlayerContext } from "../context/PlayerContext";
import type { Song } from "../types/song";
import { Link } from "react-router";

interface Playlist {
    id: number
    name: string
    created_at: string
    description: string
    user: {
        id: number
        username: string
    }
    songs: Track[]
    is_public: boolean
    user_id: number
}
interface Track {
    added_at: string
    id: number
    playlist_id: number
    position: number
    song_id: number
    song: Song
}

interface Props {
    playlist: Playlist
}



const PlaylistItem = ({ playlist }: Props) => {
    const { playFromPlaylist } = usePlayerContext()

    /* const pickPlaylist = () => {
        playFromPlaylist(playlist.songs[0].song, playlist.songs.map(s => s.song))
    }; */
    return (
        <div className="relative group">
            <Link to={`/playlist/${playlist.id}`} className=" text-start border border-white/5 bg-[#18181b] hover:bg-[#27272a] p-4 rounded-2xl  cursor-pointer  flex flex-col transition-all duration-300">
                <div className="aspect-square rounded-xl overflow-hidden mb-4 relative shadow-lg bg-black">
                    <img className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-60 transition-all duration-500" src="https://picsum.photos/200" alt="" />

                </div>
                <div className="flex flex-col w-fit">
                    <h1 className="text-2xl font-bold group-hover:text-[#A855F7]">{playlist.name}</h1>
                    <p className=" text-gray-400">{playlist.user.username}</p>
                </div>

            </Link>
            <button onClick={() => playFromPlaylist(playlist.songs[0].song, playlist.songs.map(s => s.song))}
                className="group-hover:opacity-100 opacity-0 z-10 transition-all duration-300 absolute bottom-3 right-3 transform translate-y-6 group-hover:translate-y-0  bg-[#a855f7] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-110"><LuPlay className="fill-black stroke-black " size={24} /></button>
        </div>
    )
}

export default PlaylistItem