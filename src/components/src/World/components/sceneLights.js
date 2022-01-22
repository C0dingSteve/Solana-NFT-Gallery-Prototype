import { DirectionalLight,  AmbientLight } from 'three';

function createSceneLights(){
    const dr = new DirectionalLight('#FFFFFF', 5);
    dr.position.set(3, 3, 2);
    dr.castShadow =true;

    const amb = new AmbientLight('#000000', 1);
    
    return {'directionalLight':dr, 'ambientLight':amb};
}
export { createSceneLights };