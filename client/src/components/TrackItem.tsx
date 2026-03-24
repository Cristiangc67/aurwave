import type { Song } from "../types/song"
import { usePlayerContext } from "../context/PlayerContext"
import OptionsButton from "./OptionsButton";

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
    track?: Track
    song?: Song
    playlist?: Playlist
    setPlaylist?: React.Dispatch<React.SetStateAction<Playlist | null>>
}





const TrackItem = ({ track, song: propSong, playlist, setPlaylist }: Props) => {
    const { playSingleTrack, playFromPlaylist } = usePlayerContext()

    const song = track ? track.song : propSong

    if (!song) return null

    const formatTime = (duration?: number) => {
        if (!duration) return "0:00"
        const minutes = Math.floor(duration / 60)
        const seconds = Math.floor(duration % 60)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    return (
        <li className=" items-center grid grid-cols-12 justify-around bg-transparent rounded-lg hover:bg-[#241845]/30 transition-colors cursor-pointer">
            <div
                onClick={() =>
                    playlist
                        ? playFromPlaylist(song, playlist.songs.map(s => s.song))
                        : playSingleTrack(song)
                }
                className=" items-center px-4 py-2 w-11/12 col-span-11 grid grid-cols-12 "
            >
                <div className="flex items-center gap-4 col-span-6 lg:col-span-5">
                    <img
                        src={song.album?.cover_url}
                        alt={song.album?.title}
                        className="lg:w-14 lg:h-14 md:w-12 md:h-12 w-10 h-10 rounded object-cover col-span-1"
                    />

                    <div className="flex-1 ps-2 col-span-5">
                        <p className="text-white font-semibold lg:text-base md:text-sm text-xs ">{song.title}</p>
                        <p className="lg:text-sm text-xs text-gray-400">
                            {song.artist.name}
                        </p>
                    </div>
                </div>

                <p className="lg:text-sm text-xs text-gray-400 col-span-4 lg:col-span-2">
                    {song.album?.title}
                </p>

                <span className="lg:text-sm text-xs text-gray-400 col-span-1  col-start-12">
                    {formatTime(song.duration)}
                </span>
            </div>

            <OptionsButton

                song={song}
                playlistId={playlist?.id}
                setPlaylist={setPlaylist}
            />
        </li>
    )
}

export default TrackItem