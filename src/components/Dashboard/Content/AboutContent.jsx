import jacobPhoto from "../../../assets/jacob.jpg"
import useIsMobile from "./useIsMobile"

const socials = [
    { label: "Instagram", href: "https://www.instagram.com/heartoverheight.vb/", icon: "instagram" },
    { label: "GitHub", href: "https://github.com/jrosario0225", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jacob-rosario-84a072341/", icon: "linkedin" },
]

const icons = {
    instagram: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    ),
    github: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
    ),
    linkedin: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    ),
}

const paragraphs = (
    <>
        {/* <p style={{ margin: 0 }}>
            Nice to meet you, I'm Jacob and I like creating things that benefit others. I studied
            Biology at the University of British Columbia, where I discovered my love for the sport
            of volleyball and my interests in computer science.
        </p>
        <p style={{ margin: 0 }}>
            I started volleyball at UBC so I played as much as I could and taught myself along
            the way. This led to an opportunity to coach club and high school teams. Additionally, I post volleyball content on Instagram{" "}
            <a
                href="https://www.instagram.com/heartoverheight.vb/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#8b6f47", textDecoration: "none", fontWeight: 500 }}
            >
                @heartoverheight.vb
            </a>{" "}
            where I share tips and my journey as a short hitter gaining 1M+ views.
        </p>
        <p style={{ margin: 0 }}>
            Programming came later but just like volleyball, there was always something new to learn
            and skills to improve. I started building projects that solved problems I ran into as
            a coach and that's where both passions merged. I created a stat-tracker and a
            spike-timing software which started as tools for my athletes and ended up being what
            pushed me further into software development.
        </p>
        <p style={{ margin: 0 }}>
            I'm only just starting out but I'm looking forward to seeing what else I can build that
            can help others.
        </p> */}

        <p>
            Nice to meet you, I’m Jacob. 
            I’m always looking for ways to build things that genuinely help the people around me.
        </p>

        <p>
            I studied Biology at the University of British Columbia but most of what shaped me happened outside the classroom. 
            That’s where I found volleyball and more importantly, a community I wanted to contribute to. 
            I started as a beginner – taught myself the game and eventually became a coach. 
            Through that experience, I saw how clear feedback, tools and collaboration can make a real difference in someone’s growth.
        </p>

        <p>
            That mindset carried into how I approach technology. 
            I didn’t start programming just to learn how to code, I started because I saw problems in my community that I wanted to solve. 
            As a coach, I needed better ways to track performance and give athletes actionable feedback. 
            So I built them. A stat tracker to make decisions clearer in real time. A spike timing analyzer to turn guesswork into something measurable.
        </p>

        <p>
           Now, I’m continuing to explore how software and AI can be used in the same way by solving practical problems and supporting communities I care about. 
           Whether it’s athletes, local users, or everyday people navigating something as simple as the rain in Vancouver, I’m always looking for what I can build that would help. 
        </p>
        
    </>
)

const socialRow = (
    <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}>
        {socials.map((s) => (
            <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    backgroundColor: "#3a2e22",
                    color: "#f5f0e8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                }}
            >
                {icons[s.icon]}
            </a>
        ))}
    </div>
)

function AboutContent() {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <div style={{ maxWidth: "640px", margin: "0 auto" }}>
                {/* Circular photo + socials, centered */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.9rem" }}>
                    <div style={{
                        width: "104px",
                        height: "104px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        backgroundColor: "#2b2f3a",
                        border: "3px solid #e7ddcb",
                    }}>
                        <img
                            src={jacobPhoto}
                            alt="Jacob"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                    </div>
                    {socialRow}
                </div>

                {/* Horizontal dashed separator */}
                <div style={{ height: 0, borderTop: "1.5px dashed #d6890f", margin: "1.5rem 0" }} />

                {/* Text, full width */}
                <div style={{
                    color: "#3a2e22",
                    fontSize: "0.94rem",
                    lineHeight: 1.7,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}>
                    {paragraphs}
                </div>
            </div>
        )
    }

    // Desktop: side-by-side text (2) | divider | photo (1)
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ display: "flex", gap: "1.75rem", alignItems: "stretch", flex: 1 }}>
                <div style={{
                    flex: 2,
                    color: "#3a2e22",
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    overflowY: "auto",
                }}>
                    {paragraphs}
                </div>

                <div style={{
                    width: "1px",
                    alignSelf: "stretch",
                    background: "repeating-linear-gradient(to bottom, #d6890f 0 8px, transparent 8px 16px)",
                }} />

                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                    <div style={{
                        width: "100%",
                        aspectRatio: "3 / 4",
                        borderRadius: "24px",
                        overflow: "hidden",
                        backgroundColor: "#2b2f3a",
                    }}>
                        <img
                            src={jacobPhoto}
                            alt="Jacob"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                    </div>
                    {socialRow}
                </div>
            </div>
        </div>
    )
}

export default AboutContent