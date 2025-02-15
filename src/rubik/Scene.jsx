import * as THREE from 'three';
import { useEffect,useRef,useState  } from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import checkRayIntersections from './checkRayIntersections';
import getMouseVector2 from './getMouseVector2';
export default function Scene(){
  const canvasRef = useRef(null);
  let [rotate,setRotate]=useState(true)

  let [cube,setCube]=useState()

  let [xPos,setXPos]=useState()
  let [yPos,setYPos]=useState()
  let [axis,setAxis]=useState(null)


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
  
  function rotateRow(name,movement){
    let posOfName={rowPos:null,pos:null}
    const isNumber = (element) => element == name;

    positions.map((obj,i)=>{
      if(-1<obj.findIndex(isNumber)){
        posOfName={rowPos:i,pos:obj.findIndex(isNumber)}
      }
    })
    let newPos
    if(movement=="left"){
      newPos=[ 
        positions[posOfName.rowPos][2],positions[posOfName.rowPos][5],positions[posOfName.rowPos][8],
        positions[posOfName.rowPos][1],positions[posOfName.rowPos][4],positions[posOfName.rowPos][7],
        positions[posOfName.rowPos][0],positions[posOfName.rowPos][3],positions[posOfName.rowPos][6],
      ]
    } else {
      newPos=[ 
        positions[posOfName.rowPos][6],positions[posOfName.rowPos][3],positions[posOfName.rowPos][0],
        positions[posOfName.rowPos][7],positions[posOfName.rowPos][4],positions[posOfName.rowPos][1],
        positions[posOfName.rowPos][8],positions[posOfName.rowPos][5],positions[posOfName.rowPos][2],
      ]
    }
    const movedPositions = positions.map((c, i) => {
      if (i === posOfName.rowPos) {
        
        return newPos;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setPositions(movedPositions);
    return newPos
  }
  function rotateColumn(name,movement){
    let posOfName={rowPos:null,pos:null}
    const isNumber = (element) => element == name;
    positions.map((obj,i)=>{
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
            positions[2][0],positions[0][1],positions[0][2],
            positions[1][0],positions[0][4],positions[0][5],
            positions[0][0],positions[0][7],positions[0][8]
          ],
          [
            positions[2][3],positions[1][1],positions[1][2],
            positions[1][3],positions[1][4],positions[1][5],
            positions[0][3],positions[1][7],positions[1][8]
          ],
          [
            positions[2][6],positions[2][1],positions[2][2],
            positions[1][6],positions[2][4],positions[2][5],
            positions[0][6],positions[2][7],positions[2][8]
          ],
        ] 
        break
        case 4:
        case 7:
        case 1:
          rePos=[
            [
              positions[0][0],positions[2][1],positions[0][2],
              positions[0][3],positions[1][1],positions[0][5],
              positions[0][6],positions[0][1],positions[0][8]
            ],
            [
              positions[1][0],positions[2][4],positions[1][2],
              positions[1][3],positions[1][4],positions[1][5],
              positions[1][6],positions[0][4],positions[1][8]
            ],
            [
              positions[2][0],positions[2][7],positions[2][2],
              positions[2][3],positions[1][7],positions[2][5],
              positions[2][6],positions[0][7],positions[2][8]
            ],
          ] 
        break
        case 5:
        case 8:
        case 2:
          rePos=[
            [
              positions[0][0],positions[0][1],positions[2][2],
              positions[0][3],positions[0][4],positions[1][2],
              positions[0][6],positions[0][7],positions[0][2]
            ],
            [
              positions[1][0],positions[1][1],positions[2][5],
              positions[1][3],positions[1][4],positions[1][5],
              positions[1][6],positions[1][7],positions[0][5]
            ],
            [
              positions[2][0],positions[2][1],positions[2][8],
              positions[2][3],positions[2][4],positions[1][8],
              positions[2][6],positions[2][7],positions[0][8]
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
            positions[0][6],positions[0][1],positions[0][2],
            positions[1][6],positions[0][4],positions[0][5],
            positions[2][6],positions[0][7],positions[0][8]
          ],
          [
            positions[0][3],positions[1][1],positions[1][2],
            positions[1][3],positions[1][4],positions[1][5],
            positions[2][3],positions[1][7],positions[1][8]
          ],
          [
            positions[0][0],positions[2][1],positions[2][2],
            positions[1][0],positions[2][4],positions[2][5],
            positions[2][0],positions[2][7],positions[2][8]
          ],
        ] 
        break
        case 4:
        case 7:
        case 1:
          rePos=[
            [
              positions[0][0],positions[0][7],positions[0][2],
              positions[0][3],positions[1][7],positions[0][5],
              positions[0][6],positions[2][7],positions[0][8]
            ],
            [
              positions[1][0],positions[0][4],positions[1][2],
              positions[1][3],positions[1][4],positions[1][5],
              positions[1][6],positions[2][4],positions[1][8]
            ],
            [
              positions[2][0],positions[0][1],positions[2][2],
              positions[2][3],positions[1][1],positions[2][5],
              positions[2][6],positions[2][1],positions[2][8]
            ],
          ] 
        break
        case 5:
        case 8:
        case 2:
          rePos=[
            [
              positions[0][0],positions[0][1],positions[0][8],
              positions[0][3],positions[0][4],positions[1][8],
              positions[0][6],positions[0][7],positions[2][8]
            ],
            [
              positions[1][0],positions[1][1],positions[0][5],
              positions[1][3],positions[1][4],positions[1][5],
              positions[1][6],positions[1][7],positions[2][5]
            ],
            [
              positions[2][0],positions[2][1],positions[0][2],
              positions[2][3],positions[2][4],positions[1][2],
              positions[2][6],positions[2][7],positions[2][2]
            ],
          ] 
        break
      }
    }
    setPositions(rePos)
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
    return selectedArr
  }
  function rotateUn(name,movement){
    let posOfName={rowPos:null,pos:null}
    const isNumber = (element) => element == name;
    positions.map((obj,i)=>{
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
            positions[2][0],positions[1][0],positions[0][0],
            positions[0][3],positions[0][4],positions[0][5],
            positions[0][6],positions[0][7],positions[0][8]
          ],
          [
            positions[2][1],positions[1][1],positions[0][1],
            positions[1][3],positions[1][4],positions[1][5],
            positions[1][6],positions[1][7],positions[1][8]
          ],
          [
            positions[2][2],positions[1][2],positions[0][2],
            positions[2][3],positions[2][4],positions[2][5],
            positions[2][6],positions[2][7],positions[2][8]
          ],
        ] 
        break
        case 4:
        case 5:
        case 3:
          rePos=[
            [
              positions[0][0],positions[0][1],positions[0][2],
              positions[2][3],positions[1][3],positions[0][3],
              positions[0][6],positions[0][7],positions[0][8]
            ],
            [
              positions[1][0],positions[1][1],positions[1][2],
              positions[2][4],positions[1][4],positions[0][4],
              positions[1][6],positions[1][7],positions[1][8]
            ],
            [
              positions[2][0],positions[2][1],positions[2][2],
              positions[2][5],positions[1][5],positions[0][5],
              positions[2][6],positions[2][7],positions[2][8]
            ],
          ] 
        break
        case 7:
        case 8:
        case 6:
          rePos=[
            [
              positions[0][0],positions[0][1],positions[0][2],
              positions[0][3],positions[0][4],positions[0][5],
              positions[2][6],positions[1][6],positions[0][6]
            ],
            [
              positions[1][0],positions[1][1],positions[1][2],
              positions[1][3],positions[1][4],positions[1][5],
              positions[2][7],positions[1][7],positions[0][7]
            ],
            [
              positions[2][0],positions[2][1],positions[2][2],
              positions[2][3],positions[2][4],positions[2][5],
              positions[2][8],positions[1][8],positions[0][8]
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
            positions[0][2],positions[1][2],positions[2][2],
            positions[0][3],positions[0][4],positions[0][5],
            positions[0][6],positions[0][7],positions[0][8]
          ],
          [
            positions[0][1],positions[1][1],positions[2][1],
            positions[1][3],positions[1][4],positions[1][5],
            positions[1][6],positions[1][7],positions[1][8]
          ],
          [
            positions[0][0],positions[1][0],positions[2][0],
            positions[2][3],positions[2][4],positions[2][5],
            positions[2][6],positions[2][7],positions[2][8]
          ],
        ] 
        break
        case 4:
        case 5:
        case 3:
          rePos=[
            [
              positions[0][0],positions[0][1],positions[0][2],
              positions[0][5],positions[1][5],positions[2][5],
              positions[0][6],positions[0][7],positions[0][8]
            ],
            [
              positions[1][0],positions[1][1],positions[1][2],
              positions[0][4],positions[1][4],positions[2][4],
              positions[1][6],positions[1][7],positions[1][8]
            ],
            [
              positions[2][0],positions[2][1],positions[2][2],
              positions[0][3],positions[1][3],positions[2][3],
              positions[2][6],positions[2][7],positions[2][8]
            ],
          ] 
        break
        case 7:
        case 8:
        case 6:
          rePos=[
            [
              positions[0][0],positions[0][1],positions[0][2],
              positions[0][3],positions[0][4],positions[0][5],
              positions[0][8],positions[1][8],positions[2][8]
            ],
            [
              positions[1][0],positions[1][1],positions[1][2],
              positions[1][3],positions[1][4],positions[1][5],
              positions[0][7],positions[1][7],positions[2][7]
            ],
            [
              positions[2][0],positions[2][1],positions[2][2],
              positions[2][3],positions[2][4],positions[2][5],
              positions[0][6],positions[1][6],positions[2][6]
            ],
          ] 
        break
      }
    }
    const movedPositions = rePos.map((c, i) => {
      return c.map((obj)=>{
        return obj
      })
    });
    setPositions(movedPositions);    

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
    console.log(selectedArr)
    return selectedArr
  }
  useEffect(()=>{
    let func = async () => {
			const pointer = new THREE.Vector2();
      let raycaster = new THREE.Raycaster();

      const scene = new THREE.Scene();
      const color = new THREE.Color().setRGB( 0, 0, 0 );
      scene.background=color

      const light = new THREE.AmbientLight( 0x404040 );
      light.intensity=25

      const result = await new GLTFLoader().loadAsync('/src/assets/rubik.glb');
      scene.add(result.scene)
      scene.add(light)
      

      const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.set( 0, 5, 50 );
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight)
      const controls = new OrbitControls( camera, renderer.domElement );
      controls.enableZoom=false
      controls.enablePan=false
      controls.update();

      // document.addEventListener('mousemove',onMouseMove,false)
      document.addEventListener('mousedown',onMouseMove,false)
      function onMouseMove(event){
        let mousePointer=getMouseVector2(event,window)
        setAxis(null)

        const getFirstValue=true

        const intersections=checkRayIntersections(mousePointer,camera,raycaster,scene,getFirstValue)
        if(intersections==undefined){
          controls.enabled = true;          
        } else {
          let camPos=camera.position
          setCube(intersections.object.name)
          
          setYPos(null)
          setXPos(null)
          const lastPoint = {x: event.clientX, y: event.clientY}
          
          window.addEventListener('mousemove', e => {
            if(axis!="X"||axis!="Y"){
              setAxis(
                e.clientX*1>e.clientY ? "Y"
                : e.clientX<e.clientY ? "X"
                : null
              )

            }
            setYPos (
              e.clientX > lastPoint.x ? 'right'
              : e.clientX < lastPoint.x ? 'left'
              : 'none'
            )
            setXPos(
              e.clientY > lastPoint.y ? 'down'
              : e.clientY < lastPoint.y ? 'up'
              : 'none'
            )
            lastPoint.x= e.clientX
            lastPoint.y= e.clientY

          })

          controls.enabled = false;
        }
      }

      document.addEventListener('mouseup',()=>{setCube()},false)


      // const group = new THREE.Group();
      // scene.add(group)
      // group.add(result.scene.children[18])
      // group.add(result.scene.children[19])
      // group.add(result.scene.children[0])
      // group.add(result.scene.children[0])
      // group.add(result.scene.children[0])
      // group.add(result.scene.children[0])
      // group.add(result.scene.children[0])
      // group.add(result.scene.children[0])
      // group.add(result.scene.children[0])
      // let aux=1
      function animate() {
        requestAnimationFrame(animate);

        // group.rotation.z=Math.PI / 180 * 90
         
        // group.remove(...group.children);  // for removing all objects from the group 

        renderer.render(scene, camera);
      }
      animate();
  
      return () => {
        renderer.dispose();
      };
    }
    func()  

  },[])
  return (<>
        <div style={{position:"absolute"}}>
      <button onClick={()=>{ rotateRow(cube,"right")}}>rotateRow</button>
      <button onClick={()=>{rotateColumn(cube,"right")}}>rotateColumn</button>
      <button onClick={()=>{ rotateUn(cube,"right")}}>rotateUn</button>
      <p>Cube: {cube}</p>
      <p>XPOS: {xPos} Ypos: {yPos}</p>
      <p>selected axis: {axis}</p>

      {positions.map((obj)=>{
        return (
          obj.map((num,i)=>{
            if(i==2||i==5||i==8){
              return <><span>{num},</span><br></br></>
            } else {
              return <span>{num},</span>
            }
          })
        )
        
      })
    }

      </div>
      <canvas ref={canvasRef} />


      
      </>
  )
}



// function addToGroup()