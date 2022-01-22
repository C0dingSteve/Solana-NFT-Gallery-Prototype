const setSize = (container, camera, renderer) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // const screenWidth = container.clientWidth;
  // const screenHeight = container.clientHeight;

  //Set the camera's aspect ratio
  camera.aspect = screenWidth / screenHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize(screenWidth, screenHeight);

  // set the pixel ratio (for mobile devices)
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(container, camera, renderer) {
    setSize(container, camera, renderer)

    window.addEventListener('resize', () => {
      setSize(container, camera, renderer);
      this.onResize();
    });
  }

  onResize(){};
}

export { Resizer };
