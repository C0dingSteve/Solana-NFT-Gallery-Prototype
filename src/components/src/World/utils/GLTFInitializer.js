import { Vector3, Box3 } from 'three';

export default function GLTFInitializer(gltf){
        
        var scaleV3 = new Vector3().setScalar(3);
        
        gltf.scene.position.set(0, 5, 0);
        var box = new Box3();
        box.setFromObject(gltf.scene);

        var size = new Vector3(1, 1, 1);
        box.getSize(size);
  
        var scaleTemp = new Vector3(1, 1, 1);
        scaleTemp = scaleTemp.copy(scaleV3).divide(size);
        var scale = Math.min(scaleTemp.x, Math.min(scaleTemp.y, scaleTemp.z));
        gltf.scene.scale.setScalar(scale);
        
        return gltf; 
}