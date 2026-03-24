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

        // Volleyball
        const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32)
        const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xfad97e })
        const ball = new THREE.Mesh(ballGeometry, ballMaterial)
        ball.position.set(0, 0, 0)
        scene.add(ball)

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(5, 10, 5)
        scene.add(directionalLight)


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