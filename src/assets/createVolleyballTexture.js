// WORK ON THIS LATER

function createVolleyballTexture() {
    const size = 512
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const s = size

    // Warm yellow base
    ctx.fillStyle = "#F2C94C"
    ctx.fillRect(0, 0, s, s)

    // Single bold blue swoosh across the middle
    ctx.fillStyle = "#2D5BE3"

    ctx.beginPath()
    ctx.moveTo(0, s * 0.35)
    ctx.bezierCurveTo(s * 0.25, s * 0.3, s * 0.75, s * 0.4, s, s * 0.35)
    ctx.lineTo(s, s * 0.65)
    ctx.bezierCurveTo(s * 0.75, s * 0.6, s * 0.25, s * 0.7, 0, s * 0.65)
    ctx.closePath()
    ctx.fill()

    // Soft white seam lines
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 8
    ctx.lineCap = "round"

    // Top seam
    ctx.beginPath()
    ctx.moveTo(0, s * 0.35)
    ctx.bezierCurveTo(s * 0.25, s * 0.3, s * 0.75, s * 0.4, s, s * 0.35)
    ctx.stroke()

    // Bottom seam
    ctx.beginPath()
    ctx.moveTo(0, s * 0.65)
    ctx.bezierCurveTo(s * 0.25, s * 0.7, s * 0.75, s * 0.6, s, s * 0.65)
    ctx.stroke()

    // Vertical seam
    ctx.beginPath()
    ctx.moveTo(s * 0.5, 0)
    ctx.bezierCurveTo(s * 0.45, s * 0.25, s * 0.55, s * 0.75, s * 0.5, s)
    ctx.stroke()

    return canvas
}

export default createVolleyballTexture