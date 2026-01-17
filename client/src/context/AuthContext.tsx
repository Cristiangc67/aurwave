import { createContext, useState, useEffect, useContext } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext<AuthContextType | null>(null)


interface user {
    id: string,
    email: string,
    username: string,
}
interface decodedToken {
    userId: string,
    email: string,
    username: string,
    exp: number,
}
interface AuthContextType {
    user: user | null,
    token: string | null,
    loading: boolean,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void,
    register: (email: string, password: string, username: string) => Promise<void>,
}
export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}


export const Authprovider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<user | null>(null)
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        const initializeAuth = () => {
            if (token) {
                try {
                    const decoded: decodedToken = jwtDecode(token)
                    if (!decoded.exp) return
                    if (decoded.exp * 1000 > Date.now()) {
                        setUser({
                            id: decoded.userId,
                            email: decoded.email,
                            username: decoded.username,
                        })
                        setLoading(false)
                    } else {
                        logout()
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
        }
        initializeAuth()
    }, [token])

    const register = async (email: string, password: string, username: string) => {
        setLoading(true)
        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, username }),
            })
            const data = await response.json()
            const { token, user } = data.data
            setToken(token)
            setUser(user)
            localStorage.setItem("token", token)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("token")

    }

    const login = async (email: string, password: string) => {
        setLoading(true)
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || "Login failed")
            }
            const { token, user } = data?.data
            setToken(token)
            setUser(user)
            localStorage.setItem("token", token)
            console.log(data)


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const value = { user, token, loading, login, logout, register }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
