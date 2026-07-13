import { useState, useEffect } from "react"
import raincouverImg from "../../../assets/raincouverImg.png"
import websiteImg from "../../../assets/websiteImg.png"
import spikeActionImg from "../../../assets/spikeActionImg.jpg"
import spikeResultsImg from "../../../assets/spikeResultsImg.jpg"
import statTrackerImg from "../../../assets/statTrackerImg.jpg"
import whiteboardImg from "../../../assets/whiteboardImg.jpg"
import repSpeedImg from "../../../assets/repSpeedImg.png"

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
        title: "Rep Speed",
        subtitle: "AirPods-based velocity tracker",
        description: "An iOS app that uses AirPods gyroscope and accelerometer data to calculate the speed of your squats.",
        tags: ["Swift", "SwiftUI"],
        status: "Ongoing",
        liveUrl: null,
        media: { type: "single", src: repSpeedImg, alt: "Rep Speed"}
    },

    {
        title: "Raincouver",
        subtitle: "Navigation app that routes users around rain",
        description:
            "A web app that routes you around the rain using GPS, a street-exposure scoring system, and a pathfinding algorithm that prioritizes shelter over speed.",
        tags: ["JavaScript", "React"],
        status: "Ongoing",
        liveUrl: null, // not deployed rn
        media: { type: "single", src: raincouverImg, alt: "Raincouver map UI" },
    },
    {
        title: "Personal Website",
        subtitle: "Interactive portfolio with 3D volleyball-themed UI",
        description:
            "A fully-responsive portfolio built from scratch with 3D rendering, animations, and a volleyball-themed interactive UI.",
        tags: ["JavaScript", "React", "Three.js"],
        status: "Ongoing",
        liveUrl: null, // you're on it lol
        media: { type: "single", src: websiteImg, alt: "3D volleyball court portfolio" },
    },
    {
        title: "Spike Timer Analyzer",
        subtitle: "Helping athletes time their spikes efficiently",
        description:
            "A computer vision tool that analyzes spike timing from a video, extracting takeoff, contact, and landing data.",
        tags: ["JavaScript", "React"],
        date: "March 2026",
        liveUrl: "https://spike-timer.vercel.app/",
        media: {
            type: "dual",
            images: [
                { src: spikeActionImg, alt: "Spike timing action frame" },
                { src: spikeResultsImg, alt: "Spike timing accuracy results" },
            ],
        },
        testimonials: [
            { quote: "Tried this and its legit!!!!", author: "@mambobita, Instagram" },
            // Add more testimonials here:
            // { quote: "...", author: "Name, Role" },
        ],
    },
    {
        title: "Volleyball Stat Tracker",
        subtitle: "Real-time in-game stats",
        description:
            "A real-time stat logging tool built for live matches, with optimized inputs designed for speed and in-game decision-making. Whiteboard included to visualize strategy.",
        tags: ["React"],
        date: "Feb 2026",
        liveUrl: "https://website-phi-one-74.vercel.app/",
        media: {
            type: "dual",
            images: [
                { src: statTrackerImg, alt: "Volleyball stat tracker dashboard" },
                { src: whiteboardImg, alt: "Volleyball whiteboard" },
            ],
        },
    },
]

// ── Media block ──────────────────────────────────────────────
function Media({ media, isMobile }) { // pictures
    const base = {
        width: "100%",
        borderRadius: isMobile ? "18px" : "20px",
        overflow: "hidden",
        border: `1px solid ${C.border}`,
        aspectRatio: isMobile ? "16 / 10" : "4 / 3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    if (media.type === "dual") {
        // On mobile: stack the two images vertically (full width each).
        // On desktop: side-by-side halves.
        return (
            <div
                style={{
                    ...base,
                    backgroundColor: C.dark,
                    padding: "0.75rem",
                    gap: isMobile ? "0.6rem" : "0.75rem",
                    flexDirection: isMobile ? "column" : "row",
                    aspectRatio: isMobile ? "auto" : base.aspectRatio,
                }}
            >
                {media.images.map((img) => (
                    <img
                        key={img.alt}
                        src={img.src}
                        alt={img.alt}
                        style={{
                            width: isMobile ? "100%" : "50%",
                            height: isMobile ? "auto" : "100%",
                            maxHeight: isMobile ? "260px" : "none",
                            objectFit: "contain",
                            borderRadius: "10px",
                            display: "block",
                        }}
                    />
                ))}
            </div>
        )
    }

    // "fit" = show whole image (no crop); "single" = fill/crop
    const isFit = media.type === "fit"
    return (
        <div style={{ ...base, backgroundColor: isFit ? C.dark : "#2b2f3a" }}>
            <img
                src={media.src}
                alt={media.alt}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: isFit ? "contain" : "cover",
                    display: "block",
                }}
            />
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
            Live site ↗
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

            <Media media={project.media} isMobile />

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

    const mediaEl = <Media media={project.media} isMobile={false} />

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