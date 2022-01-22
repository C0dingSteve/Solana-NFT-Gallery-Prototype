import {Component} from "react"
import World from './World/World.js';

class Gallery extends Component {
  componentDidMount(){
    // Get a reference to the container element
    const container = document.querySelector('#scene-container');
    // create a new world
    const world = new World(container);

    // draw the scene
    world.start();
  }
render(){    
    return (
        <div
          ref={(mount) => {
            this.mount = mount;
          }}
        />
      );
}
}
export default Gallery;