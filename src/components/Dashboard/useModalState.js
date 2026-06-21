
import { useState } from "react"

const menuItems = ["About", "Projects", "Contact"]

function useModalState() {
    const [activeModal, setActiveModal] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const openModal = (item) => {
        if (activeModal === item) {
            setActiveModal(null)
        } else {
            setActiveModal(item)
            setCurrentIndex(menuItems.indexOf(item))
        }
    }

    const closeModal = () => setActiveModal(null)

    const goNext = () => {
        // could also be (currentIndex < 2) 
        if (currentIndex < menuItems.length - 1) {
            const nextIndex = currentIndex + 1
            setCurrentIndex(nextIndex)
            setActiveModal(menuItems[nextIndex])
        }
    }

    const goPrev = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1
            setCurrentIndex(prevIndex)
            setActiveModal(menuItems[prevIndex])
        }
    }

    return { activeModal, currentIndex, openModal, closeModal, goNext, goPrev, menuItems}
}

export default useModalState;