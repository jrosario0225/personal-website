import contactGif from "../../../assets/contactGif.gif"

// ── Theme (matches AboutContent / ProjectsContent) ───────────
const C = {
    cream: "#f5f0e8",
    creamCard: "#fbf8f2",
    brown: "#3a2e22",
    brownSoft: "#6b5a48",
    tan: "#8b6f47",
    amber: "#d6890f",
    border: "#e2d8c8",
    dark: "#393838",
}

function ContactContent() {
    return (
        <div
            style={{
                display: "flex",
                gap: "2.5rem",
                alignItems: "stretch",
                color: C.brown,
            }}
        >
            {/* Left — details (≈2/3) */}
            <div style={{ flex: 1.6, display: "flex", flexDirection: "column" }}>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {/* Email */}
                    <div>
                        <div style={fieldLabel}>Email</div>
                        <div style={fieldValue}>
                            jacobrosario0225@gmail.com
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <div style={fieldLabel}>Based in</div>
                        <div style={fieldValue}>Vancouver, BC</div>
                        <div style={fieldNote}>Eligible to work in the U.S.A. as a citizen </div>

                    </div>

                    {/* Instagram */}
                    <div>
                        <div style={fieldLabel}>Instagram</div>
                        <div style={fieldValue}>
                            <a
                                href="https://www.instagram.com/heartoverheight.vb/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    ...linkStyle,
                                    color: C.amber,
                                    borderBottomColor: "rgba(214,137,15,0.35)",
                                }}
                            >
                                @heartoverheight.vb
                            </a>
                        </div>
                        <div style={fieldNote}>DM for anything volleyball</div>
                    </div>

                    {/* Resume */}
                    <div>
                        <div style={fieldLabel}>Resume</div>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={resumeLink}
                        >
                            View PDF
                            <svg
                                viewBox="0 0 14 14"
                                width="13"
                                height="13"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 3h6M9 3v6M9 3L3 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Right — gif (≈1/3), framed like the About photo */}
            <div style={{ flex: 1.2, display: "flex", flexDirection: "column" }}>
                <div
                    style={{
                        flex: 1,
                        minHeight: "200px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        background: C.cream,
                        border: `1px solid ${C.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={contactGif}
                        alt="heh"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
            </div>
            <div
                style={{
                    fontStyle: "italic",
                    fontSize: "1.2rem",
                    color: C.dark,
                    textAlign: "center",
                    marginTop: "10px",
                }}
            >
                Hope to hear from you!
            </div>
        </div>
    </div>
        
        
    )
}

// ── Shared inline style objects ──────────────────────────────
const fieldLabel = {
    fontSize: "0.66rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: C.tan,
    marginBottom: "5px",
}

const fieldValue = {
    fontSize: "1.18rem",
    color: C.brown,
}

const fieldNote = {
    fontSize: "0.8rem",
    fontStyle: "italic",
    color: C.brownSoft,
    marginTop: "2px",
}

const linkStyle = {
    color: C.brown,
    textDecoration: "none",
    borderBottom: `1px solid ${C.border}`,
}

const resumeLink = {
    display: "inline-flex",
    alignItems: "center",
    gap: "9px",
    fontSize: "0.75rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: C.amber,
    textDecoration: "none",
    padding: "10px 17px",
    border: `1.5px solid ${C.amber}`,
    borderRadius: "3px",
    alignSelf: "flex-start",
}

export default ContactContent