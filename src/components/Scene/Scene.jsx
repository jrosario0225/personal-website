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
import createBenches from "./createBenches"
import createScoreboard from "./createScoreboard";

// importing Physics
import createPhysics from "../createPhysics"

// importing pointer controls
import createPointerControls from "./createPointerControls";


function Scene() {
    const mountRef = useRef(null)

    const isMobile = window.matchMedia("(pointer:coarse)").matches

    useEffect(() => {
        const mount = mountRef.current

        const clock = new THREE.Clock()

        // Scene
        const scene = new THREE.Scene()

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000
        )
        // camera.position.set(6, 3, 7)
        camera.position.set(3.5, 0, 3.5)



        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: !isMobile, 
            alpha: true,
            powerPreference: "high-performance"
        })

        renderer.setPixelRatio(1)
        renderer.setSize(
            mount.clientWidth, 
            mount.clientHeight)
        mount.appendChild(renderer.domElement)

        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = isMobile ? THREE.BasicShadowMap : THREE.PCFSoftShadowMap

        renderer.setClearColor(0x000000, 0) // transparent bg
        renderer.setClearAlpha(0)

        // Move camera
        const controls = createOrbitControls(camera, mount)


        // (1) Volleyball
        const ball = createVolleyball(scene)

        // (2) Lighting
        const { ambientLight, directionalLight } = createLighting(scene, isMobile)

        // (3) Net
        const netGroup = createNet(scene)

        // (4) Floor
        const floor = createFloor(scene)

        // (5) Window
        const courtWindow = createWindow(scene)

        // (6) Benches
        const benches = createBenches(scene)

        // (7) Scoreboard
        const scoreboard = createScoreboard(scene)

        const dustController = isMobile ? null : createDust(scene)

        // Gravity 
        const { velocity, angularVelocity, update } = createPhysics(ball)

        const removePointerControls = createPointerControls({
            mount,
            ball,
            camera,
            velocity,
            angularVelocity,
            controls
        })

        // Handle window resize
        const onWindowResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(mount.clientWidth, mount.clientHeight)
        }

        window.addEventListener("resize", onWindowResize)

        // Animation Loop
        let animationId

        const animate = () => {
            animationId = requestAnimationFrame(animate)

            const deltaTime = Math.min(clock.getDelta(), 1 / 30)

            controls.update()
            update(deltaTime) // updates the ball's position
            dustController?.update()

            renderer.render(scene, camera)
        }
        animate()

        return () => {
            cancelAnimationFrame(animationId)

            window.removeEventListener("resize", onWindowResize)

            removePointerControls()
            controls.dispose()
            renderer.dispose()

            if (renderer.domElement.parentNode === mount) {
                mount.removeChild(renderer.domElement)
            }
        }


    }, [])

    return (
        <div ref={mountRef}
            style={{
                width: "100vw",
                height: "100vh",
                touchAction: "none",
                background: "radial-gradient(circle at center, #fffff0 0%, #c4a882 45%)"
            }} />
    )
}

export default Scene