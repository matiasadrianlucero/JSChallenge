export default function checkRayIntersections(mousePointer, camera, raycaster, scene, getFirstValue) {
    raycaster.setFromCamera(mousePointer, camera);
  
    let intersections = raycaster.intersectObjects(scene.children, true);
    
    intersections = getFirstValue ? intersections[0] : intersections;
  
    return intersections;
  }