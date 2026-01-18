
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router"
const Login = () => {
    const { login, loading, isTokenExpired } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    useEffect(() => {
        if (!isTokenExpired) {
            navigate("/")
        }
    }, [isTokenExpired])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login(email, password)
        navigate("/")
    }
    return (
        <div className="flex items-center justify-center w-full h-[90vh] bg-[#1A1130]">
            {loading && <p>Logging in...</p>}
            {!loading && <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 mx-auto bg-[#241845] p-10 rounded-lg w-fit border border-[#5d2492]/50 shadow-lg shadow-[#5d2492]/30">
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electronico" id="email" className="bg-[#1A1130] text-white px-4 py-2 rounded-lg" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" id="password" className="bg-[#1A1130] text-white px-4 py-2 rounded-lg" />
                <button type="submit" className="bg-[#DE41E9] hover:bg-[#c715d8] transition-colors duration-300 text-white px-8 py-2 rounded-full mt-4 cursor-pointer">Login</button>
            </form>}
        </div>
    )
}

export default Login