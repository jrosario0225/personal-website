function Modal({ activeModal, currentIndex, menuItems, onClose, onNext, onPrev }) {
    const isFirst = currentIndex === 0
    const isLast = currentIndex === menuItems.length - 1

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100
            }}
        >
            {/* Left arrow — now a sibling, not a child of the modal box */}
            {!isFirst && (
                <button
                    onClick={(e) => { e.stopPropagation(); onPrev() }}
                    style={{
                        position: "fixed",
                        left: "12%",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        fontSize: "2rem",
                        cursor: "pointer",
                        color: "#f5f0e8",
                        zIndex: 101,
                        fontSize: "60px"
                    }}
                >
                    ‹
                </button>
            )}

            {/* Right arrow */}
            {!isLast && (
                <button
                    onClick={(e) => { e.stopPropagation(); onNext() }}
                    style={{
                        position: "fixed",
                        right: "12%",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        fontSize: "2rem",
                        cursor: "pointer",
                        color: "#f5f0e8",
                        zIndex: 101,
                        fontSize: "60px"
                    }}
                >
                    ›
                </button>
            )}

            {/* Modal box — arrows removed from here */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "relative",
                    width: "min(800px, 90vw)",
                    maxHeight: "80vh",
                    backgroundColor: "#f5f0e8",
                    borderRadius: "20px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    padding: "2.5rem",
                    overflowY: "auto"
                }}
            >
                <h2 style={{ margin: 0, color: "#3a2e22", fontWeight: 500 }}>
                    {activeModal}
                </h2>
                <hr style={{ border: "none", borderTop: "1px solid #d9cfc0", margin: "1rem 0" }} />

                <div>
                    Content for {activeModal} goes here.
                </div>
            </div>
        </div>
    )
}

export default Modal