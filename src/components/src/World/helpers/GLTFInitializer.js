import { Vector3, Box3, SpotLight, MathUtils, Raycaster, BoxHelper, Group } from 'three';

function GLTFInitializer(gltf, mesh){
        
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

        if(mesh === undefined)
        {
                gltf.scene.position.set(0, 5, 0);
        } else
        {
                console.log('in raycaster');
                let intersectArray = [];
                const origin = new Vector3(0,0,0);
                const direction = new Vector3(0,-1,0);
                const raycaster = new Raycaster(origin, direction);
                raycaster.intersectObject( mesh, false, intersectArray );
    
                if ( intersectArray.length > 0) {

                        const p = intersectArray[0].point;

                        const center = new Vector3();
                        box.getCenter(center);
                        const size = new Vector3();
                        box.getSize(size);

                        const originToCenter = center.distanceTo(new Vector3(center.x, 0, center.z));
                        const y = (0-originToCenter) + size.y/2;
                        
                        gltf.scene.position.set(p.x, y , p.z);

                        intersectArray.length = 0;
                } 
        }

        return gltf;
}
export { GLTFInitializer }