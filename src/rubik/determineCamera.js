export default function determineCamera(camera){
    if(camera.x>-30 &&  camera.x < 30 && 
        camera.z > 30 && 
        camera.y >-30 &&  camera.y < 30 
      ){
        return "front"
      }
      if(camera.x > 30 &&
         camera.z < 30 && camera.z > -30 && 
         camera.y > -30 && camera.y < 30){
        return "right"
      }
      if(camera.x < 30 && camera.x > -30 &&
        camera.z < -30 && 
        camera.y > -30 && camera.y < 30){
       return "back"
      }
      if(camera.x < -30 &&
        camera.z > -30 && camera.z < 30 && 
        camera.y > -30 && camera.y < 30){
       return "left"
      }
}