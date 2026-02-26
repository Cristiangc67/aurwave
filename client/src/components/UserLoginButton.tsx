
import { MdSensorDoor, MdAccountCircle } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
const UserLoginButton = () => {
    const { user } = useAuth()
    return (
        <Link to={user ? "/profile" : "/auth/login"} className="flex w-11/12 h-10 bg-white/5 rounded-lg py-1 px-2  group relative cursor-pointer mx-auto justify-start items-center">
            {user ? <MdAccountCircle className="lg:inline md:hidden w-8 h-8" /> : <MdSensorDoor className="lg:inline md:hidden w-8 h-8" />}
            <span className=" font-bold  text-white text-xs  rounded-2xl  px-2 py-1">{user ? user.username : "Login"}</span>
        </Link>
    )
}

export default UserLoginButton