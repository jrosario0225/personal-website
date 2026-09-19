import * as THREE from "three"

function createPointerControls({
    mount,
    ball,
    camera,
    velocity,
    angularVelocity,
}) {
    
    // making hitbox bigger on mobile
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    const hitRadius = isTouchDevice ? 65 : 48
    
    // tracking active touch pointers
    const touchPointers = new Set()



    let previousMouse = null
    let mouseInsideBall = false
    let activeTouch = null

    const getBallScreenPosition = () => {
        const rect = mount.getBoundingClientRect()
        const projected = ball.position.clone().project(camera)

        return {
            x: rect.left + ((projected.x + 1) / 2) * rect.width,
            y: rect.top + ((1 - projected.y) / 2) * rect.height
        }
    }

    const distanceBetween = (a, b) => {
        return Math.hypot(a.x - b.x, a.y - b.y)
    }

    // Detects whether the pointer travelled through the ball,
    // including fast swipes that skip over its center.
    const segmentHitsBall = (start, end, ballPosition) => {
        const segmentX = end.x - start.x
        const segmentY = end.y - start.y
        const lengthSquared =
            segmentX * segmentX + segmentY * segmentY

        if (lengthSquared === 0) {
            return distanceBetween(start, ballPosition) <= hitRadius
        }

        const projection =
            ((ballPosition.x - start.x) * segmentX +
                (ballPosition.y - start.y) * segmentY) /
            lengthSquared

        const amount = THREE.MathUtils.clamp(projection, 0, 1)

        const closestPoint = {
            x: start.x + segmentX * amount,
            y: start.y + segmentY * amount
        }

        return distanceBetween(closestPoint, ballPosition) <= hitRadius
    }

    const applyImpulse = (start, end) => {
        const dx = end.x - start.x
        const dy = end.y - start.y
        const pointerSpeed = Math.hypot(dx, dy)

        if (pointerSpeed < 2) return

        const directionX = dx / pointerSpeed
        const directionY = -dy / pointerSpeed

        const force = THREE.MathUtils.clamp(
            pointerSpeed * 0.003,
            0.05,
            0.20
        )

        velocity.x = directionX * force


        const verticalImpulse = THREE.MathUtils.clamp(
            directionY * force,
            -0.12,
            0.13
        )

        velocity.y =
            verticalImpulse > 0
                ? Math.max(verticalImpulse, 0.085)
                : verticalImpulse


        angularVelocity.z = -velocity.x * 0.5
        angularVelocity.x = velocity.y * 0.5
    }

    const handleMouseMove = (event) => {
        const current = {
            x: event.clientX,
            y: event.clientY
        }

        if (!previousMouse) {
            previousMouse = current
            return
        }

        const ballPosition = getBallScreenPosition()
        const currentlyInside =
            distanceBetween(current, ballPosition) <= hitRadius

        const hit = segmentHitsBall(
            previousMouse,
            current,
            ballPosition
        )

        if (hit && !mouseInsideBall) {
            applyImpulse(previousMouse, current)
        }

        mouseInsideBall = currentlyInside
        previousMouse = current
    }

    const handlePointerDown = (event) => {
        if (event.pointerType === "mouse") return

        touchPointers.add(event.pointerId)

        if (touchPointers.size > 1) {
            activeTouch = null
            return
        }

        const current = {
            x: event.clientX,
            y: event.clientY
        }

        event.preventDefault()

        mount.setPointerCapture(event.pointerId)

        activeTouch = {
            pointerId: event.pointerId,
            previous: current,
            hasHit: false
        }
    }

    const handleTouchMove = (event) => {
        if (
            !activeTouch ||
            event.pointerId !== activeTouch.pointerId
        ) {
            return
        }

        event.preventDefault()

        const current = {
            x: event.clientX,
            y: event.clientY
        }

        const ballPosition = getBallScreenPosition()
    
        const hit = segmentHitsBall(
            activeTouch.previous,
            current,
            ballPosition
        )

        if (hit && !activeTouch.hasHit) {
            applyImpulse(activeTouch.previous, current)
            activeTouch.hasHit = true
        }

        activeTouch.previous = current
    }

    const endTouch = (event) => {
        touchPointers.delete(event.pointerId)


        if (mount.hasPointerCapture(event.pointerId)) {
            mount.releasePointerCapture(event.pointerId)
        }

        if (activeTouch?.pointerId === event.pointerId) {
            activeTouch = null
        }
    }

    const handlePointerMove = (event) => {
        if (event.pointerType === "mouse") {
            handleMouseMove(event)
            return
        }

        handleTouchMove(event)
    }

    const handleMouseLeave = () => {
        previousMouse = null
        mouseInsideBall = false
    }

    mount.addEventListener("pointerdown", handlePointerDown, {
        capture: true,
        passive: false
    })

    mount.addEventListener("pointermove", handlePointerMove, {
        capture: true,
        passive: false
    })

    mount.addEventListener("pointerup", endTouch)
    mount.addEventListener("pointercancel", endTouch)
    mount.addEventListener("pointerleave", handleMouseLeave)

    return () => {
        mount.removeEventListener(
            "pointerdown",
            handlePointerDown,
            true
        )

        mount.removeEventListener(
            "pointermove",
            handlePointerMove,
            true
        )

        mount.removeEventListener("pointerup", endTouch)
        mount.removeEventListener("pointercancel", endTouch)
        mount.removeEventListener(
            "pointerleave",
            handleMouseLeave
        )
    }
}

export default createPointerControls