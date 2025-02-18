import { useState } from "react"
export default function rotateRow(name,movement,positions){
  let [winPosition,setWinPostiion]=useState([
    [
      2,1,0,
      5,3,4,
      6,7,8
    ],
    [
      17,25,9,
      18,null,10,
      19,24,11
    ],
    [
      16,15,12,
      21,22,13,
      20,23,14

    ],
  ])
  let [positions,setPositions]=useState([
    [
      2,1,0,
      5,3,4,
      6,7,8
    ],
    [
      17,25,9,
      18,null,10,
      19,24,11
    ],
    [
      16,15,12,
      21,22,13,
      20,23,14

    ],
  ])
  }