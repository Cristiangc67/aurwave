import { useState } from "react"


const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch("http://localhost:3000/api/register", {
                method: 'POST',
                headers: {
                    contentType: 'application/json'
                },
                body: JSON.stringify({ username, email, password })
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
        <div>
            {loading && <p>Cargando...</p>}
            {!loading && <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" id="username" />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electronico" id="email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" id="password" />
                <button type="submit">Registrarse</button>
            </form>}
        </div>
    )
}

export default Register