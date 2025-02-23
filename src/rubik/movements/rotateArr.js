export default function rotateArr(arr,name,movement){
    let posOfName={rowPos:null,pos:null}
    const isNumber = (element) => element == name;
    arr.map((obj,i)=>{
      if(-1<obj.findIndex(isNumber)){
        posOfName={rowPos:i,pos:obj.findIndex(isNumber)}
      }
    })

    let rePos
    if(movement=="forward"){
      switch(posOfName.pos){
        case 3:
        case 6:
        case 0:
        rePos=[
          [
            arr[2][0],arr[0][1],arr[0][2],
            arr[1][0],arr[0][4],arr[0][5],
            arr[0][0],arr[0][7],arr[0][8]
          ],
          [
            arr[2][3],arr[1][1],arr[1][2],
            arr[1][3],arr[1][4],arr[1][5],
            arr[0][3],arr[1][7],arr[1][8]
          ],
          [
            arr[2][6],arr[2][1],arr[2][2],
            arr[1][6],arr[2][4],arr[2][5],
            arr[0][6],arr[2][7],arr[2][8]
          ],
        ] 
        break
        case 4:
        case 7:
        case 1:
          rePos=[
            [
              arr[0][0],arr[2][1],arr[0][2],
              arr[0][3],arr[1][1],arr[0][5],
              arr[0][6],arr[0][1],arr[0][8]
            ],
            [
              arr[1][0],arr[2][4],arr[1][2],
              arr[1][3],arr[1][4],arr[1][5],
              arr[1][6],arr[0][4],arr[1][8]
            ],
            [
              arr[2][0],arr[2][7],arr[2][2],
              arr[2][3],arr[1][7],arr[2][5],
              arr[2][6],arr[0][7],arr[2][8]
            ],
          ] 
        break
        case 5:
        case 8:
        case 2:
          rePos=[
            [
              arr[0][0],arr[0][1],arr[2][2],
              arr[0][3],arr[0][4],arr[1][2],
              arr[0][6],arr[0][7],arr[0][2]
            ],
            [
              arr[1][0],arr[1][1],arr[2][5],
              arr[1][3],arr[1][4],arr[1][5],
              arr[1][6],arr[1][7],arr[0][5]
            ],
            [
              arr[2][0],arr[2][1],arr[2][8],
              arr[2][3],arr[2][4],arr[1][8],
              arr[2][6],arr[2][7],arr[0][8]
            ],
          ] 
        break
      }
    } else {
      switch(posOfName.pos){
        case 3:
        case 6:
        case 0:
        rePos=[
          [
            arr[0][6],arr[0][1],arr[0][2],
            arr[1][6],arr[0][4],arr[0][5],
            arr[2][6],arr[0][7],arr[0][8]
          ],
          [
            arr[0][3],arr[1][1],arr[1][2],
            arr[1][3],arr[1][4],arr[1][5],
            arr[2][3],arr[1][7],arr[1][8]
          ],
          [
            arr[0][0],arr[2][1],arr[2][2],
            arr[1][0],arr[2][4],arr[2][5],
            arr[2][0],arr[2][7],arr[2][8]
          ],
        ] 
        break
        case 4:
        case 7:
        case 1:
          rePos=[
            [
              arr[0][0],arr[0][7],arr[0][2],
              arr[0][3],arr[1][7],arr[0][5],
              arr[0][6],arr[2][7],arr[0][8]
            ],
            [
              arr[1][0],arr[0][4],arr[1][2],
              arr[1][3],arr[1][4],arr[1][5],
              arr[1][6],arr[2][4],arr[1][8]
            ],
            [
              arr[2][0],arr[0][1],arr[2][2],
              arr[2][3],arr[1][1],arr[2][5],
              arr[2][6],arr[2][1],arr[2][8]
            ],
          ] 
        break
        case 5:
        case 8:
        case 2:
          rePos=[
            [
              arr[0][0],arr[0][1],arr[0][8],
              arr[0][3],arr[0][4],arr[1][8],
              arr[0][6],arr[0][7],arr[2][8]
            ],
            [
              arr[1][0],arr[1][1],arr[0][5],
              arr[1][3],arr[1][4],arr[1][5],
              arr[1][6],arr[1][7],arr[2][5]
            ],
            [
              arr[2][0],arr[2][1],arr[0][2],
              arr[2][3],arr[2][4],arr[1][2],
              arr[2][6],arr[2][7],arr[2][2]
            ],
          ] 
        break
      }
    }
    // setPositions(rePos)
    let reAlign
    let selectedArr=[]
    switch(posOfName.pos){
      case 0:
      case 3:
      case 6:
        reAlign=0
      break
      case 1:
      case 4:
      case 7:
        reAlign=1
      break
      case 2:
      case 5:
      case 8:
        reAlign=2
    }
    rePos.map((obj,i)=>{
      obj.map((res,ii)=>{
        if(ii==0+reAlign||ii==3+reAlign||ii==6+reAlign)    {
          selectedArr.push(res)
        }
      })
    })
    return {movedArr:rePos,selectedCubes:selectedArr}
  }

//   function rotateColumn(name,movement){
//     let posOfName={rowPos:null,pos:null}
//     const isNumber = (element) => element == name;
//     positions.map((obj,i)=>{
//       if(-1<obj.findIndex(isNumber)){
//         posOfName={rowPos:i,pos:obj.findIndex(isNumber)}
//       }
//     })

//     let rePos
//     if(movement=="forward"){
//       switch(posOfName.pos){
//         case 3:
//         case 6:
//         case 0:
//         rePos=[
//           [
//             positions[2][0],positions[0][1],positions[0][2],
//             positions[1][0],positions[0][4],positions[0][5],
//             positions[0][0],positions[0][7],positions[0][8]
//           ],
//           [
//             positions[2][3],positions[1][1],positions[1][2],
//             positions[1][3],positions[1][4],positions[1][5],
//             positions[0][3],positions[1][7],positions[1][8]
//           ],
//           [
//             positions[2][6],positions[2][1],positions[2][2],
//             positions[1][6],positions[2][4],positions[2][5],
//             positions[0][6],positions[2][7],positions[2][8]
//           ],
//         ] 
//         break
//         case 4:
//         case 7:
//         case 1:
//           rePos=[
//             [
//               positions[0][0],positions[2][1],positions[0][2],
//               positions[0][3],positions[1][1],positions[0][5],
//               positions[0][6],positions[0][1],positions[0][8]
//             ],
//             [
//               positions[1][0],positions[2][4],positions[1][2],
//               positions[1][3],positions[1][4],positions[1][5],
//               positions[1][6],positions[0][4],positions[1][8]
//             ],
//             [
//               positions[2][0],positions[2][7],positions[2][2],
//               positions[2][3],positions[1][7],positions[2][5],
//               positions[2][6],positions[0][7],positions[2][8]
//             ],
//           ] 
//         break
//         case 5:
//         case 8:
//         case 2:
//           rePos=[
//             [
//               positions[0][0],positions[0][1],positions[2][2],
//               positions[0][3],positions[0][4],positions[1][2],
//               positions[0][6],positions[0][7],positions[0][2]
//             ],
//             [
//               positions[1][0],positions[1][1],positions[2][5],
//               positions[1][3],positions[1][4],positions[1][5],
//               positions[1][6],positions[1][7],positions[0][5]
//             ],
//             [
//               positions[2][0],positions[2][1],positions[2][8],
//               positions[2][3],positions[2][4],positions[1][8],
//               positions[2][6],positions[2][7],positions[0][8]
//             ],
//           ] 
//         break
//       }
//     } else {
//       switch(posOfName.pos){
//         case 3:
//         case 6:
//         case 0:
//         rePos=[
//           [
//             positions[0][6],positions[0][1],positions[0][2],
//             positions[1][6],positions[0][4],positions[0][5],
//             positions[2][6],positions[0][7],positions[0][8]
//           ],
//           [
//             positions[0][3],positions[1][1],positions[1][2],
//             positions[1][3],positions[1][4],positions[1][5],
//             positions[2][3],positions[1][7],positions[1][8]
//           ],
//           [
//             positions[0][0],positions[2][1],positions[2][2],
//             positions[1][0],positions[2][4],positions[2][5],
//             positions[2][0],positions[2][7],positions[2][8]
//           ],
//         ] 
//         break
//         case 4:
//         case 7:
//         case 1:
//           rePos=[
//             [
//               positions[0][0],positions[0][7],positions[0][2],
//               positions[0][3],positions[1][7],positions[0][5],
//               positions[0][6],positions[2][7],positions[0][8]
//             ],
//             [
//               positions[1][0],positions[0][4],positions[1][2],
//               positions[1][3],positions[1][4],positions[1][5],
//               positions[1][6],positions[2][4],positions[1][8]
//             ],
//             [
//               positions[2][0],positions[0][1],positions[2][2],
//               positions[2][3],positions[1][1],positions[2][5],
//               positions[2][6],positions[2][1],positions[2][8]
//             ],
//           ] 
//         break
//         case 5:
//         case 8:
//         case 2:
//           rePos=[
//             [
//               positions[0][0],positions[0][1],positions[0][8],
//               positions[0][3],positions[0][4],positions[1][8],
//               positions[0][6],positions[0][7],positions[2][8]
//             ],
//             [
//               positions[1][0],positions[1][1],positions[0][5],
//               positions[1][3],positions[1][4],positions[1][5],
//               positions[1][6],positions[1][7],positions[2][5]
//             ],
//             [
//               positions[2][0],positions[2][1],positions[0][2],
//               positions[2][3],positions[2][4],positions[1][2],
//               positions[2][6],positions[2][7],positions[2][2]
//             ],
//           ] 
//         break
//       }
//     }
//     setPositions(rePos)
//     let reAlign
//     let selectedArr=[]
//     switch(posOfName.pos){
//       case 0:
//       case 3:
//       case 6:
//         reAlign=0
//       break
//       case 1:
//       case 4:
//       case 7:
//         reAlign=1
//       break
//       case 2:
//       case 5:
//       case 8:
//         reAlign=2
//     }
//     rePos.map((obj,i)=>{
//       obj.map((res,ii)=>{
//         if(ii==0+reAlign||ii==3+reAlign||ii==6+reAlign)    {
//           selectedArr.push(res)
//         }
//       })
//     })
//     return selectedArr
//   }