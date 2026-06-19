
function Dashboard({ onMenuClick }) {
    const menuItems = ["About", "Projects", "Contact Me"]

    return (
        <>
            <div style={{
                position: "fixed",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "2.5rem",
                fontWeight: 500,
                color: "#3a2e22",
                textShadow: "0 2px 8px rgba(255, 255, 255, 0.5)",
                zIndex: 10,
                pointerEvents: "none"
            }}>
                Jacob Rosario
            </div>

            <div style={{
                position: "fixed",
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "8rem",
                zIndex: 10
            }}>
                {menuItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => onMenuClick(item)}
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


        </>
    )
}

export default Dashboard