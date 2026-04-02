import { useEffect, useRef, useState } from "react";
import { LuEllipsis } from "react-icons/lu";
import type { Song } from "../types/song";
import { useModalContext } from "../context/ModalContext";
import AddToPlaylistModal from "./addToPlaylistModal";
import { usePlayerContext } from "../context/PlayerContext";
import { useToast } from "../context/ToastContext";

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

interface Props {
    song: Song
    playlistId?: number
    onRemovedFromPlaylist?: (songId: number) => void
    setPlaylist?: React.Dispatch<React.SetStateAction<Playlist | null>>
}




const OptionsButton = ({ song, playlistId, onRemovedFromPlaylist, setPlaylist }: Props) => {

    const optionsRef = useRef<HTMLUListElement>(null)
    const { openModal } = useModalContext()
    const { addToQueue, queue } = usePlayerContext()
    const [isAdded, setIsAdded] = useState(queue.includes(song))
    const { showToast } = useToast()



    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                optionsRef.current.classList.add("hidden")
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])



    const removeFromPlaylist = async () => {
        if (!playlistId) return

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/playlists/${playlistId}/songs/${song.id}`,
                { method: "DELETE" }
            )

            if (!response.ok) {
                throw new Error("Failed to remove song from playlist")
            }


            setPlaylist?.((prev) => {
                if (!prev) return prev
                return {
                    ...prev,
                    songs: prev.songs.filter((s) => s.song_id !== song.id),
                }
            })

            onRemovedFromPlaylist?.(song.id)
        } catch (error) {
            console.error(error)
        }
    }


    const handleAddToQueue = () => {
        try {
            addToQueue(song)
            setIsAdded(true)
            showToast("Canción agregada a la cola", "success")
        } catch (error) {
            console.error(error)
            showToast("Error al agregar canción a la cola", "error")
        }
    }


    return (
        <button className="col-span-1 flex items-center justify-center group me-5 cursor-pointer relative" onClick={() => optionsRef.current?.classList.remove("hidden")}>
            <LuEllipsis size={25} className="group-hover:text-white transition-all group-hover:scale-x-110  duration-300" />
            <ul
                ref={optionsRef}
                className="hidden absolute z-10 border border-gray-600/20 bg-[#352366]/10 rounded-lg shadow-lg right-0 px-3 py-2 text-nowrap backdrop-blur-xs "
            >
                <li className="hover:bg-[#241845]/50 transition-colors w-full px-2 rounded-sm">
                    Play
                </li>

                {!isAdded && (
                    <li onClick={() => handleAddToQueue()} className="hover:bg-[#241845]/50 transition-colors w-full px-2 rounded-sm">
                        Agregar a cola
                    </li>
                )}

                {playlistId ? (
                    <li
                        onClick={removeFromPlaylist}
                        className="hover:bg-[#241845]/50 transition-colors w-full px-2 rounded-sm text-red-400"
                    >
                        Eliminar de Playlist
                    </li>
                ) : (
                    <li onClick={() => openModal(<AddToPlaylistModal song={song} />)} className="hover:bg-[#241845]/50 transition-colors w-full px-2 rounded-sm">
                        Agregar a Playlist
                    </li>
                )}
            </ul>

        </button>
    )
}

export default OptionsButton