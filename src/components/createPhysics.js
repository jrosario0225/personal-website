
function createPhysics(ball) {
    const velocity = ({ x: 0, y: 0, z: 0 })
    const angularVelocity = { x: 0, z: 0 }

    const gravity = -0.0055


    const ballRadius = 0.38

    const floorY = -3
    ball.position.y = -1

    // Creating side wall boundary (invisible)
    const floorCenterX = -2  // center coordinate
    const floorWidth = 5 // taken from createFloor.js

    // Left wall
    const wallXMin = floorCenterX - floorWidth / 2 + ballRadius

    // Right wall
    const wallXMax = floorCenterX + floorWidth / 2 + ballRadius


    // How the ball will keep moving through the scene
    const update = (deltaTime) => {
    if (!ball) return

    // 1 at 60 FPS, 0.5 at 120 FPS, 2 at 30 FPS
    const frameScale = deltaTime * 60

    velocity.y += gravity * frameScale

    ball.position.x += velocity.x * frameScale
    ball.position.y += velocity.y * frameScale
    ball.position.z += velocity.z * frameScale

    ball.rotation.z -= angularVelocity.z * frameScale
    ball.rotation.x += angularVelocity.x * frameScale

    if (ball.position.y <= floorY + ballRadius) {
        ball.position.y = floorY + ballRadius
        velocity.y *= -0.65

        angularVelocity.x *= 0.5
        angularVelocity.z *= 0.5

        // Equivalent to multiplying by 0.97 once at 60 FPS.
        velocity.x *= Math.pow(0.97, frameScale)

        if (Math.abs(velocity.y) < 0.01) {
            velocity.y = 0
        }

        if (Math.abs(velocity.x) < 0.0002) {
            velocity.x = 0
        }
    }

    if (ball.position.x >= wallXMax) {
        ball.position.x = wallXMax
        velocity.x *= 0.2
    }

    if (ball.position.x <= wallXMin) {
        ball.position.x = wallXMin
        velocity.x *= 0.2
    }
}

    return { velocity, angularVelocity, update }

}

export default createPhysics;