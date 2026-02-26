
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router"
import Loader from "../components/Loader"
import { Link } from "react-router"
import { useToast } from "../context/ToastContext"

const Login = () => {
    const { login, loading, isTokenExpired } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { showToast } = useToast()

    useEffect(() => {
        if (!isTokenExpired) {
            navigate("/")
        }
    }, [loading, isTokenExpired, navigate])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!email.trim() || !password.trim()) {
                showToast("Por favor, complete todos los campos", "error")
                return
            }

            await login(email.trim(), password.trim())
        } catch (error: any) {
            console.error(error)
            showToast(error.message || "Error al iniciar sesión", "error")
        }
    }
    return (
        <div className="flex items-center justify-center w-full h-[90vh] bg-purple-radial">
            {loading && <Loader />}
            {!loading && <div className="flex flex-col items-start gap-5 mx-auto bg-linear-to-b to-[#a855f7]/20 from-[#1A1130]/40  p-10 rounded-lg w-fit border border-[#5d2492]/20 shadow-lg shadow-[#5d2492]/30">
                <form onSubmit={handleSubmit} className="flex flex-col items-start gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email" className="font-semibold">Correo electronico</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electronico" id="email" className="w-full bg-[#2a2a2e] text-white p-2 rounded-lg border border-white/10 outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all duration-200" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="password" className="font-semibold">Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" id="password" className="w-full bg-[#2a2a2e] text-white p-2 rounded-lg border border-white/10 outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all duration-200" />
                    </div>
                    <button disabled={loading} type="submit" className="bg-[#a855f7] hover:bg-[#9E37C3] hover:shadow-lg hover:shadow-[#9E37C3]/30 hover:scale-101 transition-all duration-200  py-2 rounded-full w-fit  px-7 cursor-pointer self-end font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Login</button>
                </form>
                <p className="text-white/80 font-semibold text-sm">¿No tienes una cuenta? <Link to="/auth/register" className="text-[#a855f7] hover:text-[#9E37C3] hover:scale-101 transition-all duration-200 cursor-pointer">Registrate</Link></p>

            </div>}
        </div>
    )
}

export default Login