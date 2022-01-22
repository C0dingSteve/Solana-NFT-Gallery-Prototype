import { Scene, CubeTextureLoader } from 'three';

function createScene() {

  const textureLoader = new CubeTextureLoader();  
  const skybox = textureLoader.load([
    'skybox/space/corona_px.png',
    'skybox/space/corona_nx.png',
    'skybox/space/corona_py.png',
    'skybox/space/corona_ny.png',
    'skybox/space/corona_pz.png',
    'skybox/space/corona_nz.png',
    ]);
  // const skybox = textureLoader.load([
  // 'skybox/1.png',
  // 'skybox/3.png',
  // 'skybox/6.png',
  // 'skybox/2.png',
  // 'skybox/5.png',
  // 'skybox/4.png'
  // ]);

  const scene = new Scene();
  scene.background = skybox;

  return scene;
}

export { createScene };
