import { useEffect, useState, useMemo } from "react";
import type { Song } from "../types/song";
import { useModalContext } from "../context/ModalContext";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { FaCircleCheck, FaCirclePlus } from "react-icons/fa6";

interface Playlist {
    id: number;
    name: string;
    created_at: string;
    description: string;
    user: {
        id: number;
        username: string;
    };
    songs: Track[];
    is_public: boolean;
    user_id: number;
}
interface Track {
    added_at: string;
    id: number;
    playlist_id: number;
    position: number;
    song_id: number;
    song: Song;
}

const AddToPlaylistModal = ({ song }: { song: Song }) => {
    const { user } = useAuth();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const [loading, setLoading] = useState(true);

    const { closeModal } = useModalContext();
    const { showToast } = useToast();

    const playlistsWithSong = useMemo(() => {
        const map = new Set<number>();

        playlists.forEach((playlist) => {
            playlist.songs.forEach((track) => {
                if (track.song_id === song.id) {
                    map.add(playlist.id);
                }
            });
        });

        return map;
    }, [playlists, song.id]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            if (!user) return;
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/playlists/user/${user.id}`,
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Failed to load playlists");
                }

                setPlaylists(data);
            } catch (error) {
                console.error(error);
                showToast("Error al cargar playlists", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, [user]);
    console.log("esta es la cancion: " + song.id);

    const handleAdd = async (playlistId: number) => {
        if (!user) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/playlists/${playlistId}/songs`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ song_id: song.id }),
                },
            );

            if (!response.ok) {
                throw new Error("No se pudo agregar la canción");
            }

            setPlaylists((prev) =>
                prev.map((p) =>
                    p.id === playlistId
                        ? {
                            ...p,
                            songs: [
                                ...p.songs,
                                {
                                    song_id: song.id,
                                    id: Date.now(),
                                    playlist_id: playlistId,
                                    added_at: new Date().toISOString(),
                                    position: p.songs.length + 1,
                                    song,
                                },
                            ],
                        }
                        : p,
                ),
            );

            showToast("Canción agregada", "success");
            closeModal();
        } catch (error: any) {
            showToast(error.message, "error");
        }
    };

    const handleRemove = async (playlistId: number) => {
        if (!playlistId) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/playlists/${playlistId}/songs/${song.id}`,
                { method: "DELETE" },
            );

            if (!response.ok) {
                throw new Error("Failed to remove song from playlist");
            }
            setPlaylists((prev) =>
                prev.map((p) =>
                    p.id === playlistId
                        ? {
                            ...p,
                            songs: p.songs.filter((s) => s.song_id !== song.id),
                        }
                        : p,
                ),
            );
            showToast("Cancion Eliminada", "error");
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-[350px]">
            <h2 className="text-xl font-bold">Agregar a playlist</h2>

            {loading ? (
                <div className="text-white/60">Cargando playlists...</div>
            ) : playlists.length === 0 ? (
                <div className="text-white/60">No tienes playlists</div>
            ) : (
                <ul className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
                    {playlists.map((playlist) => {
                        const containsSong = playlistsWithSong.has(playlist.id);

                        return (
                            <li
                                key={playlist.id}
                                onClick={() =>
                                    containsSong
                                        ? handleRemove(playlist.id)
                                        : handleAdd(playlist.id)
                                }
                                className="px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                {containsSong ? <><FaCircleCheck className="w-4 h-4 fill-[#a855f7]" /> {playlist.name}</> : <><FaCirclePlus className="w-4 h-4 fill-neutral-500" /> {playlist.name}</>}
                            </li>
                        );
                    })}
                </ul>
            )}

            <button
                onClick={closeModal}
                className="text-white/60 hover:text-white text-sm self-end border px-2 py-1 rounded-lg cursor-pointer hover:bg-neutral-600"
            >
                Cancelar
            </button>
        </div>
    );
};
export default AddToPlaylistModal;
