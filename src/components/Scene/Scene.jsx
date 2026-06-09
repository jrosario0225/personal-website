import { useEffect, useRef } from "react";
import * as THREE from "three"

// importing Scene components
import createVolleyball from "./createVolleyball";
import createLighting from "./createLighting";
import createNet from "./createNet";
import createFloor from "./createFloor";
import createWindow from "./createWindow";
import createOrbitControls from "./createOrbitControls";
import createDust from "./createDust"


// importing Physics
import createPhysics from "../createPhysics"

// importing Mouse
import createMouseTracking from "../createMouseTracking";

// importing Hit Detection
import createHitDetection from "../createHitDetection";


function Scene() {
    const mountRef = useRef(null)

    useEffect(() => {
        const mount = mountRef.current

        // Scene
        const scene = new THREE.Scene()
        
        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000
        )
        camera.position.set(6, 5, 7)

        camera.lookAt(0, 0, 0)

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        mount.appendChild(renderer.domElement)

        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap

        renderer.setClearColor(0x000000, 0) // transparent bg
        renderer.setClearAlpha(0)

        // Move camera
        const controls = createOrbitControls(camera, mount)


        // (1) Volleyball
        const ball = createVolleyball(scene)

        // (2) Lighting
        const { ambientLight, directionalLight } = createLighting(scene)

        // (3) Net
        const netGroup = createNet(scene)

        // (4) Floor
        const floor = createFloor(scene)

        // (5) Window
        const courtWindow = createWindow(scene)

        const { update: updateDust } = createDust(scene)

        // Gravity 
        const { velocity, update } = createPhysics(ball)

        // Mouse Tracking
        const { mouse, onMouseMove } = createMouseTracking(mount)

        // Hit Detection
        const { checkHit } = createHitDetection(ball, mouse, camera, velocity)

        // Animation Loop
        let animationId

        const animate = () => {
            animationId = requestAnimationFrame(animate)
            controls.update()
            update() // updates the ball's position
            updateDust()
            if (checkHit()) { }
            renderer.render(scene, camera)
        }
        animate()

        return () => {
            cancelAnimationFrame(animationId)
            mount.removeChild(renderer.domElement)
            mount.removeEventListener("mousemove", onMouseMove)
            renderer.dispose()
        }
    }, [])

    return (
        <div ref={mountRef}
            style={{
                width: "100vw",
                height: "100vh",
                background:"radial-gradient(circle at center, #fff8e7 0%, #c8956c 100%)"
            }} />
    )
}

export default Scene