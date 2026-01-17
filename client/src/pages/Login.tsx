
import { useState } from "react"
import { useAuth } from "../context/AuthContext";
const Login = () => {
    const { login, loading } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login(email, password)
    }
    return (
        <div>
            {loading && <p>Logging in...</p>}
            {!loading && <form onSubmit={handleSubmit}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electronico" id="email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" id="password" />
                <button type="submit">Login</button>
            </form>}
        </div>
    )
}

export default Login