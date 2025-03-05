export default function determineCamera(camera){
  let invertX=false
  let invertY=false
  let face
  if(camera.y>-30&&camera.y<30){
    if(camera.x>-35 &&  camera.x < 35 && 
      camera.z > 35 
    ){
      face= "front"
    }
    if(camera.x > 35 &&
       camera.z < 35 && camera.z > -35
       ){
        face= "right"
        invertY=true
    }
    if(camera.x < 35 && camera.x > -35 &&
      camera.z < -35 
      ){
     face= "back"
     invertY=true
    }
    if(camera.x < -35 &&
      camera.z > -35 && camera.z < 35 
      ){
     face= "left"
    }
  } else {
    console.log(camera)

    if(camera.y>30){
      if(camera.x<12 &&  camera.x > -12 &&  camera.z > 12){
        console.log("topFront")
        face= "topFront"
        invertX=true

      }
      if(camera.z<12 &&  camera.z > -12 &&  camera.x > 12){
        console.log("topRight")
        face= "topRight"
        invertY=true
        invertX=true

      }
      if(camera.x<12 &&  camera.x > -12 &&  camera.z < -12){
        console.log("topBack")
        face= "topBack"
        invertY=true
        
      }
      if(camera.z<12 &&  camera.z > -12 &&  camera.x < -12){
        console.log("topLeft")
        face= "topLeft"
        
      }
    } else {
      if(camera.x<12 &&  camera.x > -12 &&  camera.z > 0){
        console.log("bottomFront")
        face= "bottomFront"
      }
      if(camera.z<12 &&  camera.z > -12 &&  camera.x > 0){
        console.log("bottomRight")
        invertY=true
        face= "bottomRight"
      }
      if(camera.x<12 &&  camera.x > -12 &&  camera.z < 0){
        console.log("bottomBack")
        invertY=true
        invertX=true

        face= "bottomBack"
      }
      if(camera.z<12 &&  camera.z > -12 &&  camera.x < 0){
        console.log("bottomLeft")
        invertX=true
        face= "bottomLeft"
      }
    }

  }
  return {face:face,invertX:invertX,invertY:invertY}
}