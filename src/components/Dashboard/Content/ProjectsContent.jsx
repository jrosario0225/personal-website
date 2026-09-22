import { useState, useEffect } from "react"

import repPowerImages from "../../../assets/RepPower-Images/index"
import statTrackerImages from "../../../assets/Stat-Tracker-Images"
import spikeTimerImages from "../../../assets/Spike-Timer-Images"
import websiteImg from "../../../assets/websiteImg.png"
import raincouverImg from "../../../assets/raincouverImg.png"

import useIsMobile from "./useIsMobile"

// ── Theme (matches AboutContent) ─────────────────────────────
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

// ── Project data ─────────────────────────────────────────────
const projects = [

       {
        title: "RainCouver",
        subtitle: "Navigation app that routes users around rain",
        description: "A GPS that finds you the driest route through Downtown Vancouver, using LiDAR data to map covered walkways street by street.",
        tags: [],
        status: "Ongoing",
        liveUrl: null, // not deployed rn
        images: [{ type: "single", src: raincouverImg, alt: "Raincouver map UI" }]
    },
    {
        title: "RepPower",
        subtitle: "AirPods-based velocity tracker",
        description: "An iOS app that uses AirPods gyroscope and accelerometer data to calculate the speed of your squats.",
        tags: ["Swift", "SwiftUI"],
        date: "Sept 2026",
        liveUrl: "https://github.com/jrosario0225/RepPower",
        images: repPowerImages,
        orientation: "portrait"
    },

    {
        title: "Volleyball Stat Tracker",
        subtitle: "Real-time in-game stats",
        description:
            "A real-time stat logging tool built for live matches, with optimized inputs designed for speed and in-game decision-making. Whiteboard included to visualize strategy.",
        tags: ["React"],
        date: "Feb 2026",
        liveUrl: "https://github.com/jrosario0225/volleyball-stat-tracker",
        images: statTrackerImages,
        orientation: "landscape"
    },

    {
        title: "Spike Timer Analyzer",
        subtitle: "Helping athletes time their spikes efficiently",
        description:
            "A computer vision tool that analyzes spike timing from a video, extracting takeoff, contact, and landing data.",
        tags: ["JavaScript", "React"],
        date: "March 2026",
        liveUrl: "https://spike-timer.vercel.app/",
        images: spikeTimerImages,
        testimonials: [
            { quote: "Tried this and its legit!!!!", author: "@mambobita, Instagram" },
            // Add more testimonials here:
            // { quote: "...", author: "Name, Role" },
        ],
        orientation: "portrait"
    },
    {
        title: "Personal Website",
        subtitle: "Interactive portfolio with 3D volleyball-themed UI",
        description:
            "A fully-responsive portfolio built from scratch with 3D rendering, animations, and a volleyball-themed interactive UI.",
        tags: ["JavaScript", "React", "Three.js"],
        date: "June 2026",
        // status: "Ongoing",
        liveUrl: null, // you're on it lol
        images: [
            {
                src: websiteImg,
                alt: "Website image"
            }
        ],
        orientation: "landscape"
    }
]

const imageStyle = {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain",
}

const hitboxStyle = {
    position: "absolute",
    top: 0,
    width: "30%",
    height: "100%",
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    zIndex: 1,
}

const dotsStyle = {
    position: "absolute",
    left: "50%",
    bottom: "10px",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "7px",
    zIndex: 2,
    pointerEvents: "none",
}

const dotStyle = {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: "white",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
}

const carouselSlideStyles = `
@keyframes carouselSlideInRight {
    from { transform: translateX(60px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes carouselSlideInLeft {
    from { transform: translateX(-60px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
`

function Carousel({ images, orientation, isMobile }) {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState("right")


    if (!images?.length) return null

    const previous = () => {
        setDirection("left")
        setCurrent((index) =>
            (index - 1 + images.length) % images.length
        )
    }

    const next = () => {
        setDirection("right")
        setCurrent((index) =>
            (index + 1) % images.length
        )
    }

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: orientation === "portrait"
                    ? isMobile
                        ? "420px"
                        : "540px"
                    : "auto",
                aspectRatio: orientation === "landscape"
                    ? "16/10"
                    : "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: isMobile ? "18px" : "20px",
                border: `1px solid ${C.border}`,
                backgroundColor: C.dark,
            }}
        >
            <style>{carouselSlideStyles}</style>

            <img
                key={current}
                src={images[current].src}
                alt={images[current].alt}
                style={{
                    ...imageStyle,
                    animation: `${
                        direction === "right" ? "carouselSlideInRight" : "carouselSlideInLeft" 
                    } 0.25s ease`,
                    width: orientation === "landscape" ? "100%" : "auto",
                    height: orientation === "landscape" ? "100%" : "auto",
                    objectFit: "contain"
                }}
            />

            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={previous}
                        aria-label="Previous image"
                        style={{ ...hitboxStyle, left: 0 }}
                    />

                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next image"
                        style={{ ...hitboxStyle, right: 0 }}
                    />

                    <div style={dotsStyle}>
                        {images.map((image, index) => (
                            <span
                                key={image.src}
                                style={{
                                    ...dotStyle,
                                    opacity: current === index ? 1 : 0.45,
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}



// ── Shared meta pieces ───────────────────────────────────────
function StatusOrDate({ project }) {
    if (project.status) {
        return (
            <span
                style={{
                    display: "flex",
                    fontSize: "11px",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: "rgba(214,137,15,0.12)",
                    color: C.amber,
                    border: "1px solid rgba(214,137,15,0.35)",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                }}
            >
                {project.status}
            </span>
        )
    }
    return (
        <span style={{ fontSize: "12px", color: C.brownSoft, whiteSpace: "nowrap" }}>
            {project.date}
        </span>
    )
}

function Tags({ tags }) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            {tags.map((tag) => (
                <span
                    key={tag}
                    style={{
                        fontSize: "11px",
                        padding: "4px 11px",
                        borderRadius: "999px",
                        border: `1px solid ${C.border}`,
                        color: C.brownSoft,
                        backgroundColor: C.creamCard,
                    }}
                >
                    {tag}
                </span>
            ))}
        </div>
    )
}

function LiveLink({ url }) {
    if (!url) return null
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            More details ↗
        </a>
    )
}

function Testimonials({ testimonials }) {
    if (!testimonials?.length) return null
    return (
        <>
            {testimonials.map((t) => (
                <div
                    key={t.author}
                    style={{
                        marginTop: "0.4rem",
                        padding: "0.9rem 1.1rem",
                        backgroundColor: C.creamCard,
                        borderRadius: "14px",
                        borderLeft: `3px solid ${C.amber}`,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.45rem",
                    }}
                >
                    <p style={{ fontSize: "13px", lineHeight: 1.6, color: C.brown, fontStyle: "italic", margin: 0 }}>
                        &ldquo;{t.quote}&rdquo;
                    </p>
                    <p style={{ fontSize: "12px", color: C.tan, margin: 0, fontWeight: 600 }}>
                        &mdash; {t.author}
                    </p>
                </div>
            ))}
        </>
    )
}

// ── MOBILE layout: single column, stacked (per sketch) ───────
function MobileProject({ project, isLast }) {
    return (
        <div
            style={{
                padding: "2rem 0",
                borderBottom: isLast ? "none" : `1px dashed ${C.amber}`,
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
            }}
        >
            {/* Header: title + status left, tags + live pushed right */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem 0.75rem" }}>
                <h3 style={{ fontSize: "24px", fontWeight: 600, margin: 0, lineHeight: 1.15, color: C.brown }}>
                    {project.title}
                </h3>
                <StatusOrDate project={project} />
                <p style={{ fontSize: "14px", color: C.tan, fontStyle: "italic", margin: 0 }}>
                    {project.subtitle}
                </p>
                <span style={{ flex: "1 1 auto" }} />
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px", width: "100%" }}>
                    <div>
                        <Tags tags={project.tags} />
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        <LiveLink url={project.liveUrl} />
                    </div>
                </div>
            </div>

            <Carousel images={project.images} orientation={project.orientation} isMobile />

            <p style={{ fontSize: "14px", lineHeight: 1.65, color: C.brown, margin: 0 }}>
                {project.description}
            </p>

            <Testimonials testimonials={project.testimonials} />
        </div>
    )
}

// ── DESKTOP layout: alternating two-column grid ──────────────
function DesktopProject({ project, reverse }) {
    const meta = (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
                <h3 style={{ fontSize: "22px", fontWeight: 600, margin: 0, lineHeight: 1.25, color: C.brown }}>
                    {project.title}
                </h3>
                <StatusOrDate project={project} />
            </div>

            <p style={{ fontSize: "13px", color: C.tan, fontStyle: "italic", margin: "-0.35rem 0 0" }}>
                {project.subtitle}
            </p>

            <p style={{ fontSize: "14px", lineHeight: 1.65, color: C.brown, margin: 0 }}>
                {project.description}
            </p>

            <Tags tags={project.tags} />

            {project.liveUrl && (
                <div style={{ display: "flex", gap: "1.25rem" }}>
                    <LiveLink url={project.liveUrl} />
                </div>
            )}

            <Testimonials testimonials={project.testimonials} />
        </div>
    )

    const mediaEl = <Carousel images={project.images} orientation={project.orientation} isMobile={false} />

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3rem",
                padding: "3rem 0",
                borderBottom: `1px dashed ${C.amber}`,
                alignItems: "center",
            }}
        >
            {reverse ? (
                <>
                    {meta}
                    {mediaEl}
                </>
            ) : (
                <>
                    {mediaEl}
                    {meta}
                </>
            )}
        </div>
    )
}

const linkStyle = {
    fontSize: "13px",
    color: C.brown,
    textDecoration: "none",
    fontWeight: 500,
    borderBottom: `1px solid ${C.tan}`,
    paddingBottom: "1px",
}

// ── Main export ──────────────────────────────────────────────
export default function ProjectsContent() {
    const isMobile = useIsMobile()

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {projects.map((project, i) =>
                    isMobile ? (
                        <MobileProject
                            key={project.title}
                            project={project}
                            isLast={i === projects.length - 1}
                        />
                    ) : (
                        <DesktopProject
                            key={project.title}
                            project={project}
                            reverse={i % 2 === 1}
                        />
                    )
                )}
            </div>
        </div>
    )
}