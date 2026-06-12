function createVolleyballTexture() {
    const size = 1024
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size / 2
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    // Base yellow
    ctx.fillStyle = "#F2C94C"
    ctx.fillRect(0, 0, w, h)

    // Blue circular panels
    ctx.fillStyle = "#2D5BE3"
    const radius = h * 0.35

    const positions = [
        [w * 0.15, h * 0.3],
        [w * 0.5, h * 0.7],
        [w * 0.85, h * 0.3]
    ]

    positions.forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        // Draw again at wrapped edges for seamless tiling
        ctx.beginPath()
        ctx.arc(x - w, y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x + w, y, radius, 0, Math.PI * 2)
        ctx.fill()
    })

    return canvas
}

export default createVolleyballTexture