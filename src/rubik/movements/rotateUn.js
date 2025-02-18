export default function rotateUn(arr,name,movement){
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
        case 1:
        case 2:
        case 0:
        rePos=[
          [
            arr[2][0],arr[1][0],arr[0][0],
            arr[0][3],arr[0][4],arr[0][5],
            arr[0][6],arr[0][7],arr[0][8]
          ],
          [
            arr[2][1],arr[1][1],arr[0][1],
            arr[1][3],arr[1][4],arr[1][5],
            arr[1][6],arr[1][7],arr[1][8]
          ],
          [
            arr[2][2],arr[1][2],arr[0][2],
            arr[2][3],arr[2][4],arr[2][5],
            arr[2][6],arr[2][7],arr[2][8]
          ],
        ] 
        break
        case 4:
        case 5:
        case 3:
          rePos=[
            [
              arr[0][0],arr[0][1],arr[0][2],
              arr[2][3],arr[1][3],arr[0][3],
              arr[0][6],arr[0][7],arr[0][8]
            ],
            [
              arr[1][0],arr[1][1],arr[1][2],
              arr[2][4],arr[1][4],arr[0][4],
              arr[1][6],arr[1][7],arr[1][8]
            ],
            [
              arr[2][0],arr[2][1],arr[2][2],
              arr[2][5],arr[1][5],arr[0][5],
              arr[2][6],arr[2][7],arr[2][8]
            ],
          ] 
        break
        case 7:
        case 8:
        case 6:
          rePos=[
            [
              arr[0][0],arr[0][1],arr[0][2],
              arr[0][3],arr[0][4],arr[0][5],
              arr[2][6],arr[1][6],arr[0][6]
            ],
            [
              arr[1][0],arr[1][1],arr[1][2],
              arr[1][3],arr[1][4],arr[1][5],
              arr[2][7],arr[1][7],arr[0][7]
            ],
            [
              arr[2][0],arr[2][1],arr[2][2],
              arr[2][3],arr[2][4],arr[2][5],
              arr[2][8],arr[1][8],arr[0][8]
            ],
          ] 
        break
      }
    } else {
      switch(posOfName.pos){
        case 1:
        case 2:
        case 0:
        rePos=[
          [
            arr[0][2],arr[1][2],arr[2][2],
            arr[0][3],arr[0][4],arr[0][5],
            arr[0][6],arr[0][7],arr[0][8]
          ],
          [
            arr[0][1],arr[1][1],arr[2][1],
            arr[1][3],arr[1][4],arr[1][5],
            arr[1][6],arr[1][7],arr[1][8]
          ],
          [
            arr[0][0],arr[1][0],arr[2][0],
            arr[2][3],arr[2][4],arr[2][5],
            arr[2][6],arr[2][7],arr[2][8]
          ],
        ] 
        break
        case 4:
        case 5:
        case 3:
          rePos=[
            [
              arr[0][0],arr[0][1],arr[0][2],
              arr[0][5],arr[1][5],arr[2][5],
              arr[0][6],arr[0][7],arr[0][8]
            ],
            [
              arr[1][0],arr[1][1],arr[1][2],
              arr[0][4],arr[1][4],arr[2][4],
              arr[1][6],arr[1][7],arr[1][8]
            ],
            [
              arr[2][0],arr[2][1],arr[2][2],
              arr[0][3],arr[1][3],arr[2][3],
              arr[2][6],arr[2][7],arr[2][8]
            ],
          ] 
        break
        case 7:
        case 8:
        case 6:
          rePos=[
            [
              arr[0][0],arr[0][1],arr[0][2],
              arr[0][3],arr[0][4],arr[0][5],
              arr[0][8],arr[1][8],arr[2][8]
            ],
            [
              arr[1][0],arr[1][1],arr[1][2],
              arr[1][3],arr[1][4],arr[1][5],
              arr[0][7],arr[1][7],arr[2][7]
            ],
            [
              arr[2][0],arr[2][1],arr[2][2],
              arr[2][3],arr[2][4],arr[2][5],
              arr[0][6],arr[1][6],arr[2][6]
            ],
          ] 
        break
      }
    }
    // const movedPositions = rePos.map((c, i) => {
    //   return c.map((obj)=>{
    //     return obj
    //   })
    // });
    // setPositions(movedPositions);    

    let reAlign
    let selectedArr=[]
    switch(posOfName.pos){
      case 0:
      case 1:
      case 2:
        reAlign=0
      break
      case 3:
      case 4:
      case 5:
        reAlign=3
      break
      case 6:
      case 7:
      case 8:
        reAlign=6
    }
    rePos.map((obj,i)=>{
      obj.map((res,ii)=>{
        if(ii==0+reAlign||ii==1+reAlign||ii==2+reAlign)    {
          selectedArr.push(res)
        }
      })
    })
    return {movedArr:rePos,selectedCubes:selectedArr}
  }
//   function rotateUn(name,movement){
//     let posOfName={rowPos:null,pos:null}
//     const isNumber = (element) => element == name;
//     arr.map((obj,i)=>{
//       if(-1<obj.findIndex(isNumber)){
//         posOfName={rowPos:i,pos:obj.findIndex(isNumber)}
//       }
//     })

//     let rePos
//     if(movement=="forward"){
//       switch(posOfName.pos){
//         case 1:
//         case 2:
//         case 0:
//         rePos=[
//           [
//             arr[2][0],arr[1][0],arr[0][0],
//             arr[0][3],arr[0][4],arr[0][5],
//             arr[0][6],arr[0][7],arr[0][8]
//           ],
//           [
//             arr[2][1],arr[1][1],arr[0][1],
//             arr[1][3],arr[1][4],arr[1][5],
//             arr[1][6],arr[1][7],arr[1][8]
//           ],
//           [
//             arr[2][2],arr[1][2],arr[0][2],
//             arr[2][3],arr[2][4],arr[2][5],
//             arr[2][6],arr[2][7],arr[2][8]
//           ],
//         ] 
//         break
//         case 4:
//         case 5:
//         case 3:
//           rePos=[
//             [
//               arr[0][0],arr[0][1],arr[0][2],
//               arr[2][3],arr[1][3],arr[0][3],
//               arr[0][6],arr[0][7],arr[0][8]
//             ],
//             [
//               arr[1][0],arr[1][1],arr[1][2],
//               arr[2][4],arr[1][4],arr[0][4],
//               arr[1][6],arr[1][7],arr[1][8]
//             ],
//             [
//               arr[2][0],arr[2][1],arr[2][2],
//               arr[2][5],arr[1][5],arr[0][5],
//               arr[2][6],arr[2][7],arr[2][8]
//             ],
//           ] 
//         break
//         case 7:
//         case 8:
//         case 6:
//           rePos=[
//             [
//               arr[0][0],arr[0][1],arr[0][2],
//               arr[0][3],arr[0][4],arr[0][5],
//               arr[2][6],arr[1][6],arr[0][6]
//             ],
//             [
//               arr[1][0],arr[1][1],arr[1][2],
//               arr[1][3],arr[1][4],arr[1][5],
//               arr[2][7],arr[1][7],arr[0][7]
//             ],
//             [
//               arr[2][0],arr[2][1],arr[2][2],
//               arr[2][3],arr[2][4],arr[2][5],
//               arr[2][8],arr[1][8],arr[0][8]
//             ],
//           ] 
//         break
//       }
//     } else {
//       switch(posOfName.pos){
//         case 1:
//         case 2:
//         case 0:
//         rePos=[
//           [
//             arr[0][2],arr[1][2],arr[2][2],
//             arr[0][3],arr[0][4],arr[0][5],
//             arr[0][6],arr[0][7],arr[0][8]
//           ],
//           [
//             arr[0][1],arr[1][1],arr[2][1],
//             arr[1][3],arr[1][4],arr[1][5],
//             arr[1][6],arr[1][7],arr[1][8]
//           ],
//           [
//             arr[0][0],arr[1][0],arr[2][0],
//             arr[2][3],arr[2][4],arr[2][5],
//             arr[2][6],arr[2][7],arr[2][8]
//           ],
//         ] 
//         break
//         case 4:
//         case 5:
//         case 3:
//           rePos=[
//             [
//               arr[0][0],arr[0][1],arr[0][2],
//               arr[0][5],arr[1][5],arr[2][5],
//               arr[0][6],arr[0][7],arr[0][8]
//             ],
//             [
//               arr[1][0],arr[1][1],arr[1][2],
//               arr[0][4],arr[1][4],arr[2][4],
//               arr[1][6],arr[1][7],arr[1][8]
//             ],
//             [
//               arr[2][0],arr[2][1],arr[2][2],
//               arr[0][3],arr[1][3],arr[2][3],
//               arr[2][6],arr[2][7],arr[2][8]
//             ],
//           ] 
//         break
//         case 7:
//         case 8:
//         case 6:
//           rePos=[
//             [
//               arr[0][0],arr[0][1],arr[0][2],
//               arr[0][3],arr[0][4],arr[0][5],
//               arr[0][8],arr[1][8],arr[2][8]
//             ],
//             [
//               arr[1][0],arr[1][1],arr[1][2],
//               arr[1][3],arr[1][4],arr[1][5],
//               arr[0][7],arr[1][7],arr[2][7]
//             ],
//             [
//               arr[2][0],arr[2][1],arr[2][2],
//               arr[2][3],arr[2][4],arr[2][5],
//               arr[0][6],arr[1][6],arr[2][6]
//             ],
//           ] 
//         break
//       }
//     }
//     const movedPositions = rePos.map((c, i) => {
//       return c.map((obj)=>{
//         return obj
//       })
//     });
//     setPositions(movedPositions);    

//     let reAlign
//     let selectedArr=[]
//     switch(posOfName.pos){
//       case 0:
//       case 1:
//       case 2:
//         reAlign=0
//       break
//       case 3:
//       case 4:
//       case 5:
//         reAlign=3
//       break
//       case 6:
//       case 7:
//       case 8:
//         reAlign=6
//     }
//     rePos.map((obj,i)=>{
//       obj.map((res,ii)=>{
//         if(ii==0+reAlign||ii==1+reAlign||ii==2+reAlign)    {
//           selectedArr.push(res)
//         }
//       })
//     })
//     return selectedArr
//   }

