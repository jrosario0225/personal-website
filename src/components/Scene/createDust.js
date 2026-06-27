import * as THREE from "three"



// DELETE LATER


function createDust(scene) {
    const particleCount = 75
    const positions = new Float32Array(particleCount * 3)
    const velocities = []

    // Scatter particles in the air around the court
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 10  // x
        positions[i * 3 + 1] = Math.random() * 6 - 2       // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8   // z

        velocities.push({
            x: (Math.random() - 0.5) * 0.002,
            y: (Math.random() - 0.5) * 0.001,
            z: (Math.random() - 0.5) * 0.002
        })
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
        color: 0xfff5c0,
        size: 0.04,
        transparent: true,
        opacity: 0.6,
        depthWrite: false
    })

    const dust = new THREE.Points(geometry, material)
    scene.add(dust)

    // Update function to animate particles
    const update = () => {
        const pos = dust.geometry.attributes.position.array

        for (let i = 0; i < particleCount; i++) {
            pos[i * 3]     += velocities[i].x
            pos[i * 3 + 1] += velocities[i].y
            pos[i * 3 + 2] += velocities[i].z

            // Wrap particles back if they drift too far
            if (pos[i * 3] > 5)  pos[i * 3] = -5
            if (pos[i * 3] < -5) pos[i * 3] = 5
            if (pos[i * 3 + 1] > 4)  pos[i * 3 + 1] = -2
            if (pos[i * 3 + 1] < -2) pos[i * 3 + 1] = 4
            if (pos[i * 3 + 2] > 4)  pos[i * 3 + 2] = -4
            if (pos[i * 3 + 2] < -4) pos[i * 3 + 2] = 4
        }

        dust.geometry.attributes.position.needsUpdate = true
    }

    return { dust, update }
}

export default createDust