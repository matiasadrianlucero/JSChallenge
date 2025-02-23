import * as THREE from 'three';
import { useEffect,useRef,useState  } from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import checkRayIntersections from './checkRayIntersections';
import getMouseVector2 from './getMouseVector2';
import determineCamera from './determineCamera';

import rotateArr from './movements/rotateArr';
import getBlocks from './movements/getBlocks';
export default function Scene(){
  const canvasRef = useRef(null);
  let [sGroup,setGroup]=useState([])
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
      1,2,3,
      4,5,6,
      7,8,9
    ],
    [
      10,11,12,
      13,null,14,
      15,16,17
    ],
    [
      18,19,20,
      21,22,23,
      24,25,26

    ],
  ])

  useEffect(()=>{
    let func = async () => {
			const pointer = new THREE.Vector2();
      let raycaster = new THREE.Raycaster();
      const scene = new THREE.Scene();
      const color = new THREE.Color().setRGB( 0, 0, 0 );
      const result = await new GLTFLoader().loadAsync('/src/assets/rubikLast.glb');
      const light = new THREE.AmbientLight( 0x404040 );
      const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true
      });
      const controls = new OrbitControls( camera, renderer.domElement );
      const group = new THREE.Group();
      
      var timer;
      let lastPoint = {x: null, y: null}
      let totalMovement = {x: null, y: null}
      let currentMovement = {x: null, y: null}
      let rotation

      let camPos
      let cube

      light.intensity=25
      scene.background=color
      scene.add(group)

      scene.add(result.scene)
      
      scene.add(light)

      camera.position.set( 0, 5, 50 );

      renderer.setSize(window.innerWidth, window.innerHeight)
      controls.enableZoom=false
      controls.enablePan=false
      controls.update();
      document.addEventListener('mouseup',mouseUp,false)

      document.addEventListener('mousedown',onMouseClick,false)
      let axisSelected=null
      let rotate=null

      function onMouseClick(e){
        group.rotation.x=0
        group.rotation.y=0
        group.rotation.z=0
        rotation=null
        lastPoint = {x: null, y: null}
        totalMovement = {x: null, y: null}
        currentMovement = {x: null, y: null}
        axisSelected=null
        controls.enabled = false;
        rotate=null
        let mousePointer=getMouseVector2(e,window)

        const getFirstValue=true

        const intersections=checkRayIntersections(mousePointer,camera,raycaster,scene,getFirstValue)
        
        if(intersections==undefined){
          controls.enabled = true;          
        } else {
          camPos=determineCamera(camera.position)
          cube=intersections.object.name
          
          window.addEventListener('mousemove', mouseMove,false)
        }
      }
      function mouseMove(e){
        if(totalMovement.x==null && totalMovement.y==null ){
          totalMovement.x=e.clientX
          totalMovement.y=e.clientY
        }
        if(
          e.clientY-totalMovement.y>30 && e.clientX-totalMovement.x<30 && e.clientX-totalMovement.x>-30 && axisSelected==null ||
          e.clientY-totalMovement.y>30 && e.clientX-totalMovement.x<30 && e.clientX-totalMovement.x>-30 && axisSelected=='ver'||
          e.clientY-totalMovement.y<-30 && e.clientX-totalMovement.x<30 && e.clientX-totalMovement.x>-30 && axisSelected==null ||
          e.clientY-totalMovement.y<-30 && e.clientX-totalMovement.x<30 && e.clientX-totalMovement.x>-30 && axisSelected=='ver' 
        ){
          // e.clientY-totalMovement.y<-30 && e.clientX-totalMovement.x<30 && e.clientX-totalMovement.x>-30 && axisSelected==null
          axisSelected="ver"  
          let toRotate=getBlocks(camPos,positions,cube,axisSelected)
          arrangeSelection(toRotate)          
          

          if(currentMovement.y=='up' && rotation<90){
            rotation+=10
            group.rotation.x = Math.PI / 180 * rotation;

          } 
          if(currentMovement.y=='down' && rotation>-90){
            rotation-=10
            group.rotation.x = Math.PI / 180 * rotation;          
          }
          console.log(rotation)

        }
        if(
          e.clientX-totalMovement.x>30 && e.clientY-totalMovement.y<30 && e.clientY-totalMovement.y>-30 && axisSelected==null ||
          e.clientX-totalMovement.x>30 && e.clientY-totalMovement.y<30 && e.clientY-totalMovement.y>-30 && axisSelected=='hor' ||
          e.clientX-totalMovement.x<-30 && e.clientY-totalMovement.y<30 && e.clientY-totalMovement.y>-30 && axisSelected==null ||
          e.clientX-totalMovement.x<-30 && e.clientY-totalMovement.y<30 && e.clientY-totalMovement.y>-30 && axisSelected=='hor' 
        ){
          // e.clientX-totalMovement.x<-30 && e.clientY-totalMovement.y<30 && e.clientY-totalMovement.y>-30 && axisSelected==null 
          axisSelected="hor"  
          let toRotate=getBlocks(camPos,positions,cube,axisSelected)
          arrangeSelection(toRotate)
          const maxRotation = Math.PI / 2; // 90 degrees

          if(currentMovement.x=='right' && rotate<1 && rotate>-1){
            group.rotation.y += maxRotation;


          }
          if(currentMovement.x=='left' && rotate<1 && rotate>-1){
            group.rotation.y -= maxRotation;          
          } 
        }

        currentMovement.x=e.clientX > lastPoint.x ? 'right' : e.clientX < lastPoint.x ? 'left' : 'none'
        currentMovement.y=e.clientY > lastPoint.y ? 'down' : e.clientY < lastPoint.y ? 'up': 'none'
        lastPoint.y= e.clientY
        lastPoint.x= e.clientX

        clearTimeout(timer);
        timer=setTimeout(()=>{
          currentMovement.y='none'
          currentMovement.x='none'
        },100);
      }
      function arrangeSelection(arr){        
        arr.map((obj)=>{
          result.scene.children.map((aObj,i)=>{
            if(aObj.name==obj){
              group.add(aObj)
            }
          })
        })
        
      }

      function mouseUp(){
        window.removeEventListener('mousemove', mouseMove, false);
        rotate=null
        if(rotation>70){
          group.rotation.x = Math.PI / 180 * 90;          
          moveBlocks()
          return
        }
        if(rotation<-70){
          group.rotation.x = Math.PI / 180 * -90;          
          moveBlocks()
          return
        }
        cleanUp()
      }
      function cleanUp(){
        if(group.children.length>0){
          axisSelected=null

          for(let i=0;i<=8;i++){
            result.scene.add(group.children[0])
          }
        }
      }
      function moveBlocks(){
        if(group.children.length>0){
          axisSelected=null
          for(let i=0;i<=8;i++){
            result.scene.attach(group.children[0])
          }
        }
      }
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
  
      return () => {
        renderer.dispose();
        window.removeEventListener("mouseup", mouseUp,false);
        window.removeEventListener('mousemove', mouseMove,false)
        window.removeEventListener('mousedown', onMouseClick,false)

      };
    }
    func()  

  },[])
  return (<>
        <div style={{position:"absolute"}}>
        <p>{sGroup}</p>

      </div>
      <canvas ref={canvasRef} />


      
      </>
  )
}



// function addToGroup()