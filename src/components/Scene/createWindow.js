
import * as THREE from "three"

function createWindow(scene) {
    const group = new THREE.Group()

    // Back wall
    const wallGeo = new THREE.PlaneGeometry(16, 7)
    const wallMat = new THREE.MeshPhongMaterial({ color: 0xd4b896 })
    const wall = new THREE.Mesh(wallGeo, wallMat)
    wall.position.set(0, 1, -5)
    // wall.position.set(-7, -2, -4)
    // wall.rotation.y = Math.PI / 2
    group.position.set(-4, -2, -4)
    group.rotation.y = Math.PI / 2
    // group.add(wall)

    // Window frame
    const frameMat = new THREE.MeshPhongMaterial({ color: 0x4a3728 })

    // Top and Bottom Bar
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.15, 0.1), frameMat)
    topBar.position.set(0, 3.6, -4.9) // top
    group.add(topBar)

    // Bottom bar
    const bottomBar = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.15, 0.1), frameMat)
    bottomBar.position.set(0, 2.5, -4.9)
    group.add(bottomBar)

    // Left Bar
    const leftBar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.3, 0.1), frameMat)
    leftBar.position.set(-1.6, 3.05, -4.9)
    group.add(leftBar)

    // Right Bar
    const rightBar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.3, 0.1), frameMat)
    rightBar.position.set(1.6, 3.05, -4.9)
    group.add(rightBar)

    // Glass
    const glassGeo = new THREE.PlaneGeometry(3.2, 1.1)
    const glassMat = new THREE.MeshBasicMaterial( {
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.4
    })
    const glass = new THREE.Mesh(glassGeo, glassMat)
    glass.position.set(0, 3.05, -4.88)
    group.add(glass)

    // Sun Rays
    const rayMat = new THREE.MeshBasicMaterial({
        color: "#fff9d8",
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide,
        depthWrite: false
    })

    const rayCount = 50
    for (let i = 0; i < rayCount; i++) {
        const rayGeo = new THREE.BufferGeometry()
        const spread = 0.8
        const x = -1.4 + (i / (rayCount - 1)) * 2.8
        const topY = 3.5
        const bottomY = -3
        const fanX = (x / 1.4 ) * 5
    

    const vertices = new Float32Array([
        x - spread * 0.3, topY, -4.87,
        x + spread * 0.3, topY, -4.87,
        fanX + spread, bottomY, 1, 
        fanX - spread, bottomY, 1,
    ])

    const indices = [0, 1, 2, 0, 2, 3]
    rayGeo.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
    rayGeo.setIndex(indices)

    const ray = new THREE.Mesh(rayGeo, rayMat)
    group.add(ray)

    }

    scene.add(group)
    return group

}

export default createWindow