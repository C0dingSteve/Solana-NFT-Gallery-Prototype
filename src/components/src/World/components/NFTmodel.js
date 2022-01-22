import { Vector3, Box3, SpotLight } from 'three'

class NFTmodel{
    constructor(){
        const boxScale = new Vector3().setScalar(3);
        const box = new Box3(); 

        var scaleV3 = new Vector3().setScalar(3);
        var box = new Box3();
        box.setFromObject(gltf.scene);

        var size = new Vector3(1, 1, 1);
        box.getSize(size);

        var scaleTemp = new Vector3(1, 1, 1);
        scaleTemp = scaleTemp.copy(scaleV3).divide(size);
        var scale = Math.min(scaleTemp.x, Math.min(scaleTemp.y, scaleTemp.z));
        gltf.scene.scale.setScalar(scale);

        const spotLight = new SpotLight( '#FFFFFF', 30 );
        spotLight.angle = MathUtils.degToRad(30);

        gltf.scene.add( spotLight );
        spotLight.position.set( 0, 10, 0);
    }
}
export { NFTmodel }