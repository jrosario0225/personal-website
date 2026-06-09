
import * as THREE from "three"

function createLighting(scene) {

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(-8, 2, -4)
    
    directionalLight.castShadow = true
    
    // Shadow quality settings
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 50
    directionalLight.shadow.camera.left = -10
    directionalLight.shadow.camera.right = 10
    directionalLight.shadow.camera.top = 10
    directionalLight.shadow.camera.bottom = -10
    directionalLight.shadow.bias = -0.001

    

    directionalLight.target.position.set(-2, -3, -4)
    scene.add(directionalLight.target)



    scene.add(directionalLight)

    return { ambientLight, directionalLight }

}
export default createLighting;