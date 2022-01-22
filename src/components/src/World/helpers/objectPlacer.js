import { 
    BufferGeometry, 
    Vector2, 
    Vector3,
    Line,
    LineBasicMaterial,
    Mesh,
    BoxGeometry,
    MeshNormalMaterial,
    Raycaster,
} from 'three';

let intersection, mouse, intersectArray, raycaster, curr_obj;

function createObjectPlacer(mesh, camera, controls){

    intersection = {
        intersects: false,
        point: new Vector3(),
        normal: new Vector3(),
    };

    mouse = new Vector2();
    intersectArray = [];

    const geometry = new BufferGeometry();
    geometry.setFromPoints( [ new Vector3(), new Vector3() ] );

    const material = new LineBasicMaterial( {
        color: '#FF0000',
        linewidth: 1,
    } );
    const line = new Line( geometry, material );

    raycaster = new Raycaster();

    const mouseHelper = new Mesh( new BoxGeometry( 1, 1, 10 ), new MeshNormalMaterial() );
    mouseHelper.visible = false;


    
    let moved = false;

    controls.addEventListener( 'change', () => moved = true);

    window.addEventListener( 'pointerdown', () => moved = false);

    window.addEventListener( 'pointerup', event => {

        if ( moved === false ) {

            checkIntersection( event.clientX, event.clientY );

            if ( intersection.intersects ) moveObject();

        }

    } );


    window.addEventListener( 'pointermove', onPointerMove );

    function onPointerMove( event ) {
        if ( event.isPrimary ) {
            checkIntersection( event.clientX, event.clientY );
        }
    }
    
    function moveObject() {
        curr_obj.position.copy(intersection.point);
        curr_obj.traverse(child => {
            // if(child.name === 'spotLight')
            // {
                console.log(child.name);
            // }
        });
    }

    function checkIntersection( x, y ) {
    
        if ( mesh === undefined ) return;
    
        mouse.x = ( x / window.innerWidth ) * 2 - 1;
        mouse.y = - ( y / window.innerHeight ) * 2 + 1;
    
        raycaster.setFromCamera( mouse, camera );
        raycaster.intersectObject( mesh, false, intersectArray );
    
        if ( intersectArray.length > 0) {
    
            const p = intersectArray[0].point;
            mouseHelper.position.copy( p );
            intersection.point.copy( p );
    
            const n = intersectArray[0].face.normal.clone();
            n.transformDirection( mesh.matrixWorld );
            n.multiplyScalar(2);
            n.add( intersectArray[0].point );
    
            intersection.normal.copy( intersectArray[0].face.normal );
            mouseHelper.lookAt( n );
    
            const positions = line.geometry.attributes.position;
            positions.setXYZ( 0, p.x, p.y, p.z );
            positions.setXYZ( 1, n.x, n.y, n.z );
            positions.needsUpdate = true;
    
            intersection.intersects = true;
    
            intersectArray.length = 0;
        } 
        else 
        {
            intersection.intersects = false;
        }
    }

    // return {'line':line, 'mouseHelper':mouseHelper};
    return line;
}

function updateCurrObj(obj){
    curr_obj = obj;
}

export { createObjectPlacer, updateCurrObj }