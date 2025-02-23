import selectCubes from "./selectCubes"
export default function getBlocks(camPosition,arr,cube,lockAxis){
    if(camPosition=='front'){
      if(lockAxis=='hor'){
        let toRotate=selectCubes(arr,"row",cube)
        return toRotate
      } 
      if(lockAxis=='ver'){
        let toRotate=selectCubes(arr,"col",cube)
        return toRotate
      }
    }
    if(camPosition=='left'){
      if(lockAxis=='hor'){
        let toRotate=selectCubes(arr,"row",cube)
        return toRotate
      } 
      if(lockAxis=='ver'){
        let toRotate=selectCubes(arr,"array",cube)
        return toRotate
      }
    }
  }