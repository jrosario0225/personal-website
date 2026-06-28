import AboutContent from "./Content/AboutContent";
import ContactContent from "./Content/ContactContent";
import ProjectsContent from "./Content/ProjectsContent";

const contentMap= {
    "About": AboutContent,
    "Projects": ProjectsContent,
    "Contact": ContactContent
}


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
            {/* Wrapper — arrows and modal move together */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                {/* Left arrow */}
                {!isFirst && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev() }}
                        style={{
                            position: "absolute",
                            left: "-60px",
                            background: "none",
                            border: "none",
                            fontSize: "50px",
                            cursor: "pointer",
                            color: "#f5f0e8",
                            zIndex: 101,
                            lineHeight: 1
                        }}
                    >
                        ‹
                    </button>
                )}

                {/* Modal box */}
                <div
                    style={{
                        width: "min(800px, 90vw)",
                        maxHeight: "80vh",
                        backgroundColor: "#f1f0ed",
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
                        {(() => {
                            const ActiveContent = contentMap[activeModal]
                            return ActiveContent ? <ActiveContent /> : null
                        })()}
                    </div>
                </div>

                {/* Right arrow */}
                {!isLast && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext() }}
                        style={{
                            position: "absolute",
                            right: "-60px",
                            background: "none",
                            border: "none",
                            fontSize: "50px",
                            cursor: "pointer",
                            color: "#f5f0e8",
                            zIndex: 101,
                            lineHeight: 1
                        }}
                    >
                        ›
                    </button>
                )}
            </div>
        </div>
    )
}

export default Modal