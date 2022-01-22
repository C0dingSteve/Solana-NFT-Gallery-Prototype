import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, renderer, targetMesh){
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = targetMesh.position;
    
    controls.minDistance = 5;
    controls.maxDistance = 18;
    
    //controls.enableDamping = true;
    controls.update();

    return controls;
}

export { createControls };