import AboutContent from "./Content/AboutContent"
import ContactContent from "./Content/ContactContent"
import ProjectsContent from "./Content/ProjectsContent"
import useIsMobile from "./Content/useIsMobile"
import { useRef } from "react"

const contentMap = {
    "About": AboutContent,
    "Projects": ProjectsContent,
    "Contact": ContactContent
}

function Modal({ activeModal, currentIndex, menuItems, onClose, onNext, onPrev }) {
    const isFirst = currentIndex === 0
    const isLast = currentIndex === menuItems.length - 1
    const isMobile = useIsMobile()
    const touchStartX = useRef(null)

    const prevLabel = currentIndex > 0 ? menuItems[currentIndex - 1] : null
    const nextLabel = currentIndex < menuItems.length - 1 ? menuItems[currentIndex + 1] : null

    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX
    }

    const onTouchEnd = (e) => {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (diff > 50 && !isLast) onNext()
        if (diff < -50 && !isFirst) onPrev()
        touchStartX.current = null
    }

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
            <div
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                {/* Left arrow — desktop only */}
                {!isFirst && !isMobile && (
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

                <div
                    className="modal-box"
                    style={{
                        width: "min(800px, 90vw)",
                        backgroundColor: "#f1f0ed",
                        borderRadius: "20px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                        overflow: "hidden"
                    }}
                >
                    {/* Swipe indicator — mobile only */}
                    {isMobile && (
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0.75rem 1.5rem",
                            borderBottom: "1px solid #d9cfc0",
                            fontSize: "13px",
                            color: "#8a7e72"
                        }}>
                            <span style={{ visibility: prevLabel ? "visible" : "hidden", display: "flex", alignItems: "center", gap: "4px" }}>
                                ‹ Swipe to {prevLabel}
                            </span>
                            <span style={{ visibility: nextLabel ? "visible" : "hidden", display: "flex", alignItems: "center", gap: "4px" }}>
                                Swipe to {nextLabel} ›
                            </span>
                        </div>
                    )}

                    <div
                        className="modal-scroll"
                        style={{
                            maxHeight: "80vh",
                            overflowY: "auto",
                            padding: "2.5rem"
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
                </div>

                {/* Right arrow — desktop only */}
                {!isLast && !isMobile && (
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