import { useEffect, useState } from "react"
import Toggle from "../ui/Toggle"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router"
import Loader from "../components/Loader"

const CreatePlaylist = () => {

  const { isTokenExpired, user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (authLoading) return
    if (isTokenExpired) {
      navigate("/auth/login")
    }
  }, [isTokenExpired, authLoading])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [isPublic, setIsPublic] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    if (!user) {
      navigate("/auth/login")
      return
    }
    e.preventDefault()
    console.log(name, description)
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, description, isPublic, user_id: user?.id }),
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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
    <div className=" bg-purple-radial w-full  p-10">
      {loading && <p>Cargando...</p>}
      {!loading && <div className="bg-[#1c1c1f] py-4 px-8 rounded-2xl lg:w-2/3 xl:w-1/2 w-full mx-auto border-white/10 border  shadow-xl/30 shadow-purple-500/20 ">
        <h1 className="text-white text-2xl font-bold">Crear Playlist</h1>
        <div className="flex xl:flex-row flex-col items-start justify-between my-10  gap-10">
          <img src="playlist.png" className="w-40 h-40 rounded-lg" alt="" />

          <form action="POST" onSubmit={handleSubmit} className="flex flex-col justify-start gap-4 w-full xl:w-9/12" >
            <label htmlFor="name" className="text-white/80 font-semibold">Nombre</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Mi playlist" className="bg-[#2a2a2e] text-white p-2 rounded-lg border border-white/10 outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all duration-200" required />
            <label htmlFor="description" className="text-white/80 font-semibold">Descripción</label>
            <textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe tu playlist" className="bg-[#2a2a2e] resize-none text-white p-2 rounded-lg border border-white/10 outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all duration-200" />
            <Toggle
              checked={isPublic}
              onChange={setIsPublic}
              size="sm"
              label="Playlist pública"
            />

            <button type="submit" className="bg-[#a855f7] hover:bg-[#9E37C3] hover:scale-101 transition-all duration-200  py-2 rounded-full w-fit  px-7 cursor-pointer self-end font-semibold">Crear Playlist</button>
          </form>
        </div>
      </div>}
    </div>
  )
}

export default CreatePlaylist   