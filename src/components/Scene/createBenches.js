
import * as THREE from "three"

function createBenches(scene) {
    const group = new THREE.Group()

    const woodMat = new THREE.MeshPhongMaterial({ color: 0x8B5E3C })
    const metalMat = new THREE.MeshPhongMaterial({ color: 0x888888 }) 

    function createBench(x, z, rotationY) {
        const benchGroup = new THREE.Group()

        // Seat
        const seatGeo = new THREE.BoxGeometry(3, 0.1, 0.5)
        const seat = new THREE.Mesh(seatGeo, woodMat)
        seat.position.set(0, 0.5, 0)
        seat.castShadow = true
        seat.receiveShadow = true
        benchGroup.add(seat)

        // Left leg
        const legGeo = new THREE.BoxGeometry(0.08, 0.5, 0.5)
        const leftLeg = new THREE.Mesh(legGeo, metalMat)
        leftLeg.position.set(-1.3, 0.25, 0)
        leftLeg.castShadow = true
        benchGroup.add(leftLeg)

        // Right leg
        const rightLeg = new THREE.Mesh(legGeo, metalMat)
        rightLeg.position.set(1.3, 0.25, 0)
        rightLeg.castShadow = true
        benchGroup.add(rightLeg)

        benchGroup.position.set(x, -3, z)
        benchGroup.rotation.y = rotationY
        group.add(benchGroup)
    }

    // Left side bench
    createBench(2, 0, (Math.PI / 2 ))

    // Right side bench
    createBench(2, -6, (Math.PI / 2 ))

    scene.add(group)
    return group
}

export default createBenches;