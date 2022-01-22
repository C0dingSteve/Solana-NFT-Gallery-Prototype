import { MathUtils, PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera()
  //   35, // fov = Field Of View
  //   1, // aspect ratio (dummy value)
  //   0.1, // near clipping plane
  //   100, // far clipping plane
  // );

  // move the camera back so we can view the scene
  camera.position.set(20, 5, 20);
  camera.lookAt(0,0,0);
  //camera.rotation.set(MathUtils.degToRad(-45), 0, 0);

  return camera;
}

export { createCamera };
