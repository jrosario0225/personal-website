
function createHitDetection(ball, mouse, camera) {
    const hitRadius = 0.2

    const checkHit = () => {

        // Converting 3D pos to 2D pos (-1 to +1)
        const ballPos = ball.position.clone()
        ballPos.project(camera)

        // Distance between mouse and ball in screen space
        const dx = mouse.x - ballPos.x
        const dy = mouse.y - ballPos.y
        const distance = Math.sqrt((dx * dx) + (dy * dy))

        return distance < hitRadius
    }

    return { checkHit }

}

export default createHitDetection;