
function createHitDetection(ball, mouse, camera, velocity, angularVelocity) {
    const hitRadius = 0.1

    const checkHit = () => {

        // Converting 3D pos to 2D pos (-1 to +1)
        const ballPos = ball.position.clone()
        ballPos.project(camera)

        // Distance between mouse and ball in screen space
        const dx = mouse.x - ballPos.x
        const dy = mouse.y - ballPos.y
        const distance = Math.sqrt((dx * dx) + (dy * dy))

        if (distance < hitRadius) {
            
            // ball is moved from direction it's hit
            const hitForce = 0.015
            velocity.x = (ballPos.x - mouse.x) * hitForce * 10
            velocity.y = (ballPos.y - mouse.y) * hitForce * 10

            // Always guarantee upward pop
            if (velocity.y < 0.05) velocity.y = 0.05

            // Set spin based on the hit
            angularVelocity.z = -velocity.x * 0.5
            angularVelocity.x = velocity.y * 0.5
           
        }
    }

    return { checkHit }

}

export default createHitDetection;