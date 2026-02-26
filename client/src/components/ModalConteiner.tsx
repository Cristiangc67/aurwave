import type { ReactNode } from 'react'



const ModalConteiner = ({ children, onClose }: { children: ReactNode, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative z-10 bg-neutral-900 p-5 rounded-lg ">
                {children}
            </div>
        </div>
    )
}

export default ModalConteiner