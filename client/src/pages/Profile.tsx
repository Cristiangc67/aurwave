import { useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"
import { LuUser } from "react-icons/lu"
import { useEffect } from "react"

const Profile = () => {
  const { user, logout, isTokenExpired } = useAuth()
  useEffect(() => {
    if (isTokenExpired) {
      navigate("/auth/login")
    }
  }, [isTokenExpired])
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate("/")
  }
  return (
    <div className="flex items-center justify-center w-full h-[90vh] bg-purple-radial">
      <div className="flex flex-col items-center gap-2 mx-auto bg-linear-to-b to-[#a855f7]/20 from-[#1A1130]/40  p-10 rounded-lg w-fit border border-[#5d2492]/20 shadow-lg shadow-[#5d2492]/30">
        <LuUser className="text-4xl" />
        <h1 className="text-white text-2xl">Profile {user?.username}</h1>
        <p className="text-white">{user?.email}</p>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 cursor-pointer">Logout</button>
      </div>
    </div>
  )
}

export default Profile