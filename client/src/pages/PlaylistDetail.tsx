import { useEffect, useState } from "react"
import { useParams } from "react-router"
import TrackItem from "../components/TrackItem"
import { LuGlobe } from "react-icons/lu";
import type { Song } from "../types/song";
import Loader from "../components/Loader";
interface Track {
    added_at: string
    id: number
    playlist_id: number
    position: number
    song_id: number
    song: Song
}


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

const PlaylistDetail = () => {
    const [playlist, setPlaylist] = useState<Playlist | null>(null)
    const [loading, setLoading] = useState(true)


    const { id } = useParams()

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/playlists/${id}`)
                const data = await response.json()
                setPlaylist(data)

                console.log("playlistdetails", data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPlaylist()
    }, [id])


    return (loading ? (
        <Loader />
    ) : (
        <div className="w-screen h-[90vh] bg-transparent">

            <div className=" w-full h-[30vh] bg-linear-to-b from-purple-900/20 to-transparent flex items-center  px-10">
                <div className="w-52 h-52 rounded-lg overflow-hidden shadow-black/50 shadow-lg aspect-square">
                    <img className="w-full h-full object-cover " src="https://picsum.photos/200" alt="" />
                </div>
                <div className="w-3/4 h-fit flex flex-col gap-2 ps-10">
                    <p className="text-gray-400 font-semibold text-sm uppercase">Playlist</p>
                    <h1 className="text-7xl font-bold">{playlist?.name}</h1>
                    <p className="text-gray-400 text-sm">{playlist?.description}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-white">{playlist?.user?.username}</span>
                        <span>•</span>
                        <span className="flex items-center gap-2 text-gray-400"><LuGlobe className="inline" /> {playlist?.is_public ? "Publica" : "Privada"}</span>

                    </div>

                </div>
            </div>

            <div className="w-full h-fit p-10">
                <div className="grid grid-cols-12 border-b border-white/10 pb-2 mb-2 justify-around">

                    <span className="col-span-5 lg:col-span-4 ps-4">Titulo</span>
                    <span className="col-span-4 lg:col-span-5 lg:ps-4">Album</span>
                    <span className="col-span-1 lg:col-span-3">Duracion</span>
                </div>
                <ul className="space-y-4">
                    {playlist?.songs.map((track) => (
                        <TrackItem
                            key={track.id}
                            track={track}
                            playlist={playlist}
                        />
                    ))}

                </ul>
            </div>


        </div>
    )
    )
}


export default PlaylistDetail