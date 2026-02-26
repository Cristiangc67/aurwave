import { createContext, useContext, useState, type ReactNode } from "react"
import ToastItem from "../components/ToastItem.tsx"

type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
    id: number
    message: string
    type: ToastType
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: ToastType = "info") => {
        const id = Date.now()

        setToasts((prev) => [...prev, { id, message, type }])

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3000)
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="fixed top-10 right-1/2 translate-x-1/2 flex flex-col gap-2 z-50">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} {...toast} />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) throw new Error("useToast must be used within ToastProvider")
    return context
}
