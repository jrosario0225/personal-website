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
        ctx.fillStyle = plankColors[i % plankColors.length]

        // Wood grain lines
        ctx.strokeStyle = "rgba(0, 0, 0, 0.08)"
        ctx.lineWidth = 1
        for (let g = 0; g < 6; g++) {
            ctx.beginPath()
            ctx.moveTo(0, (y + (plankHeight / 6) * g))
            ctx.lineTo(size, (y + (plankHeight / 6) * g) + (Math.random() * 10 - 5))
            ctx.stroke()
        }
    }

    // Plank gap lines
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)"
    ctx.lineWidth = 2
    for (let i = 0; i < 12; i++) {
        ctx.beginPath()
        ctx.moveTo(0, (i * plankHeight))
        ctx.lineTo(size, (i * plankHeight))
        ctx.stroke()
    }

    // Court boundary lines
    const lineCanvas = document.createElement("canvas")
    lineCanvas.width = size
    lineCanvas.height = size
    const lCtx = lineCanvas.getContext("2d")

    lCtx.strokeStyle = "#ffffff"
    lCtx.lineWidth = 12
    lCtx.lineCap = "round"

    // Outer boundary
    lCtx.strokeRect(80, 80, 864, 864)

    // Center line
    lCtx.beginPath()
    lCtx.moveTo(80, 512)
    lCtx.lineTo(944, 512)
    lCtx.stroke()

    const lineTexture = new THREE.CanvasTexture(lineCanvas)

    const linesGeo = new THREE.PlaneGeometry(6.5, 12)
    const linesMat = new THREE.MeshBasicMaterial({
        map: lineTexture,
        transparent: true,
        opacity: 1,
        depthWrite: false
    })

    const lines = new THREE.Mesh(linesGeo, linesMat)
    lines.rotation.x = -Math.PI / 2
    lines.position.set(-1.5, -2.97, -4)
    scene.add(lines)


    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(3, 3)

    const floorGeo = new THREE.BoxGeometry(10, 14, 0.05)
    const floorMat = new THREE.MeshPhongMaterial({ map: texture })
    const floor = new THREE.Mesh(floorGeo, floorMat)

    floor.rotation.x = -Math.PI / 2
    floor.position.set(-2, -3, -4)
    scene.add(floor)

    floor.receiveShadow = true

    return floor


}

export default createFloor;``