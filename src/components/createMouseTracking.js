import * as THREE from "three";

function createMouseTracking(mount) {

    const mouse = new THREE.Vector2()

    const onMouseMove = (e) => {
        // Convert screen pixels to Three.js coordinates (-1 to +1)
        mouse.x = (e.clientX / mount.clientWidth) * 2 - 1
        mouse.y = -(e.clientY / mount.clientHeight) * 2 + 1
        // console.log(mouse.x, mouse.y)
    }

    mount.addEventListener('mousemove', onMouseMove)

    return { mouse, onMouseMove }

}

export default createMouseTracking