import { useEffect, useRef } from "react";
import * as THREE from "three"

// importing Scene components
import createVolleyball from "./createVolleyball";
import createLighting from "./createLighting";
import createNet from "./createNet";

function Scene() {
    const mountRef = useRef(null)

    useEffect(() => {
        const mount = mountRef.current

        // Scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x87CEEB) // sky blue

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000
        )
        camera.position.z = 5

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        mount.appendChild(renderer.domElement)


        // Animation Loop
        let animationId
        const animate = () => {
            animationId = requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()


        {/* Things added to the Scene */ }
        // Volleyball
        const ball = createVolleyball(scene)

        // Lighting
        const ambientLight = createLighting(scene)
        const directionalLight = createLighting(scene)

        // Net
        const netGroup = createNet(scene)


        // Cleanup when component unmounts 
        return () => {
            cancelAnimationFrame(animationId)
            mount.removeChild(renderer.domElement)
            renderer.dispose()
        }

    }, [])

    return (
        <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
    )
}

export default Scene