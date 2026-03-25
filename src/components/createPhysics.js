
function createPhysics(ball) {
    const velocity = ({ x:0, y:0, z:0 })
    const gravity = -0.003
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
            velocity.y *= -0.4
        }

    }

    return { velocity, update }

}

export default createPhysics;