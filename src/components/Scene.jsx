import { useEffect, useRef } from "react";
import * as THREE from "three"

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
        renderer.render(scene, camera)

        {/* Cleanup when component unmounts */ }
        return () => {
            mount.removeChild(renderer.domElement)
            renderer.dispose()
        }

    }, [])

    return (
        <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
    )
}

export default Scene