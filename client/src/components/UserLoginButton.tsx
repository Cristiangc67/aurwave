import { LuUser } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
const UserLoginButton = () => {
    const { user } = useAuth()
    return (
        <Link to={user ? "/profile" : "/auth/login"} className="w-10 h-10 bg-[#5d2492] rounded-full p-1 mb-5 group relative cursor-pointer">
            <span className="group-hover:visible invisible font-bold  absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-[#593678] text-xs  rounded-2xl bg-[#DE41E9] px-2 py-1">{user ? user.username : "Login"}</span>
            <LuUser className="w-full h-full" />
        </Link>
    )
}

export default UserLoginButton