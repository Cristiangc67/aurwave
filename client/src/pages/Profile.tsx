import { useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate("/")
  }
  return (
    <div>
      <h1>Profile {user?.username}</h1>
      <p>{user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile