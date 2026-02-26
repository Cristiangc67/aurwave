const styles = {
    success: "bg-green-500/10 border-green-500/30 text-green-400",
    error: "bg-red-500/10 border-red-500/30 text-red-400",
    info: "bg-purple-500/10 border-purple-500/30 text-purple-300",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
}

interface Props {
    message: string
    type: "success" | "error" | "info" | "warning"
}

const ToastItem = ({ message, type }: Props) => {
    return (
        <div
            className={`
        px-4 py-3 rounded-lg border backdrop-blur-md shadow-lg
        animate-in slide-in-from-right fade-in duration-300
        ${styles[type]}
      `}
        >
            {message}
        </div>
    )
}

export default ToastItem
