import * as THREE from "three"

function createScoreboard(scene) {
    const group = new THREE.Group()

    const tableMat = new THREE.MeshPhongMaterial({ color: 0xC68642 })
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0x4a3728 })

    // Table top
    const tableGeo = new THREE.BoxGeometry(2, 0.1, 1)
    const table = new THREE.Mesh(tableGeo, tableMat)
    table.castShadow = true
    table.receiveShadow = true
    group.add(table)

    // Table legs
    const legGeo = new THREE.BoxGeometry(0.08, 0.8, 0.08)
    const legPositions = [
        [-0.9, -0.45, -0.4],
        [0.9, -0.45, -0.4],
        [-0.9, -0.45, 0.4],
        [0.9, -0.45, 0.4]
    ]
    legPositions.forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(legGeo, tableMat)
        leg.position.set(x, y, z)
        leg.castShadow = true
        group.add(leg)
    })

    // Base of scoreboard (flat black rectangle on table)
    const baseGeo = new THREE.BoxGeometry(1.6, 0.05, 0.7)
    const base = new THREE.Mesh(baseGeo, bodyMat)
    base.position.set(0, 0.08, 0)
    base.castShadow = true
    group.add(base)

    // Front angled panel (where cards go)
    const panelGeo = new THREE.BoxGeometry(1.6, 0.7, 0.03)
    const frontPanel = new THREE.Mesh(panelGeo, bodyMat)
    frontPanel.position.set(0, 0.4, 0.15)
    frontPanel.rotation.x = -Math.PI / 6 // lean back
    frontPanel.castShadow = true
    group.add(frontPanel)

    // Back panel (leans the other way for support)
    const backPanel = new THREE.Mesh(panelGeo, bodyMat)
    backPanel.position.set(0, 0.4, -0.15)
    backPanel.rotation.x = Math.PI / 6 // lean forward
    backPanel.castShadow = true
    group.add(backPanel)

    // Flip cards on front panel
    const cardGeo = new THREE.PlaneGeometry(0.28, 0.55)

    const cardData = [
        { color: 0x2255aa, x: -0.6 },
        { color: 0x2255aa, x: -0.3 },
        { color: 0xffffff, x: 0 },
        { color: 0xaa3333, x: 0.3 },
        { color: 0xaa3333, x: 0.6 }
    ]

    cardData.forEach(({ color, x }) => {

        const isCenter = color === 0xffffff
        const geo = isCenter ? new THREE.PlaneGeometry(0.25, 0.3) : cardGeo

        const cardMat = new THREE.MeshPhongMaterial({ color })
        const card = new THREE.Mesh(geo, cardMat)
        card.position.set(x, 0.35, 0.2)
        card.rotation.x = -Math.PI / 6
        card.castShadow = true
        group.add(card)
    })

    group.position.set(-6, -2.15, 0)
    group.rotation.y = (Math.PI / 2)
    scene.add(group)

    return group
}

export default createScoreboard