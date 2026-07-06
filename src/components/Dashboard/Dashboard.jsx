
import useModalState from "./useModalState"
import Modal from "./Modal"

import useIsMobile from "./Content/useIsMobile"


function Dashboard({ onMenuClick }) {
    const { activeModal, currentIndex, openModal, closeModal, goNext, goPrev, menuItems} = useModalState()

    const isMobile = useIsMobile()
   
    return (
        <>
            <div style={{
                position: "fixed",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: isMobile ? "2rem" : "2.5rem",
                fontWeight: 400,
                color: "#3a2e22",
                textShadow: "0 2px 8px rgba(255, 255, 255, 0.5)",
                zIndex: 10,
                pointerEvents: "none",
                width: isMobile ? "200px" : undefined
            }}>
                Jacob Rosario
            </div>

            <div style={{
                position: "fixed",
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: isMobile ? "5rem" : "8rem",
                zIndex: 10
            }}>
                {menuItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => openModal(item)}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "1rem",
                            color: "#3a2e22",
                            cursor: "pointer",
                            fontFamily: "inherit",
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Modal */}
            {activeModal && (
                <Modal 
                activeModal={activeModal}
                currentIndex={currentIndex}
                menuItems={menuItems}
                onClose={closeModal}
                onNext={goNext}
                onPrev={goPrev}
                />
            )}


        </>
    )
}

export default Dashboard