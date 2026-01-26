interface ToggleProps {
    checked: boolean
    onChange: (value: boolean) => void
    label?: string
    disabled?: boolean
    size?: "sm" | "md" | "lg"
    className?: string
}

const Toggle: React.FC<ToggleProps> = ({
    checked,
    onChange,
    label,
    disabled = false,
    size = "md",
    className = "",
}) => {
    const trackSizes = {
        sm: "w-9 h-5",
        md: "w-11 h-6",
        lg: "w-14 h-8",
    }

    const thumbSizes = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-7 h-7",
    }

    const translate = {
        sm: "translate-x-4",
        md: "translate-x-5",
        lg: "translate-x-6",
    }

    return (
        <label
            className={`inline-flex items-center gap-2 select-none ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                } ${className}`}
        >
            {label && <span className="text-sm">{label}</span>}

            <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={`
          relative rounded-full transition-colors duration-200
          ${trackSizes[size]}
          ${checked ? "bg-[#DE41E9]" : "bg-gray-400"}
        `}
            >
                <span
                    className={`
            absolute top-1/2 left-0.5 -translate-y-1/2
            rounded-full bg-white shadow
            transition-transform duration-200
            ${thumbSizes[size]}
            ${checked ? translate[size] : "translate-x-0"}
          `}
                />
            </button>
        </label>
    )
}

export default Toggle