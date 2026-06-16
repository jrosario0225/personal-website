
function createPhysics(ball) {
    const velocity = ({ x: 0, y: 0, z: 0 })
    const gravity = -0.002
    const ballRadius = 0.5
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
    const update = () => {
        if (!ball) return

        velocity.y += gravity

        ball.position.x += velocity.x
        ball.position.y += velocity.y
        ball.position.z += velocity.z

        // for rotation
        ball.rotation.z -= velocity.x * 2
        ball.rotation.x += velocity.x * 2


        // What happens if the ball touches the ground/floor
        if (ball.position.y <= floorY + ballRadius) {
            ball.position.y = floorY + ballRadius
            velocity.y *= -0.8
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

    return { velocity, update }

}

export default createPhysics;