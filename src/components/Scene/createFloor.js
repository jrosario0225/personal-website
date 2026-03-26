import * as THREE from "three"

function createFloor(scene) {

    // Wood texture on canvas
    const size = 1024
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    // Base wood color
    ctx.fillStyle = "#C68642"
    ctx.fillRect(0, 0, size, size)

    // Wood planks
    const plankHeight = size / 12
    const plankColors = ["#C68642", "#B5743A", "#D4944A", "#BE7D40"]

    for (let i = 0; i < 12; i++) {
        const y = i * plankHeight
        
    }
}

export default createFloor;