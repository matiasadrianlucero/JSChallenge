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
      
      let direction=null
      var timer;
      let lastPoint = {x: null, y: null}
      let initialClickPoint = {x: null, y: null}
      let currentMovement = {x: null, y: null}
      let rotation
      let camPos
      let cube
      let axis


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

      function onMouseClick(e){
        group.rotation.x=0
        group.rotation.y=0
        group.rotation.z=0
        rotation=null
        lastPoint = {x: null, y: null}
        initialClickPoint = {x: e.clientX, y: e.clientY}
        currentMovement = {x: null, y: null}
        direction=null
        controls.enabled = false;

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

        currentMovement.x=e.clientX > lastPoint.x ? 'right' : e.clientX < lastPoint.x ? 'left' : 'none'
        currentMovement.y=e.clientY > lastPoint.y ? 'up' : e.clientY < lastPoint.y ? 'down': 'none'
        lastPoint.y= e.clientY
        lastPoint.x= e.clientX
        if(direction==null 
        ){
          initialMovement(e)
        }
        if(direction){
          if(currentMovement.x=='right' && rotation<90 || currentMovement.y=='up' && rotation<90){
            if(rotation>70 ){
              rotation+=.2
            } else {
              rotation+=1
            }
            
          }
          if(currentMovement.x=='left' && rotation>-90 || currentMovement.y=='down' && rotation>-90){
            if(rotation>70 ){
              rotation-=.2
            } else {
              rotation-=1
            }
          } 
          rotateCube(axis,rotation)
        }
        clearTimeout(timer);
        timer=setTimeout(()=>{
          currentMovement.y='none'
          currentMovement.x='none'
        },100);
      }
      function initialMovement(e){
        if(initialClickPoint.x-e.clientX>10||
          e.clientX-initialClickPoint.x>10 ||
          e.clientX-initialClickPoint.x<-10 ||
          initialClickPoint.x-e.clientX<-10 
        ){
          direction="hor"  
          axis='y'
        }
        if(initialClickPoint.y-e.clientY>10 ||
          e.clientY-initialClickPoint.y>10 ||
          e.clientY-initialClickPoint.y<-10 ||
          initialClickPoint.y-e.clientY<-10 
        ){
          direction="ver"  
          axis='x'
        }
        if(direction){
          let toRotate=getBlocks(camPos,positions,cube,direction)
          arrangeSelection(toRotate)          
        }
        
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
      function rotateCube(axis,ammount){
        switch (axis){
          case 'x':
            group.rotation.x= Math.PI / 180 *  ammount
          break
          case 'y':
            group.rotation.y= Math.PI / 180 * ammount
          break
          case 'z':
            group.rotation.z= Math.PI / 180 * ammount
          break
        }
      }
      function mouseUp(){
        window.removeEventListener('mousemove', mouseMove, false);
        direction=null

        if(rotation>70){
          rotateCube(axis,90)
          commitMovement()
          return
        }
        if(rotation<-70){
          rotateCube(axis,-90)
          commitMovement()
          return
        }
        cancelMovement()
      }
      function cancelMovement(){
        if(group.children.length>0){
          for(let i=0;i<=8;i++){
            result.scene.add(group.children[0])
          }
        }
      }
      function commitMovement(){
        if(group.children.length>0){
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