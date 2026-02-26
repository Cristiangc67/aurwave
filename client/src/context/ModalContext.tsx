import { createContext, useContext, useState } from "react"
import { createPortal } from "react-dom"
import ModalConteiner from "../components/ModalConteiner"

interface ModalContextType {
    openModal: (content: React.ReactNode) => void
    closeModal: () => void

}

const ModalContext = createContext<ModalContextType | null>(null)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)

    const openModal = (content: React.ReactNode) => {
        setModalContent(content)
    }

    const closeModal = () => {
        setModalContent(null)
    }

    const value = {
        openModal,
        closeModal
    }

    return (
        <ModalContext.Provider value={value}>
            {children}
            {modalContent && createPortal(
                <ModalConteiner onClose={closeModal}>
                    {modalContent}
                </ModalConteiner>,
                document.body
            )}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider")
    }
    return context
}

export default ModalContext