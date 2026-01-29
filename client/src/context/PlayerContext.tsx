import { useContext, createContext, useState, useEffect, useRef } from "react"
import type { Song } from "../types/song"

interface PlayerContextType {
  togglePlay: () => void
  audioRef: React.RefObject<HTMLAudioElement | null>
  currentTrack: Song | null
  queue: Song[]
  currentIndex: number
  isPlaying: boolean
  playFromPlaylist: (track: Song, playlist: Song[]) => void
  playSingleTrack: (track: Song) => void
  setIsPlaying: (value: boolean) => void
  handleNext: () => void
  handlePrevious: () => void
  handleEnded: () => void
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
  const userInteractedRef = useRef(false)
  const hasHydratedRef = useRef(false)
  const isReadyRef = useRef(false)



  const togglePlay = () => {
    userInteractedRef.current = true
    setIsPlaying(prev => !prev)
  }
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null)

  const [queue, setQueue] = useState<Song[]>([])

  const [currentIndex, setCurrentIndex] = useState(0)

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (hasHydratedRef.current) return

    const savedTrack = localStorage.getItem("currentTrack")
    const savedQueue = localStorage.getItem("queue")
    const savedIndex = localStorage.getItem("currentIndex")

    if (savedTrack && savedQueue && savedIndex) {
      setCurrentTrack(JSON.parse(savedTrack))
      setQueue(JSON.parse(savedQueue))
      setCurrentIndex(parseInt(savedIndex))
    }

    hasHydratedRef.current = true
  }, [])





  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    isReadyRef.current = false
    audio.src = currentTrack.file_url
    audio.load()

    const onCanPlay = () => {
      isReadyRef.current = true
      if (userInteractedRef.current && isPlaying) {
        audio.play().catch(console.error)
      }
    }

    audio.addEventListener("canplay", onCanPlay)
    return () => audio.removeEventListener("canplay", onCanPlay)
  }, [currentTrack])


  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      if (userInteractedRef.current) {
        audio.play().catch(console.error)
      }
    } else {
      audio.pause()
    }
  }, [isPlaying])






  useEffect(() => {
    if (!hasHydratedRef.current) return

    localStorage.setItem("currentTrack", JSON.stringify(currentTrack))
    localStorage.setItem("queue", JSON.stringify(queue))
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex))

    console.log("💾 saved", currentTrack, queue, currentIndex)
  }, [currentTrack, queue, currentIndex])


  const playFromPlaylist = (track: Song, playlist: Song[]) => {
    userInteractedRef.current = true


    if (queue === playlist) {
      const index = playlist.findIndex(s => s.id === track.id)
      if (index === -1) return

      setCurrentIndex(index)
      setCurrentTrack(track)

      setIsPlaying(true)
      return
    }

    setQueue(playlist)
    setCurrentTrack(track)
    setCurrentIndex(playlist.indexOf(track))
    setIsPlaying(true)
  }


  const playSingleTrack = (track: Song) => {
    userInteractedRef.current = true
    setQueue([])
    setCurrentIndex(0)
    setCurrentTrack(track)
    setIsPlaying(true)
  }




  const handleNext = () => {
    userInteractedRef.current = true
    if (!isReadyRef.current) return

    const next = queue[currentIndex + 1]
    if (!next) return

    setCurrentIndex(i => i + 1)
    setCurrentTrack(next)

    setIsPlaying(true)

  }


  const handleEnded = () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.duration || audio.currentTime < audio.duration - 0.3) {
      return
    }

    handleNext()
  }




  const handlePrevious = () => {
    userInteractedRef.current = true
    const prevTrack = queue[currentIndex - 1];
    if (!prevTrack) return;

    setCurrentIndex(currentIndex - 1);
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        togglePlay,
        audioRef,
        currentTrack,
        queue,
        currentIndex,
        isPlaying,
        playFromPlaylist,
        playSingleTrack,
        setIsPlaying,
        handleNext,
        handlePrevious,
        handleEnded
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}


export default PlayerContext