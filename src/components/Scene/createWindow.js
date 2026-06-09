
import * as THREE from "three"

function createWindow(scene) {
    const group = new THREE.Group()

    // Back wall
    const wallGeo = new THREE.PlaneGeometry(16, 8)
    const wallMat = new THREE.MeshPhongMaterial({ color: 0xd4b896 })
    const wall = new THREE.Mesh(wallGeo, wallMat)
    wall.position.set(-7, -2, -4)
    wall.rotation.y = Math.PI / 2
    group.add(wall)

    scene.add(group)
    return group;

}

export default createWindow