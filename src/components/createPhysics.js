
function createPhysics(ball) {
    const velocity = ({ x:0, y:0, z:0 })
    const gravity = -0.002
    const ballRadius = 0.5
    const floorY = -3

    // How the ball will keep moving through the scene
    const update = () => {
        if (!ball) return

        velocity.y += gravity

        ball.position.x += velocity.x
        ball.position.y += velocity.y
        ball.position.z += velocity.z


        // What happens if the ball touches the ground/floor
        if (ball.position.y <= floorY + ballRadius) {
            ball.position.y = floorY + ballRadius
            velocity.y *= -0.8
        }

        // Wall bouncing
        const wallX = 4
        if (ball.position.x >= wallX - ballRadius) {
            ball.position.x = wallX - ballRadius
            velocity.x *= -0.8
        }
        if (ball.position.x <= -wallX + ballRadius) {
            ball.position.x = wallX + ballRadius
            velocity.x *= -0.8
        }

    }

    return { velocity, update }

}

export default createPhysics;