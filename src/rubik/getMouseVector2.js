import * as THREE from 'three';

export default function getMouseVector2(event){
    let mousePointer = new THREE.Vector2()
  
      mousePointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    return mousePointer;
  }