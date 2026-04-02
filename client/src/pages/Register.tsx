import { useState } from "react"
import Loader from "../components/Loader"
import { Link } from "react-router"


const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden")
            return
        }
        setError(null)
        setLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.trim(),
                    email: email.trim(),
                    password: password.trim()
                })

            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || "Error en el registro")
            }


        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="flex items-center justify-center w-full h-[90vh] bg-purple-radial">
            {loading && <Loader />}
            {!loading && <div className="flex flex-col items-start gap-5 mx-auto bg-linear-to-b to-[#a855f7]/20 from-[#1A1130]/40  p-10 rounded-lg w-fit border border-[#5d2492]/20 shadow-lg shadow-[#5d2492]/30">
                <form onSubmit={handleSubmit} className="flex flex-col items-start gap-5 w-full">
                    {error && (
                        <div className="text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg border border-red-400/20">
                            {error}
                        </div>
                    )}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="username" className="font-semibold">Nombre de usuario</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" id="username" className="bg-[#2a2a2e] text-white p-2 rounded-lg border border-white/10 outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all duration-200" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email" className="font-semibold">Correo electronico</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electronico" id="email" className="bg-[#2a2a2e] text-white p-2 rounded-lg border border-white/10 outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all duration-200" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="password" className="font-semibold">Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" id="password" className="bg-[#2a2a2e] text-white p-2 rounded-lg border border-white/10 outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all duration-200" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="confirmPassword" className="font-semibold">Confirmar contraseña</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar contraseña" id="confirmPassword" className="bg-[#2a2a2e] text-white p-2 rounded-lg border border-white/10 outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all duration-200" />
                    </div>
                    <button disabled={loading} type="submit" className="bg-[#a855f7] hover:bg-[#9E37C3] hover:shadow-lg hover:shadow-[#9E37C3]/30 hover:scale-101 transition-all duration-200  py-2 rounded-full w-fit  px-7 cursor-pointer self-end font-semibold">Registrarse</button>
                </form>
                <p className="text-white/80 font-semibold text-sm">¿Ya tienes una cuenta? <Link to="/auth/login" className="text-[#a855f7] hover:text-[#9E37C3] hover:scale-101 transition-all duration-200 cursor-pointer">Inicia sesión</Link></p>
            </div>}
        </div>
    )
}

export default Register