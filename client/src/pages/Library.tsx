import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import PlaylistItem from "../components/PlaylistItem"
import { useAuth } from "../context/AuthContext"
import type { Song } from "../types/song"
import { useNavigate } from "react-router"
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



const Library = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        /* if (!user) {
            navigate("/auth/login")
            return
        } */

        const fetchPlaylists = async (userId: number) => {
            try {
                const response = await fetch(`http://localhost:3000/api/playlists/user/${userId}`)
                const data = await response.json()
                setPlaylists(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        if (!user) return
        fetchPlaylists(Number(user.id))
    }, [user?.id])

    return (
        <div className="bg-purple-radial w-full p-10">
            <div>
                <div>
                    <h1 className="text-4xl font-bold mb-10">Playlists</h1>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {playlists.map((playlist: Playlist) => (
                                <PlaylistItem key={playlist.id} playlist={playlist} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Library