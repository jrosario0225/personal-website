import * as THREE from "three"
import createVolleyballTexture from "../../assets/createVolleyballTexture"

function createVolleyball(scene) {
    const canvas = createVolleyballTexture()
    const texture = new THREE.CanvasTexture(canvas)

    const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32)
    const ballMaterial = new THREE.MeshPhongMaterial({ map: texture })
    const ball = new THREE.Mesh(ballGeometry, ballMaterial)
    ball.position.set(0, 0, 0)
    
    scene.add(ball)
    return ball
}

export default createVolleyball;