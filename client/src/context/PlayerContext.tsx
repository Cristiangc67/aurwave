import { useContext, createContext, useState, useEffect } from "react"
import type {Song} from "../types/song"

interface PlayerContextType {
  currentTrack: Song | null
  queue: Song[]
  currentIndex: number
  isPlaying: boolean
  playFromPlaylist: (track: Song, playlist: Song[]) => void
  playSingleTrack: (track: Song) => void
  setIsPlaying: (value: boolean) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)


export const usePlayerContext = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error(
      "usePlayerContext must be used within a PlayerContextProvider"
    )
  }
  return context
}

export const PlayerContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [currentTrack, setCurrentTrack] = useState<Song | null>(() => {
    const saved = localStorage.getItem("currentTrack")
    return saved ? JSON.parse(saved) : null
  })

  const [queue, setQueue] = useState<Song[]>(() => {
    const saved = localStorage.getItem("queue")
    return saved ? JSON.parse(saved) : []
  })

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const saved = localStorage.getItem("currentIndex")
    return saved ? parseInt(saved) : 0
  })

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    localStorage.setItem("currentTrack", JSON.stringify(currentTrack))
    localStorage.setItem("queue", JSON.stringify(queue))
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex))
  }, [currentTrack, queue, currentIndex])

  const playFromPlaylist = (track: Song, playlist: Song[]) => {
    setCurrentTrack(track)
    setQueue(playlist)
    setCurrentIndex(playlist.indexOf(track))
    setIsPlaying(true)
  }
  const playSingleTrack = (track: Song) => {
    setCurrentTrack(track)
    setQueue([])
    setCurrentIndex(0)
    setTimeout(() => {
      setIsPlaying(true)
    }, 100);
    console.log(track)
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        queue,
        currentIndex,
        isPlaying,
        playFromPlaylist,
        playSingleTrack,
        setIsPlaying,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}


export default PlayerContext