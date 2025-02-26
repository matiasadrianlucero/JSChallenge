export default function determineCamera(camera){
  if(camera.y>-30&&camera.y<30){
    if(camera.x>-30 &&  camera.x < 30 && 
      camera.z > 30 
    ){
      return "front"
    }
    if(camera.x > 30 &&
       camera.z < 30 && camera.z > -30
       ){
      return "right"
    }
    if(camera.x < 30 && camera.x > -30 &&
      camera.z < -30 
      ){
     return "back"
    }
    if(camera.x < -30 &&
      camera.z > -30 && camera.z < 30 
      ){
     return "left"
    }
  } else {
      console.log(camera)
  }
    
}