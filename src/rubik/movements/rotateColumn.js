export default function rotateColumn(arr,movement){
    let posOfName={rowPos:null,pos:null}
    const isNumber = (element) => element == name;

    arr.map((obj,i)=>{
      if(-1<obj.findIndex(isNumber)){
        posOfName={rowPos:i,pos:obj.findIndex(isNumber)}
      }
    })
    let newPos
    if(movement=="left"){
      newPos=[ 
        arr[posOfName.rowPos][2],arr[posOfName.rowPos][5],arr[posOfName.rowPos][8],
        arr[posOfName.rowPos][1],arr[posOfName.rowPos][4],arr[posOfName.rowPos][7],
        arr[posOfName.rowPos][0],arr[posOfName.rowPos][3],arr[posOfName.rowPos][6],
      ]
    } else {
      newPos=[ 
        arr[posOfName.rowPos][6],arr[posOfName.rowPos][3],arr[posOfName.rowPos][0],
        arr[posOfName.rowPos][7],arr[posOfName.rowPos][4],arr[posOfName.rowPos][1],
        arr[posOfName.rowPos][8],arr[posOfName.rowPos][5],arr[posOfName.rowPos][2],
      ]
    }
    const movedPositions = arr.map((c, i) => {
      if (i === posOfName.rowPos) {
        
        return newPos;
      } else {
        // The rest haven't changed
        return c;
      }
    });

    return movedPositions
}


  // function rotateRow(name,movement){
  //   let posOfName={rowPos:null,pos:null}
  //   const isNumber = (element) => element == name;

  //   positions.map((obj,i)=>{
  //     if(-1<obj.findIndex(isNumber)){
  //       posOfName={rowPos:i,pos:obj.findIndex(isNumber)}
  //     }
  //   })
  //   let newPos
  //   if(movement=="left"){
  //     newPos=[ 
  //       positions[posOfName.rowPos][2],positions[posOfName.rowPos][5],positions[posOfName.rowPos][8],
  //       positions[posOfName.rowPos][1],positions[posOfName.rowPos][4],positions[posOfName.rowPos][7],
  //       positions[posOfName.rowPos][0],positions[posOfName.rowPos][3],positions[posOfName.rowPos][6],
  //     ]
  //   } else {
  //     newPos=[ 
  //       positions[posOfName.rowPos][6],positions[posOfName.rowPos][3],positions[posOfName.rowPos][0],
  //       positions[posOfName.rowPos][7],positions[posOfName.rowPos][4],positions[posOfName.rowPos][1],
  //       positions[posOfName.rowPos][8],positions[posOfName.rowPos][5],positions[posOfName.rowPos][2],
  //     ]
  //   }
  //   const movedPositions = positions.map((c, i) => {
  //     if (i === posOfName.rowPos) {
        
  //       return newPos;
  //     } else {
  //       // The rest haven't changed
  //       return c;
  //     }
  //   });
  //   setPositions(movedPositions);
  //   return newPos
  // }