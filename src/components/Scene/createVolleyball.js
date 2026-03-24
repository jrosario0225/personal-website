import * as THREE from "three"

function createVolleyball(scene) {
    const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32)
    const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xfad97e })
    const ball = new THREE.Mesh(ballGeometry, ballMaterial)
    ball.position.set(0, 0, 0)
    scene.add(ball)
    return ball
}

export default createVolleyball;