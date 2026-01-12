

const CreatePlaylist = () => {
  return (
    <div className=" bg-linear-to-b from-[#9f2ea7] to-[#1a1130] w-full p-10">
        <div className="bg-[#26163A] py-4 px-8 rounded-2xl w-1/2 mx-auto ">
        <h1 className="text-white text-2xl font-bold">Crear Playlist</h1> 
        <div className="flex items-end justify-between my-10 ">
        <img src="/public/playlist.png" className="w-40 h-40 rounded-lg" alt="" />
        
        <form action="POST" className="flex flex-col justify-start gap-4 mt-10  w-9/12" >
            <input type="text" placeholder="Nombre" className="bg-[#3f2a7a] p-2 rounded-xl focus:outline-none"/>
            
            <button type="submit" className="bg-[#DE41E9] py-2 rounded-full w-fit  px-7 cursor-pointer">Crear Playlist</button>
        </form>
        </div>
        </div>
    </div>
  )
}

export default CreatePlaylist   