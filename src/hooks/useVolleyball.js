import { useEffect, useRef } from "react"

function useVolleyball(ball) {
    const velocityRef = useRef({ x:0, y:0, z:0 })
    const gravity = -0.003
    const ballRadius = 0.5
    const floorY = -3

    // How the ball will keep moving through the scene
    const update = () => {
        if (!ball) return

        velocityRef.current.y += gravity

        ball.position.x += velocityRef.current.x
        ball.position.y += velocityRef.current.y
        ball.position.z += velocityRef.current.z


        // What happens if the ball touches the ground/floor
        if (ball.position.y <= floorY + ballRadius) {
            ball.position.y = floorY + ballRadius
            velocityRef.current.y *= -0.4
        }

    }

    return { velocityRef, update }

}

export default useVolleyball;