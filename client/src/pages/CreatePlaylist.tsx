import { useState } from "react"

const CreatePlaylist = () => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(name, description)
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
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
        <div className="flex items-end justify-between my-10 ">
          <img src="playlist.png" className="w-40 h-40 rounded-lg" alt="" />

          <form action="POST" onSubmit={handleSubmit} className="flex flex-col justify-start gap-4 mt-10  w-9/12" >
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="bg-[#3f2a7a] p-2 rounded-xl focus:outline-none" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" className="bg-[#3f2a7a] p-2 rounded-xl focus:outline-none" />

            <button type="submit" className="bg-[#DE41E9] py-2 rounded-full w-fit  px-7 cursor-pointer">Crear Playlist</button>
          </form>
        </div>
      </div>}
    </div>
  )
}

export default CreatePlaylist   