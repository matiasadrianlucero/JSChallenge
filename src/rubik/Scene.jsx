import * as THREE from 'three';
import { useEffect,useRef,useState  } from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import checkRayIntersections from './checkRayIntersections';
import getMouseVector2 from './getMouseVector2';
import determineCamera from './determineCamera';

import rotateRow from './movements/rotateRow';
import rotateUn from './movements/rotateUn';
import rotateColumn from './movements/rotateColumn';

export default function Scene(){
  const canvasRef = useRef(null);
  
  let [cube,setCube]=useState()

  let [xDirection,setXDirection]=useState()
  let [yDirection,setYDirection]=useState()
  
  let [yInitial,setYInitial]=useState()
  let [xInitial,setXInitial]=useState()

  let [lockAxis,setLockAxis]=useState(null)

  let [cm,setCM]=useState(null)

  let [camera,setCamera]=useState([])

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

      const group = new THREE.Group();
      scene.add(group)
      

      document.addEventListener('mousedown',onMouseMove,false)
      function onMouseMove(e){
        controls.enabled = false;

        let mousePointer=getMouseVector2(e,window)

        const getFirstValue=true
        
        let camPos=determineCamera(camera.position)

        setCM(determineCamera(camera.position))

        setXInitial(e.clientX)
        setYInitial(e.clientY)
        setLockAxis(null)

        const intersections=checkRayIntersections(mousePointer,camera,raycaster,scene,getFirstValue)
        if(intersections==undefined){
          controls.enabled = true;          
        } else {
          let cube=intersections.object.name
          window.addEventListener('mousemove', determineMovement,false)
          if(lockAxis){
            moveRubik(lockAxis,cube,camPos)
          }
          
        }
      }

      function moveRubik(lockAxis,cube,camPos){
        if(camPos=='front'){
          
        }
      }

      var timer;

      let lastPoint = {x: null, y: null}
      let totalMovement = {x: null, y: null}

      function determineMovement(e){
        if(totalMovement.x==null && totalMovement.y==null ){
          totalMovement.x=e.clientX
          totalMovement.y=e.clientY
        }
        if(e.clientY-totalMovement.y>30 && e.clientX-totalMovement.x<30 && e.clientX-totalMovement.x>-30 || e.clientY-totalMovement.y<-30 && e.clientX-totalMovement.x<30 && e.clientX-totalMovement.x>-30){
          setLockAxis("VER")
        }
        if(e.clientX-totalMovement.x>30 && e.clientY-totalMovement.y<30 && e.clientY-totalMovement.y>-30 || e.clientX-totalMovement.x<-30 && e.clientY-totalMovement.y<30 && e.clientY-totalMovement.y>-30){
          setLockAxis("HOR")
        }
        if(e.clientY-totalMovement.y<30 && e.clientY-totalMovement.y>-30 && e.clientX-totalMovement.x<30 && e.clientX-totalMovement.x>-30||  e.clientY-totalMovement.y<30 && e.clientY-totalMovement.y>-30 && e.clientX-totalMovement.x<30 && e.clientX-totalMovement.x>-30){
          setLockAxis(null)
        }
        setXDirection (
          e.clientX > lastPoint.x ? 'right'
          : e.clientX < lastPoint.x ? 'left'
          : 'none'
        )
        setYDirection(
          e.clientY > lastPoint.y ? 'down'
          : e.clientY < lastPoint.y ? 'up'
          : 'none'
        )

        lastPoint.y= e.clientY
        lastPoint.x= e.clientX

        clearTimeout(timer);
        timer=setTimeout(()=>{
          setYDirection('none')
          setXDirection('none')
        },100);
      }

      document.addEventListener('mouseup',()=>{
        setCube(),
        setYDirection('none'),
        setXDirection('none'),
        totalMovement.x=null
        totalMovement.y=null
      },false)

 
      
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

      
      <p>XDir: {xDirection} YDir: {yDirection}</p>
      <p>CAMPOS: {cm}</p>
      <p>AXIS: {lockAxis}</p>
      <p>Initials: {yInitial} {xInitial}</p>

      {/* {positions.map((obj)=>{
        return (
          obj.map((num,i)=>{
            if(i==2||i==5||i==8){
              return <><span key={i}>{num},</span><br></br></>
            } else {
              return <span key={i}>{num},</span>
            }
          })
        )
        
      })} */}

      </div>
      <canvas ref={canvasRef} />


      
      </>
  )
}



// function addToGroup()