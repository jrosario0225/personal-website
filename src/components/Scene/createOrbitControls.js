
// importing Orbit Controls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as THREE from "three"

// Move camera 
function createOrbitControls(camera, mount) {
    const controls = new OrbitControls(camera, mount)

    controls.enableDamping = true
    controls.dampingFactor = 0.02

    const isMobile = window.matchMedia("(pointer: coarse)").matches
    
    if (isMobile) {
        controls.touches.ONE = null
        controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE
    }


    return controls
}

export default createOrbitControls;