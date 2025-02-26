import selectCubes from "./selectCubes"
export default function getBlocks(camPosition,arr,cube,direction){
    if(camPosition=='front'){
      if(direction=='hor'){
        let toRotate=selectCubes(arr,"row",cube)
        return toRotate
      } 
      if(direction=='ver'){
        let toRotate=selectCubes(arr,"col",cube)
        return toRotate
      }
    }
    if(camPosition=='left'){
      if(direction=='hor'){
        let toRotate=selectCubes(arr,"row",cube)
        return toRotate
      } 
      if(direction=='ver'){
        let toRotate=selectCubes(arr,"array",cube)
        return toRotate
      }
    }
  }