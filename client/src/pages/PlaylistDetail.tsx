import { useEffect, useState } from "react"
import { useParams } from "react-router"

interface Playlist {
    id: number
    name: string
    description: string
    user: {
        id: number
        username: string
    }
    songs: any[]
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
                console.log(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPlaylist()
    }, [id])


    return (loading ? (
        <p>Loading...</p>
    ) : (
        <div>
            <h1>Playlist: {id}</h1>
            <p>Owner: {playlist?.user?.username}</p>
            <p>Description: {playlist?.description}</p>
            <div>
                <div>
                    <button>Play</button>
                </div>
                <div></div>

            </div>
        </div>
    )
    )
}


export default PlaylistDetail