
// importing Orbit Controls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// Move camera 
function createOrbitControls(camera, mount) {
    const controls = new OrbitControls(camera, mount)
    controls.enableDamping = true
    controls.dampingFactor = 0.02
    return controls
}

export default createOrbitControls;