import { useEffect, useState } from "react"
import PlaylistItem from "../components/PlaylistItem"
import { useAuth } from "../context/AuthContext"


const Library = () => {
    const [playlists, setPlaylists] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()

    useEffect(() => {
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
        <div className="bg-linear-to-b from-[#9f2ea7] to-[#1a1130] w-full p-10">
            <div>
                <div>
                    <h1 className="text-4xl font-bold mb-10">Playlists</h1>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        playlists.map((playlist: any) => (
                            <PlaylistItem key={playlist.id} id={playlist.id} title={playlist.name} owner={playlist.user.username} playlist={playlist.songs} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Library