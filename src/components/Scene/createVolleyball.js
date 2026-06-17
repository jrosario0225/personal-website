
import * as THREE from "three"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"

function createVolleyball(scene) {
    // Placeholder to allow physics to run without error

    const ball = new THREE.Group()
    ball.position.set(0, 0, 0)
    scene.add(ball)

    const loader = new FBXLoader()
    loader.load("/models/mikasa/Mikasa V200W.fbx", (model) => {
        const texture = new THREE.TextureLoader().load(
            "/models/mikasa/MikasaV200W_MikasaV200W_Material_BaseColor.png"
        )

        model.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhongMaterial({ map: texture })
                child.castShadow = true
            }
        })

        // Scale the model down to match our ball radius (-0.5)
        model.scale.set(0.003, 0.003, 0.003)
        // model.position.set(0, -0.123, 0)

        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)
        

        ball.add(model)
    })

    return ball
}

export default createVolleyball