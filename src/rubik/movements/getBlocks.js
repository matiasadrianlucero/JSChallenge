import selectCubes from "./selectCubes"
export default function getBlocks(camPosition,arr,cube,direction){
    let toRotate
    let axis
    let selected
    if(camPosition=='front'||camPosition=='right'||camPosition=='left'||camPosition=='back'){
      if(direction=='hor'){
        selected="row"
        axis='y'
      } 
    }
    if(camPosition=='front'){
      if(direction=='ver'){
        selected="col"   
        axis='x'
      }
    }
    if(camPosition=='left'){
      if(direction=='ver'){
        selected="array"
        axis='z'
      }
    }
    if(camPosition=='right'){
      if(direction=='ver'){
        selected="array"
        axis='z'
      }
    }
    if(camPosition=='back'){
      if(direction=='ver'){
        selected="col"
        axis='x'
      }
    }
    toRotate=selectCubes(arr,selected,cube)
    return {cubes:toRotate,axis:axis}
  }