
function createHitDetection(ball, mouse, camera, velocity) {
    const hitRadius = 0.2

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
            const hitForce = 0.15
            velocity.x = (ballPos.x - mouse.x) * hitForce * 10
            velocity.y = (ballPos.y - mouse.y) * hitForce * 10

            // Always guarantee upward pop
            if (velocity.y < 0.05) velocity.y = 0.05
        }
    }

    return { checkHit }

}

export default createHitDetection;