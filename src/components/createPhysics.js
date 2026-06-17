
function createPhysics(ball) {
    const velocity = ({ x: 0, y: 0, z: 0 })
    const angularVelocity = { x: 0, z: 0 }

    const gravity = -0.01

    const ballRadius = 0.38

    const floorY = -3
    ball.position.y = -2

    // Creating side wall boundary (invisible)
    const floorCenterX = -2  // center coordinate
    const floorWidth = 5 // taken from createFloor.js

    // Left wall
    const wallXMin = floorCenterX - floorWidth / 2 + ballRadius

    // Right wall
    const wallXMax = floorCenterX + floorWidth / 2 + ballRadius


    // How the ball will keep moving through the scene
    const update = () => {
        if (!ball) return

        velocity.y += gravity

        ball.position.x += velocity.x
        ball.position.y += velocity.y
        ball.position.z += velocity.z

        // for rotation
        ball.rotation.z -= angularVelocity.z
        ball.rotation.x += angularVelocity.x


        // What happens if the ball touches the ground/floor
        if (ball.position.y <= floorY + ballRadius) {
            ball.position.y = floorY + ballRadius
            velocity.y *= -0.8
            angularVelocity.x *= 0.5
            angularVelocity.z *= 0.5

            // Friction
            velocity.x *= 0.97

            // Settle completely once movement is negligible
            if (Math.abs(velocity.y) < 0.01) {
                velocity.y = 0
            }
            if (Math.abs(velocity.x) < 0.0002) {
                velocity.x = 0
            }
        

        }

        // Wall bouncing
        
    
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