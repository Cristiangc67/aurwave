import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import PlaylistItem from "../components/PlaylistItem"
import { useAuth } from "../context/AuthContext"
import type { Song } from "../types/song"
import { useNavigate, useSearchParams } from "react-router"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


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
    const [limit, setLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(0)

    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("page")) || 1

    const { user, loading: authLoading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (authLoading) return

        if (!user) {
            navigate("/auth/login")
            return
        }

        const fetchPlaylists = async (userId: number) => {
            setLoading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/playlists/user/${userId}?page=${page}&limit=${limit}`)
                const json = await response.json()


                setPlaylists(json.playlists)
                setTotalPages(json.pagination.totalPages)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchPlaylists(Number(user.id))

    }, [user?.id, page, limit, navigate, authLoading])

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setSearchParams({ page: newPage.toString() })
        }
    }
    if (authLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-purple-radial">
                <Loader />
            </div>
        )
    }

    return (
        <div className="bg-purple-radial w-full p-10">
            <div>

                <div>
                    <h1 className="text-4xl font-bold mb-10">Playlists</h1>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {playlists?.map((playlist: Playlist) => (
                                <PlaylistItem key={playlist.id} playlist={playlist} />
                            ))}
                        </div>
                    )}

                    {totalPages > 0 && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className="px-4 py-2 bg-purple-500 rounded-lg mr-2 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                            >
                                <FaChevronLeft />
                            </button>


                            <span className="flex items-center px-4 text-white font-semibold">
                                {page} / {totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                                className="px-4 py-2 bg-purple-500 rounded-lg ml-2 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Library