import * as THREE from "three"

function createNet(scene) {
    const netGroup = new THREE.Group()

    const netWidth = 6
    const netHeight = 1.5
    const netY = -0.5
    const netZ = -1


    // Left pole
    const poleGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.5, 16)
    const poleMat = new THREE.MeshPhongMaterial({ color: 0xff2200 })
    const leftPole = new THREE.Mesh(poleGeo, poleMat)
    leftPole.position.set((-netWidth / 2), (netY / 2 + 0.2), netZ)
    netGroup.add(leftPole)

    // Right pole
    const rightPole = new THREE.Mesh(poleGeo, poleMat)
    rightPole.position.set((netWidth / 2), (netY / 2 + 0.2), netZ)
    netGroup.add(rightPole)

    // Tape
    const topBarGeo = new THREE.BoxGeometry(netWidth, 0.07, 0.07)
    const topBarMat = new THREE.MeshPhongMaterial({ color: 0xffffff })
    const topBar = new THREE.Mesh(topBarGeo, topBarMat)
    topBar.position.set(0, netY + netHeight, netZ)
    netGroup.add(topBar)

    // Net Strings
    const netMat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.6, transparent: true })

    // Vertical strings
    for (let i = 1; i <= 11; i++) {
        const x = ((i / 12) * netWidth) - (netWidth / 2)
        const points = [
            new THREE.Vector3(x, netY, netZ),
            new THREE.Vector3(x, (netY + netHeight), netZ)
        ]
        const geo = new THREE.BufferGeometry().setFromPoints(points)
        netGroup.add(new THREE.Line(geo, netMat))
    }

    // Horizontal strings
    for (let i = 0; i <= 6; i++) {
        const y = netY + ((i / 6) * netHeight)
        const points = [
            new THREE.Vector3((-netWidth / 2), y, netZ),
            new THREE.Vector3((netWidth / 2), y, netZ)
        ]
        const geo = new THREE.BufferGeometry().setFromPoints(points)
        netGroup.add(new THREE.Line(geo, netMat))
    }

    scene.add(netGroup)
    return netGroup

}

export default createNet;