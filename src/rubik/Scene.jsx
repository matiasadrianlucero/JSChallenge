import * as THREE from 'three';
import { useEffect,useRef,useState  } from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import checkRayIntersections from './onMouseClick/checkRayIntersections';
import getMouseVector2 from './onMouseClick/getMouseVector2';
import determineCamera from './onMouseClick/determineCamera';

import rotateArr from './movements/rotateArr';
import rotateColumn from './movements/rotateColumn';
import rotateRow from './movements/rotateRow';


import getBlocks from './selectGroup/getBlocks';
export default function Scene(){
  const canvasRef = useRef(null);
 
  useEffect(()=>{
    let func = async () => {
			const pointer = new THREE.Vector2();
      let raycaster = new THREE.Raycaster();
      const scene = new THREE.Scene();
      const color = new THREE.Color().setRGB( 255, 255, 255 );
      const result = await new GLTFLoader().loadAsync('/src/assets/rubikLast.glb');
      const light = new THREE.AmbientLight( 0x404040 );
      const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true
      });
      const controls = new OrbitControls( camera, renderer.domElement );
      controls.minPolarAngle = Math.PI/9; 
      controls.maxPolarAngle = Math.PI/1.1; // radians

      const group = new THREE.Group();
      
      let direction=null
      var timer;

      let lastPoint = {x: null, y: null}
      let initialClickPoint = {x: null, y: null}
      let currentMovement = {x: null, y: null}
      let invertOnAxis = {x: null, y: null}

      let rotation
      let camPosition
      let cube
      let selectedCubes
      let axis
      
      let movementStorage=[]

      let startingPosition=[
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
      ]

      let arrPositions=[
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
      ]

      light.intensity=25
      scene.background=color
      scene.add(group)

      scene.add(result.scene)
      
      scene.add(light)

      camera.position.set( 0, 10, 50 );
      // camera.position.set( -15, 10, 50 );

      renderer.setSize(window.innerWidth, window.innerHeight)
      controls.enableZoom=false
      controls.enablePan=false
      
      let scrambleButton=document.getElementById('scramble')
      let revert=document.getElementById('revert')

      controls.update();
      window.addEventListener('mousedown',onMouseClick,false)
      window.addEventListener('mouseup',mouseUp,false)

      scrambleButton.addEventListener('click',scrambleRubik,false)
      revert.addEventListener('click',revertMovements,false)

      function onMouseClick(e){
        resetRotation()
        rotation=null
        lastPoint = {x: null, y: null}
        initialClickPoint = {x: e.clientX, y: e.clientY}
        currentMovement = {x: null, y: null}
        invertOnAxis= {x: false, y: false}
        direction=null
        controls.enabled = false;

        let mousePointer=getMouseVector2(e,window)
        const getFirstValue=true
        const intersections=checkRayIntersections(mousePointer,camera,raycaster,scene,getFirstValue)
      
        if(intersections==undefined){
          controls.enabled = true;          
        } else {
          let res=determineCamera(camera.position)
          camPosition=res.face
          invertOnAxis.x=res.invertX
          invertOnAxis.y=res.invertY

          cube=intersections.object.name
          window.addEventListener('mousemove', mouseMove,false)
        }
      }
      function initialMovement(e){
        if(initialClickPoint.x-e.clientX>10||
          e.clientX-initialClickPoint.x>10 ||
          e.clientX-initialClickPoint.x<-10 ||
          initialClickPoint.x-e.clientX<-10 
        ){
          direction="hor"  
        }
        if(initialClickPoint.y-e.clientY>10 ||
          e.clientY-initialClickPoint.y>10 ||
          e.clientY-initialClickPoint.y<-10 ||
          initialClickPoint.y-e.clientY<-10 
        ){
          direction="ver"  
        }
        if(direction){
          selectedCubes=getBlocks(camPosition,arrPositions,cube,direction)
          axis=selectedCubes.axis
          arrangeSelection(selectedCubes.cubes)          
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
          if(currentMovement.x=='right' && rotation<90 && invertOnAxis.x==false || currentMovement.y=='up' && rotation<90 && invertOnAxis.y==false||
            currentMovement.x=='left' && rotation<90 && invertOnAxis.x==true || currentMovement.y=='down' && rotation<90 && invertOnAxis.y==true
           ){
            if(rotation>70 ){
              rotation+=.2
            } else {
              rotation+=1
            }
          }
          if(currentMovement.x=='left' && rotation>-90 && invertOnAxis.x==false||  currentMovement.y=='down' && rotation>-90 && invertOnAxis.y==false||
             currentMovement.x=='right' && rotation<90 && invertOnAxis.x==true||currentMovement.y=='up' && rotation>-90 && invertOnAxis.y==true
          ){
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
      function arrangeSelection(arr){        
        arr.map((obj)=>{
          result.scene.children.map((aObj,i)=>{
            if(aObj.name==obj){
              group.add(aObj)
            }
          })
        })
      }
      function rotatePositions(cube,direction,axis){
        switch (axis){
          case 'x':
            arrPositions=rotateArr(arrPositions,cube,direction)
          break
          case 'y':
            arrPositions=rotateRow(arrPositions,cube,direction)
          break
          case 'z':
            arrPositions=rotateColumn(arrPositions,cube,direction)
          break
        }
      }
      function mouseUp(){
        window.removeEventListener('mousemove', mouseMove, false);
        if(rotation>70 || rotation<-70){

          rotatePositions(cube,
            rotation>70 ? 'forward' : 'backwards',
            axis)
          storeMovement(camPosition,direction,cube,
            rotation>70 ? 'forward' : 'backwards'
          )

          rotateCube(axis,rotation>70 ? 90 : -90)
          commitMovement()

          if(arrPositions.toString()==startingPosition.toString()){
            movementStorage=[]
          }
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
          for(let i=0;i<=8 && group.children[0]!=null;i++){
            result.scene.attach(group.children[0])
            
          }
        }
        return true
      }
      async function scrambleRubik(){
        removeAllEvents()
        document.getElementById("scramble").classList.add("animateRGB")
        // let toScramble=document.getElementById('scrambleNumber').value
        for(let i=0;i<15;i++){
          // await scrambleRubik()
          let randomCamera=Math.floor(Math.random() * 2)
          let direction=Math.floor(Math.random() * 2)
          let randomCube=Math.floor(Math.random() * 26) + 1;
          let rotationDirection=Math.floor(Math.random() * 2)          
          await moveAutomatically(
            randomCamera==0 ? 'topFront' : 'front',
            randomCamera=='front' ? 'hor' : direction==0 ? 'ver' : 'hor',
            randomCube,
            rotationDirection==0 ? 'forward' : 'backwards'
          )
          storeMovement(randomCamera==0 ? 'topFront' : 'front',
            randomCamera=='front' ? 'hor' : direction==0 ? 'ver' : 'hor',
            randomCube,
            rotationDirection==0 ? 'forward' : 'backwards')
          
        } 
        document.getElementById("scramble").classList.remove("animateRGB")

        addAllEvents()
      }
      function addAllEvents(){
        window.addEventListener('mousedown', onMouseClick,false)

        window.addEventListener("mouseup", mouseUp,false);



        scrambleButton.addEventListener('click',scrambleRubik,false)
        revert.addEventListener('click',revertMovements,false)
      }
      function removeAllEvents(){
        window.removeEventListener("mouseup", mouseUp,false);
        window.removeEventListener('mousemove', mouseMove,false)
        window.removeEventListener('mousedown', onMouseClick,false)

        scrambleButton.removeEventListener('click',scrambleRubik,false)
        revert.removeEventListener('click',revertMovements,false)
      }
      function resetRotation(){
        group.rotation.x=0
        group.rotation.y=0
        group.rotation.z=0
      }
      async function moveAutomatically(camera,direction,randomCube,rotationDirection){
        selectedCubes=getBlocks(camera,arrPositions,randomCube,direction)
        arrangeSelection(selectedCubes.cubes)
        rotatePositions(randomCube,rotationDirection,selectedCubes.axis)        
        await rotateGradually(selectedCubes.axis,rotationDirection)
        commitMovement()

        resetRotation()
      }
      const delay = ms => new Promise(res => setTimeout(res, ms));
      function storeMovement(camera,direction,cube,rotationDirection){
        movementStorage.push({camera:camera,direction:direction,cube:cube,rotationDirection:rotationDirection})
      }
      async function revertMovements(){
        removeAllEvents()
        let i=movementStorage.length-1
        document.getElementById("revert").classList.add("revertAnim")

        while(i>=0){
          await moveAutomatically(movementStorage[i].camera,movementStorage[i].direction,movementStorage[i].cube,
            movementStorage[i].rotationDirection=='forward' ? 'backwards' : 'forward'
          )
          --i
        }
        addAllEvents()
        document.getElementById("revert").classList.remove("revertAnim")

        movementStorage=[]
      }
      async function rotateGradually(axis,b){
        let totalRotation=0
        while(Math.abs(totalRotation) < 90){          
          if(b=='forward'){
            totalRotation+=5
          } else {
            totalRotation-=5
          }
          rotateCube(axis, totalRotation)
          await delay(10);
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

        scrambleButton.removeEventListener('click',scrambleRubik,false)
        revert.removeEventListener('click',revertMovements,false)
      };
    }
    func()  

  },[])
  return (<>
    <div>
      <h2>matias</h2>
    </div>
    <div className='buttons'>
      <button id='scramble'>Mix</button>
      <button id='revert'>Reset</button>
    </div>
    <canvas ref={canvasRef} />      
  </>)
}



// function addToGroup()