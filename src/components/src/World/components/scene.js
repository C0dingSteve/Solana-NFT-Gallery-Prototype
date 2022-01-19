import { Scene, CubeTextureLoader } from 'three';

function createScene() {

  const textureLoader = new CubeTextureLoader();  
  const skybox = textureLoader.load([
  'skybox/1.png',
  'skybox/3.png',
  'skybox/6.png',
  'skybox/4.png',
  'skybox/5.png',
  'skybox/6.png'
  ]);

  const scene = new Scene();
  scene.background = skybox;

  return scene;
}

export { createScene };
