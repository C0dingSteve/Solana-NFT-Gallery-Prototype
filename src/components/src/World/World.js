
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  TextureLoader,
  MeshBasicMaterial,
  BoxGeometry,
  Mesh,
  MathUtils
} from 'three';

import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

import GLTFInitializer from './utils/GLTFInitializer.js';

let scene;
let camera;
let renderer;
let loop;

class World {
  constructor(container) {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ INITIALIZATIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      var l;
      var URLarray = [
        "https://bafybeidaknpdtvgn5v6poj2vxl4gfx2ii6uqmzfubcgbungd26d7iupnnq.ipfs.infura-ipfs.io/",
        "https://ipfs.infura.io/ipfs/QmSUaHtvQmnw3LcbHphZEjdX1PQtd8aG2kuKbiAx8PncSi",
        "https://bafybeihspibchatq4peswt357yqhzraqdx54s5nokltrf5ydpn5pqdmtpq.ipfs.infura-ipfs.io/",
        "https://ipfs.infura.io/ipfs/Qme3SksF45XJsNYmmwnjyqqwJr5p7TRAn5Xvm6kZC5ogwW",
        "https://ipfs.infura.io/ipfs/QmTrzt8f5nG6yvJjxfQtgTse441utXGsM4mtKvoZ41NbN1",
        "https://ipfs.infura.io/ipfs/QmWxMomQ8m7ZgAMHhNRgHQNcsnmL2Vare4VGdC1UdjRPLb",
        "https://ipfs.infura.io/ipfs/QmSQgohBNakXqYkiHw7QN8XPoRp2RqWBkwJNhGWidy7Vnz",
        "https://ipfs.infura.io/ipfs/QmVPUPiTCoQm7JbpiCvVhhHtvXjA1nAXXHvvS4ymFYiSe2",
        "https://ipfs.infura.io/ipfs/QmY2toG7BFRoatEY8yb3N1eQxMjU336pjVWYhtiPVTAeYR",
        "https://ipfs.infura.io/ipfs/QmWQdVy9UdNurW23aDJUaZKe6sh7XUBDAzXrNhpLSN3Jhq"
      ]
      let models = [];

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SCENE PRESETS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      
      camera = createCamera();
      scene = createScene();
      renderer = createRenderer();
      loop = new Loop(camera, scene, renderer);

      container.append(renderer.domElement);
      container.insertAdjacentHTML('beforeend', '<div class="scrolling-wrapper" id="scroller"></div>')

      //GLTF Loader
      const loader = new GLTFLoader();

      //Add lights to the scene
      const lights = createLights();
      scene.add(lights['directionalLight']);
      scene.add(lights['ambientLight']);

      //scene decore 
      const textureLoader = new TextureLoader();
      const baked = textureLoader.load('baked.jpg');
      baked.flipY = false;
      const bake = new MeshBasicMaterial({
        map: baked
      });

      //object
      var geo = new BoxGeometry(0.5, 0.5, 0.5)
      var mat = new MeshBasicMaterial({
        color: 'blue'
      })
      var mesh = new Mesh(geo, mat)
      mesh.rotation.set(0, 4, 0)
      mesh.position.set(-0.0, 5.5, 0.4)

      // Add saloon to the scene
      loader.load('saloon.glb',
        (gltf) => {
          gltf.scene.traverse((child) => {
            child.material = bake;
          })
          scene.add(gltf.scene);
        })
        
      //Load the first model into the scene
      loader.loadAsync(URLarray[0]).then(gltf => {
        l = gltf.scene;
         
        gltf.scene.tick = (delta) =>{
          gltf.scene.rotation.y += MathUtils.degToRad(30) * delta;
        }

        loop.updatables.push(gltf.scene);
        scene.add(GLTFInitializer(gltf).scene);
      });
      
      // Fetch the models using the URLArray into the models array
      // And set the scroller
      var w = document.getElementById("scroller");
      URLarray.forEach((url, index) => {
        w.insertAdjacentHTML("beforeend", '<div class="card-box" style="color:black; text-align:center; width: 30px; height: 30px; background:#ffc107; margin-top: 15px;" draggable="true" id="' + index.toString() + '">'+(index+1).toString()+'</div>');
        loader.loadAsync(url).then( data => {
          models.push(data);
        }).catch(err => {
          console.log(err)
        });
      });
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CONTROLS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target = mesh.position;
      controls.minDistance = 5;
      controls.maxDistance = 12;
      controls.enableDamping = true;
      controls.update();
      //animation
      const tick = () => {
        controls.update()
        renderer.render(scene, camera)
        window.requestAnimationFrame(tick)
      }

      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ OTHER SPECIFICS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      // Drag and Drop features

      var checker = 0;

      const objects = document.querySelectorAll('.card-box');
      console.log(objects[1]);
      const can = renderer.domElement;

      objects.forEach(obj => {
        obj.addEventListener('dragstart', dragStart);
        obj.addEventListener('dragend', dragEnd);
      })
      can.addEventListener('dragover', dragOver);
      can.addEventListener('dragdrop', dragDrop);
      console.log('Loaded!!!!!');

      function dragStart() {
        checker = 0;
        console.log(this.id);
      }
      
      function dragEnd() {
        if (checker == 1) {
          //removing previous model and replacing with the new dropped model
          scene.remove(l);
          console.log(this.id);
          let gltf = models[parseInt(this.id)];
          l = gltf.scene;
         
          gltf.scene.tick = (delta) =>{
            gltf.scene.rotation.y += MathUtils.degToRad(30) * delta;
          }
  
          loop.updatables.push(gltf.scene);
          scene.add(GLTFInitializer(gltf).scene);
        }
      }

      function dragOver() {
        checker = 1;
      }

      function dragDrop() {
        checker = 1;
      }

      const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }
  
  start() {
  	loop.start();
  }

  stop() {
    loop.stop();
  }
}

export default World;