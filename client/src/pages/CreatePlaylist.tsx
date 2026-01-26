import { useEffect, useState } from "react"
import Toggle from "../ui/Toggle"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router"

const CreatePlaylist = () => {

  const { isTokenExpired, user } = useAuth()
  useEffect(() => {
    if (isTokenExpired) {
      navigate("/auth/login")
    }
  }, [isTokenExpired])
  const navigate = useNavigate()

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




  return (
    <div className=" bg-linear-to-b from-[#9f2ea7] to-[#1a1130] w-full p-10">
      {loading && <p>Cargando...</p>}
      {!loading && <div className="bg-[#26163A] py-4 px-8 rounded-2xl w-1/2 mx-auto ">
        <h1 className="text-white text-2xl font-bold">Crear Playlist</h1>
        <div className="flex items-start justify-between my-10 ">
          <img src="playlist.png" className="w-40 h-40 rounded-lg" alt="" />

          <form action="POST" onSubmit={handleSubmit} className="flex flex-col justify-start gap-4   w-9/12" >
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="bg-[#3f2a7a] p-2 rounded-xl focus:outline-none" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" className="bg-[#3f2a7a] p-2 rounded-xl focus:outline-none" />
            <Toggle
              checked={isPublic}
              onChange={setIsPublic}
              size="sm"
              label="Playlist pública"
            />

            <button type="submit" className="bg-[#DE41E9] py-2 rounded-full w-fit  px-7 cursor-pointer">Crear Playlist</button>
          </form>
        </div>
      </div>}
    </div>
  )
}

export default CreatePlaylist   